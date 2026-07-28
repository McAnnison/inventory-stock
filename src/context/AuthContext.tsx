import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isSyncing: boolean;
  lastSync: Date | null;
  triggerSync: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('auth_token') === 'true';
  });
  const [user, setUser] = useState<any>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(() => {
    const stored = localStorage.getItem('last_sync');
    return stored ? new Date(stored) : null;
  });

  const login = async (email: string, password: string) => {
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          setIsAuthenticated(true);
          setUser({ email, name: 'Admin User' });
          localStorage.setItem('auth_token', 'true');
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 800);
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('auth_token');
  };

  const triggerSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      const now = new Date();
      setLastSync(now);
      localStorage.setItem('last_sync', now.toISOString());
      setIsSyncing(false);
    }, 1500);
  };

  // Simulate background sync when online
  useEffect(() => {
    if (isAuthenticated) {
      triggerSync();
      const interval = setInterval(triggerSync, 60000); // Sync every minute
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isSyncing, lastSync, triggerSync }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
