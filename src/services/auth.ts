
type Credentials = {
  email: string;
  password: string;
};

type UserData = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

// Mock auth service - replace with your actual API integration
export const authService = {
  // Normal login
  async login(credentials: Credentials): Promise<UserData> {
    try {
      // Replace with actual API call
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  // Register
  async register(credentials: Credentials): Promise<UserData> {
    try {
      // Replace with actual API call
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  
  // Logout
  async logout(): Promise<void> {
    // Replace with actual API call if needed
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },
  
  // Get current user
  getCurrentUser(): UserData | null {
    const userJSON = localStorage.getItem('user');
    return userJSON ? JSON.parse(userJSON) : null;
  },
};
