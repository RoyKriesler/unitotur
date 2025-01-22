import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DollarSign, Target, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TeacherCard from './TeacherCard';
import { mockTeachers } from '../data/mockData';

export default function Home() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [direction, setDirection] = React.useState(0);

  // Auto-rotate carousel with shorter interval
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);

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

  const features = [
    {
      icon: <DollarSign className="h-8 w-8 text-blue-600" />,
      title: ' כולם כולם !!!!!!!!מחיר הוגן לכולם',
      description: 'הפלטפורמה בנויה כך שכולם יוצאים מרוצים. מורים מרוויחים את מה שמגיע להם, והתלמידים מקבלים שיעורים איכותיים במחיר הוגן.'
    },
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: '!!!!מורים רלוונטיים שיודעים בדיוק מה צריך',
      description: 'למד ממי שכבר היה בדיוק במקומך. הסטודנטים שמלמדים אותך למדו את אותו החומר בשנה-שנתיים האחרונות, כך שהם יודעים בדיוק איך לגשת למבחנים, אילו נושאים חשובים ואיך להעביר את הידע בצורה הכי ברורה.'
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: 'פחות חיפושים-יותר למידה',
      description: 'תהליך הזמנת שיעור בפלטפורמה פשוט ואינטואיטיבי: חפש מורה ← בחר תאריך ושעה ← קבע שיעור תוך דקות'
    }
  ];

  const title = "התחברו עם מורים פרטיים מהאוניברסיטה";
  const subtitle = "סטודנטים מלמדים סטודנטים";
  const words = title.split(' ');
  const subtitleWords = subtitle.split(' ');

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % mockTeachers.length);
    setTimeout(() => setIsAnimating(false), 1200);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + mockTeachers.length) % mockTeachers.length);
    setTimeout(() => setIsAnimating(false), 1200);
  };

  const getVisibleTeachers = () => {
    const teachers = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + mockTeachers.length) % mockTeachers.length;
      teachers.push({ ...mockTeachers[index], position: i });
    }
    return teachers;
  };

  return (
    <div className="min-h-screen" dir="rtl">
      {/* Teacher Carousel Section */}
      <div className="pt-20 pb-8 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-[300px] perspective-1000">
            <div className="relative w-full h-full">
              <AnimatePresence initial={false} custom={direction}>
                {getVisibleTeachers().map((teacher) => (
                  <motion.div
                    key={`${teacher.id}-${teacher.position}`}
                    custom={direction}
                    className="absolute top-0 left-0 right-0 w-full md:w-2/5 mx-auto"
                    initial={(custom) => ({
                      rotateY: custom * 90,
                      x: `${custom * 100}%`,
                      opacity: 0,
                      scale: 0.8,
                      zIndex: 0
                    })}
                    animate={{
                      rotateY: 0,
                      x: `${teacher.position * 100}%`,
                      opacity: teacher.position === 0 ? 1 : 0.5,
                      scale: teacher.position === 0 ? 1 : 0.8,
                      zIndex: teacher.position === 0 ? 1 : 0
                    }}
                    exit={(custom) => ({
                      rotateY: custom * -90,
                      x: `${-custom * 100}%`,
                      opacity: 0,
                      scale: 0.8,
                      zIndex: 0
                    })}
                    transition={{
                      type: "spring",
                      stiffness: 150,
                      damping: 20,
                      mass: 1,
                      duration: 1.2
                    }}
                    style={{
                      transformStyle: "preserve-3d"
                    }}
                  >
                    <TeacherCard
                      teacher={teacher}
                      onClick={() => navigate(`/teacher/${teacher.id}`)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg text-blue-600 hover:bg-blue-50"
              style={{ zIndex: 10 }}
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg text-blue-600 hover:bg-blue-50"
              style={{ zIndex: 10 }}
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24"
      >
        <div className="absolute inset-0 opacity-30" style={diagonalPattern} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              <div className="inline-flex flex-wrap justify-center gap-x-3">
                {words.map((word, wordIndex) => (
                  <div key={wordIndex} className="inline-flex">
                    {word.split('').map((letter, letterIndex) => (
                      <span
                        key={`${wordIndex}-${letterIndex}`}
                        className="inline-block transform origin-center cursor-pointer transition-all duration-200 hover:scale-125"
                      >
                        {letter}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </h1>
            <div className="text-2xl mb-12">
              <div className="inline-flex flex-wrap justify-center gap-x-3">
                {subtitleWords.map((word, wordIndex) => (
                  <div key={wordIndex} className="inline-flex">
                    {word.split('').map((letter, letterIndex) => (
                      <span
                        key={`subtitle-${wordIndex}-${letterIndex}`}
                        className="inline-block transform origin-center cursor-pointer transition-all duration-200 hover:scale-125"
                      >
                        {letter}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col sm:flex-row justify-center gap-4 items-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/schedule" className={buttonStyle}>
                  <div className="absolute inset-0 opacity-0 hover:opacity-10 transition-opacity" style={diagonalPattern} />
                  מצא מורה
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="py-24" style={{
        background: `repeating-linear-gradient(
          45deg,
          rgba(37, 99, 235, 0.03) 0px,
          rgba(37, 99, 235, 0.03) 2px,
          transparent 2px,
          transparent 12px
        )`
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative group cursor-pointer border-2 border-transparent hover:border-blue-600"
              >
                <div className="absolute top-6 left-6 transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 mt-8 transition-all duration-300 group-hover:tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed transition-all duration-300 group-hover:tracking-wide">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
