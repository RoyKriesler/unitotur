import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TutorRegister() {
  const navigate = useNavigate();
  const title = "הרשמה כמורה";
  const subtitle = "הצטרף לקהילת המורים שלנו והתחל ללמד";

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
    navigate('/setup/teacher');
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
              <label className="block text-sm font-medium text-gray-700">כתובת אימייל</label>
              <div className="mt-1 relative">
                <motion.input
                  whileHover={{ scale: 1.02 }}
                  type="email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="your@email.com"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <Mail className="h-5 w-5" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-700">סיסמה</label>
              <div className="mt-1 relative">
                <motion.input
                  whileHover={{ scale: 1.02 }}
                  type="password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="הכנס סיסמה"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <Lock className="h-5 w-5" />
                </div>
              </div>
            </motion.div>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className={buttonStyle}
            >
              <div className="absolute inset-0 opacity-0 hover:opacity-10 transition-opacity" style={diagonalPattern} />
              המשך
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}