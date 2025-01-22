import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockUpcomingLessons, mockPreviousLessons } from '../data/mockData';

interface CalendarProps {
  scheduledDates: string[];
  onDateSelect?: (date: string) => void;
}

export default function Calendar({ scheduledDates, onDateSelect }: CalendarProps) {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weeks = [];
  let week = Array(7).fill(null);

  // Fill in the days
  days.forEach((day, index) => {
    const dayIndex = (firstDayOfMonth + index) % 7;
    if (dayIndex === 0 && index !== 0) {
      weeks.push([...week]);
      week = Array(7).fill(null);
    }
    week[dayIndex] = day;
  });
  if (week.some(day => day !== null)) {
    weeks.push(week);
  }

  const isScheduled = (day: number) => {
    const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];
    return scheduledDates.includes(dateStr);
  };

  const isToday = (day: number) => {
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear();
  };

  const isPastLesson = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    return date < todayStart && isScheduled(day);
  };

  const isUpcomingLesson = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    return date >= todayStart && isScheduled(day);
  };

  const handleDateClick = (day: number) => {
    if (!day) return;
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateStr = clickedDate.toISOString().split('T')[0];
    
    if (onDateSelect) {
      onDateSelect(dateStr);
    } else if (isScheduled(day)) {
      // Find the lesson in upcoming lessons first
      const upcomingIndex = mockUpcomingLessons.findIndex(lesson => lesson.date === dateStr);
      if (upcomingIndex !== -1) {
        navigate(`/lesson/${upcomingIndex}`);
        return;
      }
      
      // If not found in upcoming, check previous lessons
      const previousIndex = mockPreviousLessons.findIndex(lesson => lesson.date === dateStr);
      if (previousIndex !== -1) {
        navigate(`/lesson/${mockUpcomingLessons.length + previousIndex}`);
      }
    }
  };

  const getDateStyle = (day: number | null) => {
    if (!day) return {};
    
    const isTodayDay = isToday(day);
    const isPast = isPastLesson(day);
    const isUpcoming = isUpcomingLesson(day);
    
    let style: React.CSSProperties = {};
    
    if (isTodayDay) {
      style.background = `repeating-linear-gradient(
        45deg,
        rgba(37, 99, 235, 0.15) 0px,
        rgba(37, 99, 235, 0.15) 2px,
        rgba(37, 99, 235, 0.05) 2px,
        rgba(37, 99, 235, 0.05) 12px
      )`;
      style.border = '2px solid rgb(37, 99, 235)';
    } else if (isPast) {
      style.background = `repeating-linear-gradient(
        45deg,
        rgba(0, 0, 0, 0.15) 0px,
        rgba(0, 0, 0, 0.15) 2px,
        rgba(0, 0, 0, 0.05) 2px,
        rgba(0, 0, 0, 0.05) 12px
      )`;
      style.border = '2px solid rgba(0, 0, 0, 0.3)';
    } else if (isUpcoming) {
      style.background = `repeating-linear-gradient(
        45deg,
        rgba(34, 197, 94, 0.15) 0px,
        rgba(34, 197, 94, 0.15) 2px,
        rgba(34, 197, 94, 0.05) 2px,
        rgba(34, 197, 94, 0.05) 12px
      )`;
      style.border = '2px solid rgb(34, 197, 94)';
    }
    
    return style;
  };

  const canNavigateBack = () => {
    const prevMonth = new Date(currentDate);
    prevMonth.setMonth(currentDate.getMonth() - 1);
    const minDate = new Date(today);
    minDate.setMonth(today.getMonth() - 1);
    return prevMonth.getTime() >= minDate.getTime();
  };

  const canNavigateForward = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(currentDate.getMonth() + 1);
    const maxDate = new Date(today);
    maxDate.setMonth(today.getMonth() + 1);
    return nextMonth.getTime() <= maxDate.getTime();
  };

  const changeMonth = (increment: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + increment);
    
    if (increment < 0 && !canNavigateBack()) return;
    if (increment > 0 && !canNavigateForward()) return;
    
    setCurrentDate(newDate);
  };

  const monthNames = [
    'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
    'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <motion.button
          whileHover={canNavigateBack() ? { scale: 1.1 } : {}}
          whileTap={canNavigateBack() ? { scale: 0.9 } : {}}
          onClick={() => changeMonth(-1)}
          className={`p-2 rounded-full ${!canNavigateBack() ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100'}`}
          disabled={!canNavigateBack()}
        >
          <ChevronRight className="h-5 w-5" />
        </motion.button>
        <h3 className="text-lg font-semibold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <motion.button
          whileHover={canNavigateForward() ? { scale: 1.1 } : {}}
          whileTap={canNavigateForward() ? { scale: 0.9 } : {}}
          onClick={() => changeMonth(1)}
          className={`p-2 rounded-full ${!canNavigateForward() ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100'}`}
          disabled={!canNavigateForward()}
        >
          <ChevronLeft className="h-5 w-5" />
        </motion.button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4 text-center font-semibold">
        {['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'].map((day, index) => (
          <div key={index} className="p-2">
            {day}
          </div>
        ))}
      </div>

      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="grid grid-cols-7 gap-2">
          {week.map((day, dayIndex) => (
            <motion.div
              key={dayIndex}
              whileHover={day && isScheduled(day) ? { scale: 1.1 } : {}}
              whileTap={day && isScheduled(day) ? { scale: 0.95 } : {}}
              onClick={() => day && handleDateClick(day)}
              className={`
                relative p-2 rounded-lg text-center
                ${day === null ? 'invisible' : ''}
                ${isToday(day || 0) ? 'shadow-md' : ''}
                ${isScheduled(day || 0) ? 'cursor-pointer hover:shadow-lg' : 'cursor-default'}
                border border-gray-200
              `}
              style={getDateStyle(day)}
            >
              {day !== null && (
                <div className="relative">
                  <span className={`
                    relative z-10 font-medium
                    ${isPastLesson(day) ? 'text-gray-700' : ''}
                    ${isUpcomingLesson(day) ? 'text-green-600' : ''}
                    ${isToday(day) ? 'text-blue-700 font-bold' : ''}
                  `}>
                    {day}
                  </span>
                  {isScheduled(day) && (
                    <div className={`
                      absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full
                      ${isPastLesson(day) ? 'bg-gray-600' : ''}
                      ${isUpcomingLesson(day) ? 'bg-green-600' : ''}
                      ${isToday(day) ? 'bg-blue-600' : ''}
                    `} />
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
}