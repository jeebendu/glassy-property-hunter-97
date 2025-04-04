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

// API service integration
export const authService = {
  // Send OTP to email
  async sendOtp(email: string, reason: string = "Log-in"): Promise<{status: boolean; message: string}> {
    try {
      const response = await fetch('https://uhapi.jeebendu.com/v1/public/auth/sendOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, reason }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send OTP');
      }
      
      return await response.json();
    } catch (error) {
      console.error('OTP request error:', error);
      throw error;
    }
  },
  
  // Login with OTP
  async verifyOtp(credentials: Credentials): Promise<UserData> {
    try {
      const response = await fetch('https://uhapi.jeebendu.com/v1/public/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      if (!response.ok) {
        throw new Error('OTP verification failed');
      }
      
      const userData = await response.json();
      
      // Store user data and token
      localStorage.setItem('user', JSON.stringify(userData));
      if (userData.idToken) {
        localStorage.setItem('token', userData.idToken);
      }
      
      return userData;
    } catch (error) {
      console.error('OTP verification error:', error);
      throw error;
    }
  },
  
  // Normal login - legacy
  async login(credentials: Credentials): Promise<UserData> {
    try {
      // This is now handled by the OTP flow
      // This method is kept for backward compatibility
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
  
  // Register - legacy
  async register(credentials: Credentials): Promise<UserData> {
    try {
      // This would be integrated with the API as needed
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
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },
  
  // Get current user
  getCurrentUser(): UserData | null {
    const userJSON = localStorage.getItem('user');
    return userJSON ? JSON.parse(userJSON) : null;
  },
};
