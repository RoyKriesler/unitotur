import React from 'react';
import { motion } from 'framer-motion';
import { Search, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Calendar from './Calendar';
import { mockTeachers, mockPreviousLessons, mockUpcomingLessons } from '../data/mockData';

export default function StudentDashboard() {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8" 
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
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Right Side - New Lesson Button and Lessons */}
          <div className="lg:col-span-3 space-y-4">
            {/* New Lesson Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/schedule')}
                className="w-full btn-pattern btn-blue rounded-xl shadow-lg p-4 text-xl font-bold flex items-center justify-center gap-3"
              >
                <span>קבע שיעור</span>
                <Search className="h-5 w-5" />
              </motion.button>
            </motion.div>

            {/* Upcoming Lessons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">שיעורים קרובים</h2>
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="w-8 h-5 rounded-lg"
                  style={{
                    background: `repeating-linear-gradient(
                      45deg,
                      rgb(34, 197, 94) 0px,
                      rgb(34, 197, 94) 2px,
                      rgba(34, 197, 94, 0.2) 2px,
                      rgba(34, 197, 94, 0.2) 12px
                    )`,
                    border: '2px solid rgb(34, 197, 94)'
                  }}
                />
              </div>
              <div className="space-y-3">
                {mockUpcomingLessons.map((lesson, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-sm"
                  >
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <img
                        src={lesson.teacherImage}
                        alt={lesson.teacherName}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-base text-gray-900">{lesson.teacherName}</h3>
                        <p className="text-sm text-gray-600">{lesson.subject}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-medium text-sm text-gray-900">
                          {new Date(lesson.date).toLocaleDateString('he-IL')}
                        </div>
                        <div className="text-sm text-gray-600">{lesson.time}</div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(`/lesson/${index}`)}
                        className="btn-pattern btn-blue text-sm py-2 px-3"
                      >                       
                        פרטים
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Previous Lessons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">שיעורים קודמים</h2>
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="w-8 h-5 rounded-lg"
                  style={{
                    background: `repeating-linear-gradient(
                      45deg,
                      rgba(0, 0, 0, 0.3) 0px,
                      rgba(0, 0, 0, 0.3) 2px,
                      rgba(0, 0, 0, 0.1) 2px,
                      rgba(0, 0, 0, 0.1) 12px
                    )`,
                    border: '2px solid rgba(0, 0, 0, 0.3)'
                  }}
                />
              </div>
              <div className="space-y-3">
                {mockPreviousLessons.map((lesson, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-sm"
                  >
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <img
                        src={lesson.teacherImage}
                        alt={lesson.teacherName}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-base text-gray-900">{lesson.teacherName}</h3>
                        <p className="text-sm text-gray-600">{lesson.subject}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-medium text-sm text-gray-900">
                          {new Date(lesson.date).toLocaleDateString('he-IL')}
                        </div>
                        <div className="text-sm text-gray-600">{lesson.time}</div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          const teacherId = mockTeachers.find(t => t.name === lesson.teacherName)?.id;
                          if (teacherId) {
                            navigate(`/teacher/${teacherId}`);
                          }
                        }}
                        className="btn-pattern btn-blue text-sm py-2 px-3"
                      >
                        הזמן
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Left Side - Calendar */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 sticky top-24"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">לוח שיעורים</h2>
              </div>
              <div className="transform scale-105 origin-top">
                <Calendar 
                  scheduledDates={[
                    ...mockPreviousLessons.map(lesson => lesson.date),
                    ...mockUpcomingLessons.map(lesson => lesson.date)
                  ]} 
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}