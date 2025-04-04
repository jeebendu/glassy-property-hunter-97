
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
};

const API_BASE_URL = 'https://uhapi.jeebendu.com/v1/public/auth';

// Auth service with API integration
export const authService = {
  // Send OTP
  async sendOtp(email: string): Promise<{ authToken: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/sendOtp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, reason: "Log-in" }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send OTP');
      }
      
      const data = await response.json();
      
      // Extract the auth token from the response message
      const authToken = data.message ? data.message.split('::')[0] : null;
      
      if (!authToken) {
        throw new Error('Auth token not found in the response');
      }
      
      return { authToken };
    } catch (error) {
      console.error('Send OTP error:', error);
      throw error;
    }
  },
  
  // Verify OTP and login
  async verifyOtpAndLogin(credentials: Credentials): Promise<UserData> {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          phone: credentials.phone || null,
          otp: credentials.otp,
          authToken: credentials.authToken
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'OTP verification failed');
      }
      
      const userData = await response.json();
      
      // Save user data and token to localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userData.idToken);
      
      return userData;
    } catch (error) {
      console.error('OTP verification error:', error);
      throw error;
    }
  },
  
  // Google login
  async googleLogin(googleData: any): Promise<UserData> {
    try {
      // If we need to send the google token to the backend, we would do it here
      // For now, we'll just return the user data from Google
      const userData = {
        email: googleData.email,
        name: googleData.name,
        avatar: googleData.imageUrl,
        photoUrl: googleData.imageUrl,
        provider: 'GOOGLE',
      };
      
      // Save user data to localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      
      return userData;
    } catch (error) {
      console.error('Google login error:', error);
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
    // Remove user data and token from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },
  
  // Get current user
  getCurrentUser(): UserData | null {
    const userJSON = localStorage.getItem('user');
    return userJSON ? JSON.parse(userJSON) : null;
  },
  
  // Check if user is authenticated
  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }
};
