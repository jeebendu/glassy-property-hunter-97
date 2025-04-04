
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/auth';
import { toast } from '@/hooks/use-toast';

type Credentials = {
  email: string;
  password: string;
};

type UserData = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
} | null;

interface AuthContextType {
  user: UserData;
  isLoading: boolean;
  login: (credentials: Credentials) => Promise<void>;
  register: (credentials: Credentials) => Promise<void>;
  logout: () => Promise<void>;
  googleLogin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = authService.getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: Credentials) => {
    setIsLoading(true);
    try {
      const userData = await authService.login(credentials);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      toast({
        title: "Success!",
        description: "You have successfully logged in.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please check your credentials and try again.",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: Credentials) => {
    setIsLoading(true);
    try {
      const userData = await authService.register(credentials);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      toast({
        title: "Success!",
        description: "Your account has been created.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "Please try again with different credentials.",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = async () => {
    // This would normally handle Google OAuth flow
    // For now, we'll simulate a successful login
    const mockGoogleUser = {
      id: 'google-123',
      name: 'Google User',
      email: 'google@example.com',
      avatar: 'https://example.com/avatar.jpg',
    };
    
    setUser(mockGoogleUser);
    localStorage.setItem('user', JSON.stringify(mockGoogleUser));
    
    toast({
      title: "Success!",
      description: "Logged in with Google successfully.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, googleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
