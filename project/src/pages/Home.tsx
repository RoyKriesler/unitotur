import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, DollarSign, Target, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate('/dashboard');
    }
  }, [session, navigate]);

  const features = [
    {
      icon: <DollarSign className="h-8 w-8 text-blue-600" />,
      title: 'מחיר הוגן לכולם',
      description: 'הפלטפורמה בנויה כך שכולם יוצאים מרוצים. מורים מרוויחים את מה שמגיע להם, והתלמידים מקבלים שיעורים איכותיים במחיר הוגן.'
    },
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: 'מורים רלוונטיים שיודעים בדיוק מה צריך',
      description: 'למד ממי שכבר היה בדיוק במקומך. הסטודנטים שמלמדים אותך למדו את אותו החומר בשנה-שנתיים האחרונות, כך שהם יודעים בדיוק איך לגשת למבחנים, אילו נושאים חשובים ואיך להעביר את הידע בצורה הכי ברורה.'
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: 'פחות חיפושים-יותר למידה',
      description: 'תהליך הזמנת שיעור בפלטפורמה פשוט ואינטואיטיבי: חפש מורה ← בחר תאריך ושעה ← קבע שיעור תוך דקות'
    }
  ];

  const title = "התחברו עם מורים פרטיים מהאוניברסיטה";
  const words = title.split(' ');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              <div className="inline-flex flex-wrap justify-center gap-x-3">
                {words.map((word, wordIndex) => (
                  <div key={wordIndex} className="inline-flex">
                    {word.split('').map((letter, letterIndex) => (
                      <span
                        key={`${wordIndex}-${letterIndex}`}
                        className="hover:text-blue-600 transition-colors duration-300"
                      >
                        {letter}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </h1>
            <p className="text-2xl mb-12">
              סטודנטים מלמדים סטודנטים
            </p>
            <div className="flex justify-center gap-4">
             
              <Link
                to="/register?role=student"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition text-lg"
              >
                הרשמה כתלמיד
              </Link>
               <Link
                to="/register?role=tutor"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition text-lg"
              >
                הרשמה כמורה
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 relative"
              >
                <div className="absolute top-6 left-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 mt-8">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}