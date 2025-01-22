import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, School, GraduationCap, Calendar, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function StudentProfileSetup() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const universities = [
    'אוניברסיטת רייכמן',
    'אוניברסיטת תל אביב',
    'האוניברסיטה העברית',
    'הטכניון',
    'אוניברסיטת בן גוריון',
    'אוניברסיטת בר אילן',
    'אוניברסיטת חיפה',
    'האוניברסיטה הפתוחה'
  ];

  const degrees = [
    'תואר ראשון ביזמות',
    'תואר ראשון במשפטים (LL.B)',
    'תואר ראשון במנהל עסקים (B.A)',
    'תואר ראשון במדעי המחשב (B.Sc)',
    'תואר ראשון בממשל (B.A)',
    'תואר ראשון בכלכלה (B.A)',
    'תואר ראשון בפסיכולוגיה (B.A)',
    'תואר ראשון בתקשורת (B.A)',
    'תואר ראשון בקיימות (B.A)'
  ];

  const tracks = [
    'יזמות ומנהל עסקים',
    'יזמות ומדעי המחשב',
    'יזמות וכלכלה',
    'משפטים',
    'משפטים ומנהל עסקים',
    'משפטים וממשל',
    'מנהל עסקים',
    'מנהל עסקים עם התמחות בחשבונאות',
    'מנהל עסקים וכלכלה',
    'מנהל עסקים ויזמות',
    'מנהל עסקים ופסיכולוגיה',
    'מדעי המחשב',
    'מדעי המחשב ויזמות',
    'מדעי המחשב עם חטיבה בקוגניציה וחקר המוח',
    'מדעי המחשב עם חטיבה במדעי החיים (קדם רפואה)',
    'ממשל',
    'קיימות וממשל',
    'כלכלה',
    'כלכלה ויזמות',
    'כלכלה ומנהל עסקים',
    'פסיכולוגיה',
    'פסיכולוגיה ומנהל עסקים',
    'תקשורת',
    'קיימות'
  ];

  const studyYears = [
    { value: '1', label: 'שנה א' },
    { value: '2', label: 'שנה ב' },
    { value: '3', label: 'שנה ג' }
  ];

  // Generate birth years (18-35 years ago from current year)
  const currentYear = new Date().getFullYear();
  const birthYears = Array.from(
    { length: 18 },
    (_, i) => currentYear - 35 + i
  ).reverse();

  const title = "השלמת פרופיל תלמיד";
  const subtitle = "ספר לנו על הלימודים שלך";

  const buttonStyle = "relative w-full flex justify-center py-3 px-4 rounded-lg shadow-sm text-sm font-medium text-white btn-pattern btn-blue";
  const diagonalPattern = {
    background: `repeating-linear-gradient(
      -45deg,
      rgb(37, 99, 235) 0px,
      rgb(37, 99, 235) 2px,
      transparent 2px,
      transparent 12px
    )`
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn(); // Sign in the user
    navigate('/dashboard');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      dir="rtl"
      style={{
        background: `repeating-linear-gradient(
          45deg,
          rgba(37, 99, 235, 0.03) 0px,
          rgba(37, 99, 235, 0.03) 2px,
          transparent 2px,
          transparent 12px
        )`
      }}
    >
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ rotate: -180 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              <BookOpen className="h-12 w-12 text-blue-600 mx-auto" />
            </motion.div>
            <h2 className="mt-4 text-3xl font-bold text-gray-900">
              {title.split(' ').map((word, wordIndex) => (
                <span key={`word-${wordIndex}`} className="mx-1">
                  {word.split('').map((letter, letterIndex) => (
                    <motion.span
                      key={`${wordIndex}-${letterIndex}`}
                      className="inline-block cursor-pointer transition-all duration-200 hover:scale-125"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              ))}
            </h2>
            <div className="mt-2 text-gray-600">
              {subtitle.split(' ').map((word, wordIndex) => (
                <span key={`subtitle-word-${wordIndex}`} className="mx-1">
                  {word.split('').map((letter, letterIndex) => (
                    <motion.span
                      key={`subtitle-${wordIndex}-${letterIndex}`}
                      className="inline-block cursor-pointer transition-all duration-200 hover:scale-125"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              ))}
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-gray-700">שם מלא</label>
              <div className="mt-1 relative">
                <motion.input
                  whileHover={{ scale: 1.02 }}
                  type="text"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="הכנס את שמך המלא"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <User className="h-5 w-5" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-700">מוסד לימודים</label>
              <div className="mt-1 relative select-pattern">
                <select
                  defaultValue="אוניברסיטת רייכמן"
                  className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none transition-all duration-200"
                >
                  {universities.map((university) => (
                    <option key={university} value={university}>
                      {university}
                    </option>
                  ))}
                </select>
                <div className="absolute left-3 top-2.5 text-gray-400 pointer-events-none">
                  <School className="h-5 w-5" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-700">תואר</label>
              <div className="mt-1 relative select-pattern">
                <select
                  defaultValue={degrees[0]}
                  className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none transition-all duration-200"
                >
                  {degrees.map((degree) => (
                    <option key={degree} value={degree}>
                      {degree}
                    </option>
                  ))}
                </select>
                <div className="absolute left-3 top-2.5 text-gray-400 pointer-events-none">
                  <GraduationCap className="h-5 w-5" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-700">מסלול</label>
              <div className="mt-1 relative select-pattern">
                <select
                  defaultValue={tracks[0]}
                  className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none transition-all duration-200"
                >
                  {tracks.map((track) => (
                    <option key={track} value={track}>
                      {track}
                    </option>
                  ))}
                </select>
                <div className="absolute left-3 top-2.5 text-gray-400 pointer-events-none">
                  <BookOpen className="h-5 w-5" />
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-sm font-medium text-gray-700">שנת לימודים</label>
                <div className="mt-1 relative select-pattern">
                  <select
                    defaultValue="1"
                    className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none transition-all duration-200"
                  >
                    {studyYears.map((year) => (
                      <option key={year.value} value={year.value}>
                        {year.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute left-3 top-2.5 text-gray-400 pointer-events-none">
                    <Calendar className="h-5 w-5" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <label className="block text-sm font-medium text-gray-700">שנת לידה</label>
                <div className="mt-1 relative select-pattern">
                  <select
                    defaultValue={currentYear - 20}
                    className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none transition-all duration-200"
                  >
                    {birthYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <div className="absolute left-3 top-2.5 text-gray-400 pointer-events-none">
                    <Calendar className="h-5 w-5" />
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className={buttonStyle}
            >
              <div className="absolute inset-0 opacity-0 hover:opacity-10 transition-opacity" style={diagonalPattern} />
              סיום הרשמה
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}