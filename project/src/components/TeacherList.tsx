import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import TeacherCard from './TeacherCard';
import { mockTeachers } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

export default function TeacherList() {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const subjects = ['מתמטיקה', 'פיזיקה', 'מדעי המחשב', 'כימיה', 'ביולוגיה'];

  const filteredTeachers = selectedSubject
    ? mockTeachers.filter(teacher => teacher.subjects.includes(selectedSubject))
    : mockTeachers;

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
        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4 justify-center">
          {subjects.map((subject, index) => (
            <motion.button
              key={subject}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedSubject(selectedSubject === subject ? null : subject)}
              className={`px-4 py-2 rounded-full relative overflow-hidden ${
                selectedSubject === subject 
                  ? 'text-black-600 border-blue-500' 
                  : 'bg-white border border-gray-300 hover:border-blue-500 hover:bg-blue-50'
              } transition-colors duration-200`}
              style={selectedSubject === subject ? {
                background: `repeating-linear-gradient(
                  45deg,
                  rgb(37, 99, 235, 0.3) 0px,
                  rgb(37, 99, 235, 0.3) 2px,
                  rgba(37, 99, 235, 0.05) 2px,
                  rgba(37, 99, 235, 0.05) 12px
                )`,
                border: '2px solid rgb(37, 99, 235)'
              } : {}}
            >
              {subject}
            </motion.button>
          ))}
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTeachers.map((teacher, index) => (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TeacherCard 
                teacher={teacher}
                onClick={() => navigate(`/teacher/${teacher.id}`)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}