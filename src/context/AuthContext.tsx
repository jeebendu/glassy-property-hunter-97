
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/auth';
import { toast } from '@/hooks/use-toast';

type Credentials = {
  email: string;
  password?: string;
  phone?: string;
  otp?: string;
  authToken?: string;
};

type UserData = {
  id?: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  provider?: string;
  idToken?: string;
  roles?: Array<{id: number; name: string; permissions: Array<{id: number; name: string}>}>;
  gender?: string;
  photoUrl?: string;
};

interface AuthContextType {
  user: UserData | null;
  isLoading: boolean;
  otpSent: boolean;
  authToken: string | null;
  sendOtp: (email: string) => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
  login: (credentials: Credentials) => Promise<void>;
  register: (credentials: Credentials) => Promise<void>;
  logout: () => Promise<void>;
  googleLogin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = authService.getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const sendOtp = async (email: string) => {
    setIsLoading(true);
    try {
      const response = await authService.sendOtp(email);
      
      const tokenParts = response.message.split('::');
      if (tokenParts.length > 1) {
        const extractedToken = tokenParts[0];
        setAuthToken(extractedToken);
      }
      
      setOtpSent(true);
      toast({
        title: "OTP Sent!",
        description: "Please check your email for the OTP",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to send OTP",
        description: "Please check your email and try again",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (email: string, otp: string) => {
    setIsLoading(true);
    try {
      const userData = await authService.verifyOtp({
        email,
        otp,
        authToken: authToken || undefined,
        phone: null,
      });
      
      const formattedUser = {
        name: userData.name || `${userData.firstName || ''} ${userData.lastName || ''}`.trim(),
        email: userData.email,
        avatar: userData.photoUrl,
        ...userData,
      };
      
      setUser(formattedUser);
      setOtpSent(false);
      setAuthToken(null);
      
      toast({
        title: "Success!",
        description: "You have successfully logged in",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: "Invalid OTP. Please try again",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: Credentials) => {
    setIsLoading(true);
    try {
      await sendOtp(credentials.email);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please check your credentials and try again",
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
        description: "Your account has been created",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "Please try again with different credentials",
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
        description: "You have been successfully logged out",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = async () => {
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
      description: "Logged in with Google successfully",
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      otpSent, 
      authToken, 
      sendOtp, 
      verifyOtp, 
      login, 
      register, 
      logout, 
      googleLogin 
    }}>
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
