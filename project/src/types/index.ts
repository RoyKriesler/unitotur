// Base interface for common fields
interface BaseUser {
  id: string;
  user_id: string;
  user_name: string;
  email: string;
  created_at: string;
}

// Student specific interface
export interface Student extends BaseUser {}

// Teacher specific interface
export interface Teacher extends BaseUser {}

// Union type for profile
export type Profile = Student | Teacher;

export interface Session {
  id: string;
  student_id: string;
  tutor_id: string;
  start_time: string;
  end_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
  tutor?: Teacher;
  student?: Student;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  read_at: string | null;
  sender?: Profile;
  receiver?: Profile;
}