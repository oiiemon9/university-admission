'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function ApplyPage() {
  const { id } = useParams();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [university, setUniversity] = useState(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    gpa: '',
    ielts: '',
  });

  useEffect(() => {
    const fetchUniversity = async () => {
      const res = await fetch(`/api/universities/${id}`);
      if (res.ok) {
        const data = await res.json();
        setUniversity(data);
      }
    };
    fetchUniversity();
  }, [id]);

  const handleSubmit = async () => {
    const res = await fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, university_id: id }),
    });

    if (res.ok) {
      alert('Application Submitted Successfully!');
      router.push('/');
    } else {
      const err = await res.json();
      alert(err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-10">
      <h2 className="text-2xl font-bold mb-4">
        Apply to {university?.name || 'University'}
      </h2>

      {step === 1 && (
        <>
          <input
            type="text"
            placeholder="Your Name"
            className="border p-2 w-full mb-3"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full mb-3"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <button
            onClick={() => setStep(2)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="number"
            step="0.01"
            min="0"
            max="5"
            placeholder="GPA"
            className="border p-2 w-full mb-3"
            value={form.gpa}
            onChange={(e) => setForm({ ...form, gpa: e.target.value })}
          />
          <input
            type="number"
            step="0.5"
            min="0"
            max="9"
            placeholder="IELTS"
            className="border p-2 w-full mb-3"
            value={form.ielts}
            onChange={(e) => setForm({ ...form, ielts: e.target.value })}
          />
          <button
            onClick={() => setStep(1)}
            className="bg-gray-600 text-white px-4 py-2 rounded mr-2"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit Application
          </button>
        </>
      )}
    </div>
  );
}
