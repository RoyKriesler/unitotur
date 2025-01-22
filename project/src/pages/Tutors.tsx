import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Search, Star } from 'lucide-react';
import { Tutor } from '../types';

export default function Tutors() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [subjects, setSubjects] = useState<string[]>([]);

  useEffect(() => {
    fetchTutors();
    fetchSubjects();
  }, [selectedSubject]);

  const fetchSubjects = async () => {
    const { data, error } = await supabase
      .from('tutors')
      .select('subjects');
    
    if (!error && data) {
      const allSubjects = data.flatMap(tutor => tutor.subjects);
      const uniqueSubjects = [...new Set(allSubjects)];
      setSubjects(uniqueSubjects);
    }
  };

  const fetchTutors = async () => {
    let query = supabase
      .from('tutors')
      .select(`
        *,
        profile:profiles(*)
      `)
      .order('rating', { ascending: false });

    if (selectedSubject) {
      query = query.contains('subjects', [selectedSubject]);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching tutors:', error);
    } else {
      setTutors(data || []);
    }
    setLoading(false);
  };

  const filteredTutors = tutors.filter(tutor =>
    tutor.profile?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tutor.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid md:grid-cols-4 gap-8">
        {/* Search and Filters */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">חיפוש מורים</h2>
            
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="חיפוש לפי שם או נושא..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Subject Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                נושא
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full border rounded-lg p-2"
              >
                <option value="">כל הנושאים</option>
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
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">מורים זמינים</h2>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                </div>
              ) : filteredTutors.length > 0 ? (
                <div className="space-y-6">
                  {filteredTutors.map((tutor) => (
                    <div key={tutor.id} className="border rounded-lg p-6 hover:shadow-md transition">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold">{tutor.profile?.full_name}</h3>
                          <div className="flex items-center mt-1 text-yellow-500">
                            <Star className="h-5 w-5 fill-current" />
                            <span className="mr-1">{tutor.rating || 'חדש'}</span>
                          </div>
                          <div className="mt-2">
                            <p className="text-gray-600">{tutor.bio || 'אין ביוגרפיה עדיין'}</p>
                          </div>
                        </div>
                        <div className="text-left">
                          <div className="text-lg font-semibold text-blue-600">
                            ₪{tutor.hourly_rate}/שעה
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">נושאים:</h4>
                        <div className="flex flex-wrap gap-2">
                          {tutor.subjects.map((subject, index) => (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                            >
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                          קביעת שיעור
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  לא נמצאו מורים התואמים את החיפוש שלך
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}