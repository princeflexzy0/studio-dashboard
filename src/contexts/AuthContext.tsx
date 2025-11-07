'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock credentials
const MOCK_USER = {
  email: 'admin@test.com',
  password: 'Test@123',
  name: 'Admin User',
  role: 'admin'
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      const authToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('auth-token='))
        ?.split('=')[1];

      if (authToken) {
        // User is authenticated
        setUser({
          email: MOCK_USER.email,
          name: MOCK_USER.name,
          role: MOCK_USER.role
        });
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check credentials
    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      // Set cookie (expires in 7 days)
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 7);
      document.cookie = `auth-token=mock-token-${Date.now()}; expires=${expiryDate.toUTCString()}; path=/`;

      // Set user
      const userData = {
        email: MOCK_USER.email,
        name: MOCK_USER.name,
        role: MOCK_USER.role
      };
      setUser(userData);

      console.log('✅ Login successful!', userData);
      return true;
    }

    console.log('❌ Login failed - Invalid credentials');
    return false;
  };

  const logout = () => {
    // Remove cookie
    document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
