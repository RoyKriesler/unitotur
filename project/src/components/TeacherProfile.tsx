import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, GraduationCap } from 'lucide-react';
import Calendar from './Calendar';
import { mockTeachers, mockUpcomingLessons } from '../data/mockData';

interface TimeSlot {
  time: string;
  available: boolean;
}

export default function TeacherProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const teacher = mockTeachers.find(t => t.id === id);

  // Mock available time slots for demonstration
  const availableTimeSlots: TimeSlot[] = [
    { time: '09:00', available: true },
    { time: '10:00', available: true },
    { time: '11:00', available: false },
    { time: '12:00', available: true },
    { time: '13:00', available: false },
    { time: '14:00', available: true },
    { time: '15:00', available: true },
    { time: '16:00', available: false },
    { time: '17:00', available: true },
  ];

  if (!teacher) {
    return <div>מורה לא נמצא</div>;
  }

  // Generate available dates (for demo purposes)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (Math.random() > 0.5) { // Randomly mark dates as available
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    return dates;
  };

  const handleBookLesson = (time: string) => {
    if (!selectedDate) return;

    navigate(`/schedule-confirmation/${id}`, {
      state: {
        selectedDate,
        selectedTime: `${time}-${parseInt(time) + 1}:00`,
      }
    });
  };

  const availableDates = generateAvailableDates();

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Teacher Info Section */}
          <div className="lg:col-start-1 lg:row-start-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 h-fit sticky top-24"
            >
              <div className="flex items-center space-x-6 space-x-reverse">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="h-24 w-24 rounded-full object-cover"
                />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{teacher.name}</h1>
                  <p className="text-lg text-gray-600">{teacher.university}</p>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 ml-1" />
                      <span>{teacher.rating} / 5</span>
                    </div>
                    <div className="flex items-center">
                      <GraduationCap className="h-5 w-5 text-blue-600 ml-1" />
                      <span>{teacher.degree}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-3">תחומי התמחות</h2>
                <div className="flex flex-wrap gap-2">
                  {teacher.subjects.map((subject, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-3">זמינות</h2>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 ml-2" />
                  {teacher.availability.join(', ')}
                </div>
              </div>

              <div className="mt-6">
                <div className="text-2xl font-bold text-gray-900">
                  ₪{teacher.pricePerHour}
                  <span className="text-sm text-gray-600 font-normal">/שעה</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Calendar Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 lg:col-start-2 lg:row-start-1"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">זמינות</h2>
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            
            <Calendar 
              scheduledDates={availableDates}
              onDateSelect={(date: string) => setSelectedDate(date === selectedDate ? null : date)}
            />

            <AnimatePresence>
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 overflow-hidden"
                >
                  <h3 className="text-lg font-semibold mb-4">
                    שעות זמינות לתאריך {new Date(selectedDate).toLocaleDateString('he-IL')}
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {availableTimeSlots.map((slot, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {slot.available ? (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full btn-pattern btn-blue py-2 px-4 rounded-lg"
                            onClick={() => handleBookLesson(slot.time)}
                          >
                            {slot.time}
                          </motion.button>
                        ) : (
                          <button
                            className="w-full py-2 px-4 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed"
                            disabled
                          >
                            {slot.time}
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}