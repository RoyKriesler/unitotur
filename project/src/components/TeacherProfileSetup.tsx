import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, School, GraduationCap, Calendar, User, Upload, BookOpen as SubjectIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function TeacherProfileSetup() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  const studyYears = [
    { value: '1', label: 'שנה א' },
    { value: '2', label: 'שנה ב' },
    { value: '3', label: 'שנה ג' },
    { value: '4', label: 'שנה ד' }
  ];

  const teachingFields = [
    'מתמטיקה',
    'פיזיקה',
    'כימיה',
    'ביולוגיה',
    'מדעי המחשב',
    'אלגוריתמים',
    'כלכלה',
    'מנהל עסקים',
    'משפטים',
    'פסיכולוגיה',
    'סטטיסטיקה',
    'אנגלית',
    'תכנות',
    'מערכות מידע'
  ];

  // Generate prices from 50 to 100 with steps of 5
  const prices = Array.from(
    { length: Math.floor((100 - 50) / 5) + 1 },
    (_, i) => 50 + i * 5
  );

  const title = "השלמת פרופיל מורה";
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
            {/* Profile Picture Upload */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">תמונת פרופיל</label>
              <div className="mt-1 flex flex-col items-center">
                <div className="relative w-32 h-32 mb-4">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Profile Preview"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                      <User className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  <label
                    htmlFor="profile-upload"
                    className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors"
                  >
                    <Upload className="h-4 w-4 text-white" />
                  </label>
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>
            </motion.div>

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
                  defaultValue=""
                  className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none transition-all duration-200"
                >
                  <option value="" disabled>בחר מוסד לימודים</option>
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
                  defaultValue=""
                  className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none transition-all duration-200"
                >
                  <option value="" disabled>בחר תואר</option>
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
              <label className="block text-sm font-medium text-gray-700">שנת לימודים</label>
              <div className="mt-1 relative select-pattern">
                <select
                  defaultValue=""
                  className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none transition-all duration-200"
                >
                  <option value="" disabled>בחר שנת לימודים</option>
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
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-700">תחומי לימוד</label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {teachingFields.map((field, index) => (
                  <motion.div
                    key={field}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * (index % 4) }}
                  >
                    <label className="relative flex items-center p-2 rounded-lg border border-gray-200 cursor-pointer hover:bg-blue-50 transition-colors">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                        name="teaching_fields"
                        value={field}
                      />
                      <span className="mr-2 text-sm">{field}</span>
                    </label>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <label className="block text-sm font-medium text-gray-700">מחיר לשיעור (45 דקות)</label>
              <div className="mt-1 relative select-pattern">
                <select
                  defaultValue=""
                  className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none transition-all duration-200"
                >
                  <option value="" disabled>בחר מחיר</option>
                  {prices.map((price) => (
                    <option key={price} value={price}>
                      ₪{price}
                    </option>
                  ))}
                </select>
                <div className="absolute left-3 top-2.5 text-gray-400 pointer-events-none">
                  <span className="text-sm">₪</span>
                </div>
              </div>
            </motion.div>

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