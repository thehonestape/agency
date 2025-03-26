import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading auth state
    const timer = setTimeout(() => {
      // For development, always set as authenticated admin
      setUser({
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        isAdmin: true
      });
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
} 