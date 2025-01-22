import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, Upload, Shield, AlertTriangle, School, GraduationCap, Calendar } from 'lucide-react';

export default function Settings() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Mock user data (replace with actual user data from context/API)
  const userData = {
    name: "ישראל ישראלי",
    email: "israel@example.com",
    university: "אוניברסיטת תל אביב",
    degree: "תואר ראשון במדעי המחשב",
    studyYear: "שנה ב'",
    birthYear: "2000"
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement password change logic
  };

  const handleDeleteAccount = () => {
    // Implement account deletion logic
    setShowDeleteConfirm(false);
  };

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
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center gap-4 mb-6">
            <User className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold">פרופיל</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Profile Picture */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-40 h-40">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="h-20 w-20 text-gray-400" />
                  </div>
                )}
                <label
                  htmlFor="profile-upload"
                  className="absolute bottom-2 right-2 bg-blue-600 rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors"
                >
                  <Upload className="h-5 w-5 text-white" />
                </label>
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <p className="text-sm text-gray-500">העלה תמונת פרופיל</p>
            </div>

            {/* Profile Details */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="h-5 w-5" />
                  <span className="font-medium">שם מלא:</span>
                  <span>{userData.name}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <School className="h-5 w-5" />
                  <span className="font-medium">מוסד לימודים:</span>
                  <span>{userData.university}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <GraduationCap className="h-5 w-5" />
                  <span className="font-medium">תואר:</span>
                  <span>{userData.degree}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-5 w-5" />
                  <span className="font-medium">שנת לימודים:</span>
                  <span>{userData.studyYear}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Security Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center gap-4 mb-6">
            <Shield className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold">אבטחה ופרטיות</h2>
          </div>

          {/* Change Password Form */}
          <form onSubmit={handlePasswordChange} className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700">סיסמה נוכחית</label>
              <div className="mt-1 relative">
                <input
                  type="password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <Lock className="h-5 w-5" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">סיסמה חדשה</label>
              <div className="mt-1 relative">
                <input
                  type="password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <Lock className="h-5 w-5" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">אימות סיסמה חדשה</label>
              <div className="mt-1 relative">
                <input
                  type="password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <Lock className="h-5 w-5" />
                </div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn-pattern btn-blue"
            >
              עדכן סיסמה
            </motion.button>
          </form>

          {/* Delete Account */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">מחיקת חשבון</h3>
                <p className="text-sm text-gray-500">פעולה זו תמחק את כל המידע שלך באופן קבוע</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowDeleteConfirm(true)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                מחק חשבון
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Delete Account Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowDeleteConfirm(false);
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
            >
              <div className="flex items-center gap-3 text-red-600 mb-4">
                <AlertTriangle className="h-6 w-6" />
                <h3 className="text-xl font-bold">מחיקת חשבון</h3>
              </div>
              <p className="text-gray-600 mb-6">
                האם אתה בטוח שברצונך למחוק את החשבון שלך? פעולה זו תמחק את כל המידע שלך באופן קבוע ולא ניתן יהיה לשחזר אותו.
              </p>
              <div className="flex justify-end gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ביטול
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDeleteAccount}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  מחק חשבון
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}