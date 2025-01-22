import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Search, Star, Clock } from 'lucide-react';

export default function Schedule() {
  const { profile } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];
  const tutors = []; // This would be fetched from Supabase

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Search and Filters */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Find Tutors</h2>
            
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search tutors..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Subject Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full border rounded-lg p-2"
              >
                <option value="">All Subjects</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tutors List */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Available Tutors</h2>
            </div>
            <div className="p-6">
              {tutors.length > 0 ? (
                <div className="space-y-6">
                  {tutors.map((tutor) => (
                    <div key={tutor.id} className="border rounded-lg p-4 hover:shadow-md transition">
                      {/* Tutor details would go here */}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No tutors found matching your criteria
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}