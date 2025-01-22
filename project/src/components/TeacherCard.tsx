import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, GraduationCap } from 'lucide-react';

interface TeacherCardProps {
  teacher: {
    id: string;
    name: string;
    image: string;
    university: string;
    degree: string;
    subjects: string[];
    rating: number;
    pricePerHour: number;
    availability: string[];
  };
  onClick?: () => void;
}

export default function TeacherCard({ teacher, onClick }: TeacherCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg">
      <div className="p-6">
        <div className="flex items-center space-x-4 space-x-reverse">
          <img
            src={teacher.image}
            alt={teacher.name}
            className="h-16 w-16 rounded-full object-cover"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-900">{teacher.name}</h3>
            <p className="text-sm text-gray-600">{teacher.university}</p>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <GraduationCap className="h-4 w-4 ml-2" />
            {teacher.degree}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Star className="h-4 w-4 ml-2 text-yellow-400" />
            {teacher.rating} / 5
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 ml-2" />
            {teacher.availability.join(', ')}
          </div>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {teacher.subjects.map((subject, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-1 text-gray-900">
            <span className="text-2xl font-bold">₪{teacher.pricePerHour}</span>
            <span className="text-sm font-normal text-gray-600">/45 דקות</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="btn-pattern btn-blue"
          >
            קבע שיעור איתי
          </motion.button>
        </div>
      </div>
    </div>
  );
}