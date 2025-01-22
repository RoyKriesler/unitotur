import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrollRotation, setScrollRotation] = React.useState(0);
  const [lastScrollPosition, setLastScrollPosition] = React.useState(0);
  const [totalRotation, setTotalRotation] = React.useState(0);
  const brandName = "UniTotur";

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      const scrollDelta = currentScrollPosition - lastScrollPosition;
      const rotationFactor = 0.5;
      
      setTotalRotation(prev => {
        const newRotation = prev + (scrollDelta * rotationFactor);
        return newRotation % 360;
      });
      
      setLastScrollPosition(currentScrollPosition);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollPosition]);

  const handleLogoClick = () => {
    navigate('/');
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const navButtonStyle = "relative px-6 py-2 rounded-lg font-semibold text-base cursor-pointer transition-all duration-200";

  const diagonalPattern = {
    background: `repeating-linear-gradient(
      -45deg,
      rgb(37, 99, 235) 0px,
      rgb(37, 99, 235) 2px,
      transparent 2px,
      transparent 12px
    )`
  };

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-blue-50/95"
      style={{
        borderBottom: '1px solid rgba(37, 99, 235, 0.1)',
        boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.1), 0 2px 4px -1px rgba(37, 99, 235, 0.06)'
      }}
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <motion.button 
              onClick={handleLogoClick}
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                style={{ transform: `rotate(${totalRotation}deg)` }}
                className="transition-transform duration-300 ease-out"
              >
                <BookOpen className="h-8 w-8 text-blue-600" />
              </motion.div>
              <div className="mr-2 text-xl font-bold text-gray-900 flex flex-row-reverse">
                {brandName.split('').map((letter, index) => (
                  <motion.div
                    key={index}
                    className="hover:text-blue-600"
                    style={{
                      transform: `rotate(${totalRotation}deg)`,
                      transformOrigin: 'center center',
                      transition: 'transform 300ms ease-out',
                      willChange: 'transform'
                    }}
                    whileHover={{ scale: 1.2 }}
                  >
                    {letter}
                  </motion.div>
                ))}
              </div>
            </motion.button>
          </div>

          <div className="flex items-center space-x-4 space-x-reverse">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/schedule"
                className={`${navButtonStyle} ${
                  isActivePath('/schedule')
                    ? 'bg-blue-100 text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:bg-blue-100 hover:text-blue-600'
                }`}
              >
                <div className="absolute inset-0 opacity-0 hover:opacity-10 transition-opacity rounded-lg" style={diagonalPattern} />
                מצא מורה
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  );
}