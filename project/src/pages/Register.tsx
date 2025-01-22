import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { BookOpen } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState(searchParams.get('role') || 'student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam === 'tutor' || roleParam === 'student') {
      setRole(roleParam);
    }
  }, [searchParams]);

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setPasswordError('הסיסמאות אינן תואמות');
      return false;
    }
    if (password.length < 6) {
      setPasswordError('הסיסמה חייבת להכיל לפחות 6 תווים');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    
    setError('');
    setPasswordError('');

    if (!validatePasswords()) {
      return;
    }

    setLoading(true);

    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: role
          }
        }
      });

      if (signUpError) {
        if (signUpError.message?.includes('User already registered')) {
          throw new Error('כתובת האימייל כבר קיימת במערכת. נא להתחבר או להשתמש בכתובת אימייל אחרת.');
        }
        throw signUpError;
      }

      if (!authData?.user?.id) {
        throw new Error('יצירת המשתמש נכשלה. נא לנסות שוב.');
      }

      // Create profile in appropriate table with only the existing columns
      const tableName = role === 'tutor' ? 'Teachers' : 'Students';
      const profileData = {
        user_id: authData.user.id,
        email: email
      };

      const { error: profileError } = await supabase
        .from(tableName)
        .insert([profileData]);

      if (profileError) {
        console.error('Profile creation error:', profileError);
        await supabase.auth.signOut();
        throw new Error('אירעה שגיאה ביצירת הפרופיל. נא לנסות שוב.');
      }

      // Redirect to profile setup for students
      if (role === 'student') {
        navigate('/student-profile-setup');
      } else {
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      setError(error?.message || 'אירעה שגיאה בתהליך ההרשמה. נא לנסות שוב.');
      await supabase.auth.signOut();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <BookOpen className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            הרשמה ל-UniTotur
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {role === 'tutor' ? 'הרשמה כמורה' : 'הרשמה כתלמיד'}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            או{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-500">
              התחברות לחשבון קיים
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-md text-sm">
              {error}
              {error.includes('כבר קיימת') && (
                <div className="mt-2">
                  <Link to="/login" className="text-blue-600 hover:text-blue-500">
                    לחץ כאן להתחברות
                  </Link>
                </div>
              )}
            </div>
          )}

          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                כתובת אימייל
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="כתובת אימייל"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                סיסמה
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="סיסמה"
                minLength={6}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                אימות סיסמה
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="אימות סיסמה"
                minLength={6}
              />
            </div>
            {passwordError && (
              <div className="text-sm text-red-500">
                {passwordError}
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'מבצע הרשמה...' : 'הרשמה'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}