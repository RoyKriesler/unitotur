import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Send, Calendar, BookOpen } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { mockUpcomingLessons, mockPreviousLessons } from '../data/mockData';

export default function LessonDetails() {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  
  // Find the lesson from both upcoming and previous lessons
  const lesson = [...mockUpcomingLessons, ...mockPreviousLessons].find(
    (l, index) => `${index}` === id
  );

  if (!lesson) {
    return <div>שיעור לא נמצא</div>;
  }

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
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Lesson Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center space-x-6 space-x-reverse mb-6">
            <img
              src={lesson.teacherImage}
              alt={lesson.teacherName}
              className="h-16 w-16 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{lesson.teacherName}</h1>
              <div className="flex items-center gap-2 text-gray-600 mt-1">
                <BookOpen className="h-4 w-4" />
                <span>{lesson.subject}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span>תאריך: {new Date(lesson.date).toLocaleDateString('he-IL')}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="h-5 w-5 text-blue-600" />
                <span>שעה: {lesson.time}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">הערות נוספות</label>
              <textarea
                className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="הוסף הערות לשיעור..."
              />
            </div>
          </div>
        </motion.div>

        {/* Chat Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-4">צ'אט עם {lesson.teacherName}</h2>
          <div className="h-64 bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto">
            {/* Chat messages will go here */}
            <div className="flex flex-col space-y-4">
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-[80%]">
                  <p className="text-sm text-gray-800">היי, אני מצפה לשיעור!</p>
                  <span className="text-xs text-gray-500">10:30</span>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-blue-100 rounded-lg px-4 py-2 max-w-[80%]">
                  <p className="text-sm text-gray-800">גם אני! נתראה בשיעור</p>
                  <span className="text-xs text-gray-500">10:32</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="הקלד הודעה..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Send className="h-5 w-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}