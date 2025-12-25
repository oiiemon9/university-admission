'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function ApplyPage() {
  const { id } = useParams();
  const router = useRouter();
  const [university, setUniversity] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

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

  const handelApplication = async (data) => {
    if (!data.name || !data.email || !data.gpa || !data.ielts) {
      toast.error('Please fill in all fields.');
      return;
    }
    const info = data;
    info.university_id = id;
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to apply to this university?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.post('/api/applications', info);
        if (res.data.success) {
          Swal.fire({
            title: 'Success',
            text: 'Application Submitted Successfully!',
            icon: 'success',
          });
          router.push('/');
        } else {
          Swal.fire({
            title: 'Cancelled',
            text: res.data.message,
            icon: 'error',
          });
        }
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white rounded-2xl shadow-xl border border-gray-100">
      {university && (
        <div className="mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-8 tracking-tight">
            Apply to {university.name}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg">
              {university.image ? (
                <Image
                  src={university.image}
                  alt={university.name}
                  height={300}
                  width={400}
                  className="object-cover h-full w-full transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-500 font-semibold">
                  No Image Available
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center space-y-6">
              <p className="text-2xl text-gray-800 flex items-center gap-3">
                <span className="font-bold text-gray-900">Location:</span>{' '}
                {university.country}
              </p>
              <p className="text-2xl text-gray-800 flex items-center gap-3">
                <span className="font-bold text-gray-900">Degree Level:</span>{' '}
                {university.degree}
              </p>
              <p className="text-2xl text-gray-800 flex items-center gap-3">
                <span className="font-bold text-gray-900">Tuition Fee:</span> $
                {university.tuition_fee.toLocaleString()}/year
              </p>
              <p className="text-2xl text-gray-800 flex items-center gap-3">
                <span className="font-bold text-gray-900">Minimum GPA:</span>{' '}
                {university.min_gpa}
              </p>
              <p className="text-2xl text-gray-800 flex items-center gap-3">
                <span className="font-bold text-gray-900">Minimum IELTS:</span>{' '}
                {university.min_ielts}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-gray-200 pt-10">
        <h2 className="text-3xl font-bold mb-10 text-gray-900 tracking-tight">
          Application Details
        </h2>
        <form onSubmit={handleSubmit(handelApplication)}>
          <div className="space-y-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your full name
              </label>
              <input
                type="text"
                placeholder="e.g. Ratul Khan"
                {...register('name')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                {...register('email')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GPA
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="5"
                placeholder="Enter your GPA (e.g., 3.50)"
                {...register('gpa')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                IELTS Score
              </label>

              <input
                type="number"
                step="0.5"
                min="0"
                max="9"
                placeholder="Enter your IELTS score (e.g., 7.0)"
                {...register('ielts')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-shadow shadow-md hover:shadow-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-rose-600 text-white px-6 py-2 rounded-lg hover:bg-rose-700 transition-shadow shadow-md hover:shadow-lg"
            >
              Confirm Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
