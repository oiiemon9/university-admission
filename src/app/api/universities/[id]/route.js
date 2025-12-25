import { pool } from '@/app/lib/db';

export async function GET(req, { params }) {
  const { id } = await params;

  if (!id) {
    return new Response(JSON.stringify({ error: 'ID is required' }), {
      status: 400,
    });
  }

  const result = await pool.query(
    `SELECT * FROM universities WHERE id = $1 LIMIT 1`,
    [id]
  );

  return new Response(JSON.stringify(result.rows[0]), {
    status: 200,
  });
}
