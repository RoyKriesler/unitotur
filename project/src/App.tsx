import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import TeacherProfile from './components/TeacherProfile';
import LessonDetails from './components/LessonDetails';
import TeacherList from './components/TeacherList';
import ScheduleConfirmation from './components/ScheduleConfirmation';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<TeacherList />} />
          <Route path="/teacher/:id" element={<TeacherProfile />} />
          <Route path="/schedule-confirmation/:teacherId" element={<ScheduleConfirmation />} />
          <Route path="/lesson/:id" element={<LessonDetails />} />
        </Routes>
      </div>
    </Router>
  );
}