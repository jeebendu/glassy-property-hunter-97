import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/auth';
import { toast } from '@/hooks/use-toast';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

interface GoogleJwtPayload {
  email: string;
  name: string;
  picture: string;
  [key: string]: any;
}

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
  phone?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  photoUrl?: string;
  idToken?: string;
  gender?: string;
  roles?: any[];
  provider?: string;
  dob?: string;
  agent?: boolean;
  admin?: boolean;
} | null;

interface AuthContextType {
  user: UserData;
  isLoading: boolean;
  isOtpSent: boolean;
  authToken: string | null;
  loginEmail: string | null;
  sendOtp: (email: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
  login: (credentials: Credentials) => Promise<void>;
  register: (credentials: Credentials) => Promise<void>;
  logout: () => Promise<void>;
  googleLogin: (response: any) => Promise<void>;
  resetOtpState: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loginEmail, setLoginEmail] = useState<string | null>(null);

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
      const { authToken } = await authService.sendOtp(email);
      setAuthToken(authToken);
      setLoginEmail(email);
      setIsOtpSent(true);
      toast({
        title: "OTP Sent",
        description: "Please check your email for the OTP",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to send OTP",
        description: error instanceof Error ? error.message : "Please try again",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (otp: string) => {
    setIsLoading(true);
    try {
      if (!loginEmail || !authToken) {
        throw new Error("Email or auth token is missing");
      }
      
      const userData = await authService.verifyOtpAndLogin({
        email: loginEmail,
        otp: otp,
        authToken: authToken
      });
      
      setUser(userData);
      setIsOtpSent(false);
      setAuthToken(null);
      setLoginEmail(null);
      
      toast({
        title: "Success!",
        description: "You have successfully logged in.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "OTP verification failed",
        description: error instanceof Error ? error.message : "Please try again with the correct OTP",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: Credentials) => {
    setIsLoading(true);
    try {
      const { authToken } = await authService.sendOtp(credentials.email);
      setAuthToken(authToken);
      setLoginEmail(credentials.email);
      setIsOtpSent(true);
      
      toast({
        title: "OTP Sent",
        description: "Please check your email for the OTP",
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

  const googleLogin = async (response: any) => {
    setIsLoading(true);
    try {
      const decoded = jwtDecode(response.credential) as GoogleJwtPayload;
      const userData = await authService.googleLogin({
        email: decoded.email,
        name: decoded.name,
        imageUrl: decoded.picture,
      });
      
      setUser(userData);
      
      toast({
        title: "Success!",
        description: "Logged in with Google successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Google login failed",
        description: "Please try again.",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetOtpState = () => {
    setIsOtpSent(false);
    setAuthToken(null);
    setLoginEmail(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      isOtpSent,
      authToken,
      loginEmail,
      sendOtp,
      verifyOtp,
      login, 
      register, 
      logout, 
      googleLogin,
      resetOtpState
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
