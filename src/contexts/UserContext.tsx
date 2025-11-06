'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string;
}

interface UserContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('userProfile');
      if (saved) return JSON.parse(saved);
    }
    return {
      name: 'Admin User',
      email: 'admin@studio.com',
      phone: '+1 (555) 000-0000',
      bio: 'Platform Administrator',
      avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0ea5e9&color=fff'
    };
  });

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  return (
    <UserContext.Provider value={{ profile, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
}
