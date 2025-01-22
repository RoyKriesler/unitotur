import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
  session: boolean;
  signIn: () => void;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: false,
  signIn: () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState(false);
  const navigate = useNavigate();

  const signIn = () => {
    setSession(true);
  };

  const signOut = async () => {
    setSession(false);
    navigate('/');
  };

  const value = {
    session,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};