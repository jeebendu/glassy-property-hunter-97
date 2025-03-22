
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types for our auth context
type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
};

// Create the auth context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate checking for existing session on mount
  useEffect(() => {
    // In a real app, this would check for an existing session
    const checkSession = async () => {
      try {
        // This is just a mock - in a real app you would check localStorage, cookies, or an API
        const savedUser = localStorage.getItem('user');
        
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkSession();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock login - in a real app, this would call an API
      // Simulate a successful login after 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: '123',
        name: 'Demo User',
        email,
      };
      
      // Save to localStorage (for demo purposes only)
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Signup function
  const signup = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      // Mock signup - in a real app, this would call an API
      // Simulate a successful signup after 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: '123',
        name,
        email,
      };
      
      // Save to localStorage (for demo purposes only)
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    try {
      // Mock logout - in a real app, this would call an API
      // Simulate a successful logout after 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Remove from localStorage
      localStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Create the auth value object
  const authValue: AuthContextType = {
    user,
    loading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};
