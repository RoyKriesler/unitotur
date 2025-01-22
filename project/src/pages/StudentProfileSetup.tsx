import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export default function StudentProfileSetup() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    yearOfBirth: '',
    phoneAreaCode: '050',
    phoneNumber: '',
    institution: '',
    degree: '',
    academicTrack: '',
    yearOfStudy: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'phoneNumber') {
      // Only allow digits and limit to 7 characters
      const sanitizedValue = value.replace(/\D/g, '').slice(0, 7);
      setFormData(prev => ({
        ...prev,
        [name]: sanitizedValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Israeli mobile area codes
  const israelAreaCodes = ['050', '052', '053', '054', '055', '056', '058'];

  // Generate birth year options (18-100 years ago)
  const currentYear = new Date().getFullYear();
  const birthYearOptions = Array.from(
    { length: 82 },
    (_, i) => currentYear - (i + 18)
  ).reverse();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // Validate phone number length
    if (formData.phoneNumber.length !== 7) {
      setError('מספר הטלפון חייב להכיל 7 ספרות בדיוק');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error: updateError } = await supabase
        .from('Students')
        .update({
          full_name: formData.fullName,
          year_of_birth: parseInt(formData.yearOfBirth),
          phone_area_code: formData.phoneAreaCode,
          phone_number: formData.phoneNumber,
          institution: formData.institution,
          degree: formData.degree,
          academic_track: formData.academicTrack,
          year_of_study: parseInt(formData.yearOfStudy)
        })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      navigate('/dashboard');
    } catch (error: any) {
      console.error('Profile update error:', error);
      setError('אירעה שגיאה בעדכון הפרופיל. נא לנסות שוב.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-8 text-center">השלמת פרטי פרופיל</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-500 p-4 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">פרטים אישיים</h3>
              
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  שם מלא
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="yearOfBirth" className="block text-sm font-medium text-gray-700">
                  שנת לידה
                </label>
                <select
                  id="yearOfBirth"
                  name="yearOfBirth"
                  required
                  value={formData.yearOfBirth}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                >
                  <option value="">בחר שנת לידה</option>
                  {birthYearOptions.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  מספר טלפון
                </label>
                <div className="mt-1 flex items-center gap-2" dir="ltr">
                  <div className="flex-none w-20">
                    <select
                      id="phoneAreaCode"
                      name="phoneAreaCode"
                      required
                      value={formData.phoneAreaCode}
                      onChange={handleChange}
                      className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    >
                      {israelAreaCodes.map(code => (
                        <option key={code}>{code}</option>
                      ))}
                    </select>
                  </div>
                  <span className="text-gray-500 text-lg">-</span>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    required
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="block flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    placeholder="1234567"
                    maxLength={7}
                    pattern="[0-9]{7}"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 pt-4">תחומים לימודיים</h3>
              
              <div>
                <label htmlFor="institution" className="block text-sm font-medium text-gray-700">
                  מוסד אקדמי
                </label>
                <input
                  type="text"
                  id="institution"
                  name="institution"
                  required
                  value={formData.institution}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="degree" className="block text-sm font-medium text-gray-700">
                  תואר נלמד
                </label>
                <input
                  type="text"
                  id="degree"
                  name="degree"
                  required
                  value={formData.degree}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="academicTrack" className="block text-sm font-medium text-gray-700">
                  מסלול
                </label>
                <input
                  type="text"
                  id="academicTrack"
                  name="academicTrack"
                  required
                  value={formData.academicTrack}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="yearOfStudy" className="block text-sm font-medium text-gray-700">
                  שנת לימוד
                </label>
                <select
                  id="yearOfStudy"
                  name="yearOfStudy"
                  required
                  value={formData.yearOfStudy}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                >
                  <option value="">בחר שנת לימוד</option>
                  <option value="1">שנה א'</option>
                  <option value="2">שנה ב'</option>
                  <option value="3">שנה ג'</option>
                  <option value="4">שנה ד'</option>
                </select>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'שומר פרטים...' : 'שמירת פרטים'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}