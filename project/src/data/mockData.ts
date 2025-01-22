// Mock teachers data
export const mockTeachers = [
  {
    id: '1',
    name: 'דניאל כהן',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    university: 'אוניברסיטת רייכמן',
    degree: 'תואר ראשון במדעי המחשב (B.Sc)',
    subjects: ['מדעי המחשב', 'אלגוריתמים', 'תכנות'],
    rating: 4.8,
    pricePerHour: 150,
    availability: ['ימי א-ה', '16:00-21:00'],
  },
  {
    id: '2',
    name: 'מיכל לוי',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    university: 'אוניברסיטת תל אביב',
    degree: 'תואר ראשון בכלכלה (B.A)',
    subjects: ['כלכלה', 'סטטיסטיקה', 'מתמטיקה'],
    rating: 4.9,
    pricePerHour: 180,
    availability: ['ימי ב-ו', '14:00-20:00'],
  },
  {
    id: '3',
    name: 'יוסי אברהם',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    university: 'האוניברסיטה העברית',
    degree: 'תואר ראשון במשפטים (LL.B)',
    subjects: ['משפטים', 'אנגלית'],
    rating: 4.7,
    pricePerHour: 200,
    availability: ['ימי א-ה', '09:00-18:00'],
  },
  {
    id: '4',
    name: 'רונית שרון',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    university: 'אוניברסיטת בן גוריון',
    degree: 'תואר ראשון בפסיכולוגיה (B.A)',
    subjects: ['פסיכולוגיה', 'סטטיסטיקה'],
    rating: 4.9,
    pricePerHour: 190,
    availability: ['ימי א-ו', '10:00-20:00'],
  },
  {
    id: '5',
    name: 'אלון גולן',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    university: 'הטכניון',
    degree: 'תואר ראשון במדעי המחשב (B.Sc)',
    subjects: ['מדעי המחשב', 'מתמטיקה', 'אלגוריתמים'],
    rating: 4.8,
    pricePerHour: 170,
    availability: ['ימי א-ה', '12:00-20:00'],
  }
];

// Get current date for examples
const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);
const lastWeek = new Date();
lastWeek.setDate(today.getDate() - 7);

// Mock upcoming lessons data
export const mockUpcomingLessons = [
  {
    teacherName: 'דניאל כהן',
    teacherImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    subject: 'מדעי המחשב',
    date: tomorrow.toISOString().split('T')[0],
    time: '17:00-18:30',
  },
  {
    teacherName: 'מיכל לוי',
    teacherImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    subject: 'כלכלה',
    date: '2024-03-22',
    time: '15:00-16:30',
  },
];

// Mock previous lessons data
export const mockPreviousLessons = [
  {
    teacherName: 'דניאל כהן',
    teacherImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    subject: 'אלגוריתמים',
    date: lastWeek.toISOString().split('T')[0],
    time: '16:00-17:30',
  },
  {
    teacherName: 'מיכל לוי',
    teacherImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    subject: 'סטטיסטיקה',
    date: '2024-03-10',
    time: '14:00-15:30',
  }
];