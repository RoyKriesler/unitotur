import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Profile, Review, Subject } from '../types';
import { Calendar, GraduationCap, Star } from 'lucide-react';
import { format } from 'date-fns';

export default function TutorProfile() {
  const { id } = useParams<{ id: string }>();

  const { data: tutor } = useQuery({
    queryKey: ['tutor', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Profile;
    },
  });

  const { data: subjects } = useQuery({
    queryKey: ['tutor-subjects', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tutor_subjects')
        .select('*, subject:subjects(*)')
        .eq('tutor_id', id);

      if (error) throw error;
      return data as { subject: Subject; expertise_level: number }[];
    },
  });

  const { data: reviews } = useQuery({
    queryKey: ['tutor-reviews', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*, student:profiles!reviews_student_id_fkey(full_name)')
        .eq('tutor_id', id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as (Review & { student: { full_name: string } })[];
    },
  });

  if (!tutor) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{tutor.full_name}</h1>
            <p className="text-gray-600">{tutor.field_of_study}</p>
          </div>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            Book a Session
          </button>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-6">
          <div className="text-center">
            <Star className="h-6 w-6 text-indigo-600 mx-auto" />
            <p className="mt-2 text-sm text-gray-600">Rating</p>
            <p className="text-xl font-semibold">{tutor.rating.toFixed(1)}</p>
          </div>
          <div className="text-center">
            <Calendar className="h-6 w-6 text-indigo-600 mx-auto" />
            <p className="mt-2 text-sm text-gray-600">Hours Tutored</p>
            <p className="text-xl font-semibold">{tutor.total_hours}</p>
          </div>
          <div className="text-center">
            <GraduationCap className="h-6 w-6 text-indigo-600 mx-auto" />
            <p className="mt-2 text-sm text-gray-600">Year</p>
            <p className="text-xl font-semibold">{tutor.year_of_study}th Year</p>
          </div>
        </div>

        {tutor.bio && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">About Me</h2>
            <p className="text-gray-600">{tutor.bio}</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Subjects</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {subjects?.map(({ subject, expertise_level }) => (
            <div
              key={subject.id}
              className="border rounded-lg p-4"
            >
              <h3 className="font-medium">{subject.name}</h3>
              <div className="flex mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < expertise_level
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Reviews</h2>
        <div className="space-y-4">
          {reviews?.map(review => (
            <div key={review.id} className="border-b pb-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">{review.student.full_name}</span>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              {review.comment && (
                <p className="mt-2 text-gray-600">{review.comment}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                {format(new Date(review.created_at), 'PP')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}