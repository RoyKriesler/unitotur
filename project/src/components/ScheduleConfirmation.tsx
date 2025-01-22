import React from 'react';
import { motion } from 'framer-motion';
import { Link, useParams, useLocation } from 'react-router-dom';

export default function ScheduleConfirmation() {
  const { teacherId } = useParams();
  const location = useLocation();
  const { selectedTime, selectedDate } = location.state || {};

  const buttonStyle = "relative bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-200 text-lg cursor-pointer border-2 border-blue-200";
  const diagonalPattern = {
    background: `repeating-linear-gradient(
      -45deg,
      rgb(37, 99, 235) 0px,
      rgb(37, 99, 235) 2px,
      transparent 2px,
      transparent 12px
    )`
  };

  const title = "התחברו עם מורים פרטיים מהאוניברסיטה";
  const subtitle = "סטודנטים מלמדים סטודנטים";

  return (
    <div className="min-h-screen" dir="rtl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white min-h-screen flex items-center"
      >
        <div className="absolute inset-0 opacity-30" style={diagonalPattern} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              {title.split(' ').map((word, wordIndex) => (
                <span key={wordIndex} className="mx-1">
                  {word.split('').map((letter, letterIndex) => (
                    <motion.span
                      key={`${wordIndex}-${letterIndex}`}
                      className="inline-block transform origin-center cursor-pointer transition-all duration-200 hover:scale-125"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              ))}
            </h1>
            <div className="text-2xl mb-12">
              {subtitle.split(' ').map((word, wordIndex) => (
                <span key={wordIndex} className="mx-1">
                  {word.split('').map((letter, letterIndex) => (
                    <motion.span
                      key={`subtitle-${wordIndex}-${letterIndex}`}
                      className="inline-block transform origin-center cursor-pointer transition-all duration-200 hover:scale-125"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              ))}
            </div>
          
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col sm:flex-row justify-center gap-4 items-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/register/student" className={buttonStyle}>
                  <div className="absolute inset-0 opacity-0 hover:opacity-10 transition-opacity" style={diagonalPattern} />
                  הרשמה כתלמיד
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/register/tutor" className={buttonStyle}>
                  <div className="absolute inset-0 opacity-0 hover:opacity-10 transition-opacity" style={diagonalPattern} />
                  הרשמה כמורה
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}