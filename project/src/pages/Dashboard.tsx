import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, Users } from 'lucide-react';

export default function Dashboard() {
  const { profile } = useAuth();

  const upcomingSessions = []; // This would be fetched from Supabase
  const favoriteTutors = []; // This would be fetched from Supabase

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Upcoming Sessions */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Calendar className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
          </div>
          {upcomingSessions.length > 0 ? (
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="border rounded p-4">
                  {/* Session details would go here */}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No upcoming sessions</p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Find a Tutor
              </button>
            </div>
          )}
        </div>

        {/* Favorite Tutors */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Users className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold">Favorite Tutors</h2>
          </div>
          {favoriteTutors.length > 0 ? (
            <div className="space-y-4">
              {favoriteTutors.map((tutor) => (
                <div key={tutor.id} className="border rounded p-4">
                  {/* Tutor details would go here */}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No favorite tutors yet</p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Browse Tutors
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}