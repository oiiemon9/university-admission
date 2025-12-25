import { pool } from '@/app/lib/db';

export async function POST(req) {
  const body = await req.json();
  const { name, email, gpa, ielts, university_id } = body;

  const uni = await pool.query(
    'SELECT min_gpa, min_ielts FROM universities WHERE id=$1',
    [university_id]
  );

  const u = uni.rows[0];

  if (gpa < u.min_gpa || ielts < u.min_ielts) {
    return Response.json(
      { message: 'You are not eligible for this university' },
      { status: 400 }
    );
  }

  await pool.query(
    'INSERT INTO applications (student_name,email,gpa,ielts,university_id) VALUES ($1,$2,$3,$4,$5)',
    [name, email, gpa, ielts, university_id]
  );

  return Response.json({ success: true });
}
