import { jwtDecode } from 'jwt-decode';
import { User } from '@/types/auth';

// Re-export the User type for backward compatibility
export type { User };

interface AuthService {
  getCurrentUser: () => User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (userData: { name: string; email: string; password: string; phone?: string; role?: string }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
  getToken: () => string | null;
}

export const authService: AuthService = {
  getCurrentUser: (): User | null => {
    // First try to get user from localStorage
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        const user = JSON.parse(userString);
        // Ensure the role is one of the allowed values
        const role = (user.role === 'admin' || user.role === 'user' || user.role === 'customer') 
          ? user.role 
          : 'user';
          
        return {
          id: user.id || '',
          email: user.email || '',
          name: user.name || 'User',
          phone: user.phone || '',
          role,
          loyaltyPoints: user.loyaltyPoints || 0,
          addresses: user.addresses || []
        };
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    
    // Fallback to token if user data not found in localStorage
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
      const decoded: any = jwtDecode(token);
      // Ensure the role is one of the allowed values
      const role = (decoded.role === 'admin' || decoded.role === 'user' || decoded.role === 'customer')
        ? decoded.role
        : 'user';
        
      return {
        id: decoded.sub || '',
        email: decoded.email || '',
        name: decoded.name || 'User',
        phone: decoded.phone || '',
        role,
        loyaltyPoints: decoded.loyaltyPoints || 0,
        addresses: decoded.addresses || []
      };
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  },

  login: async (email: string, password: string) => {
    // In a real app, you would make an API call to your backend
    // This is a mock implementation
    
    // Admin credentials
    if (email.toLowerCase() === 'admin@gokulbhandar.com' && password === 'password123') {
      const user = {
        id: '1',
        email: 'admin@gokulbhandar.com',
        name: 'Admin User',
        role: 'admin',
        phone: '',
        loyaltyPoints: 0,
        addresses: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const token = 'mock-jwt-token';
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { success: true };
    }
    
    // Check for other users in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    
    if (user) {
      // Remove password before storing user data
      const { password: _, ...userData } = user;
      const token = `mock-jwt-token-${Date.now()}`;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { success: true };
    }
    
    return { success: false, message: 'Invalid credentials. Please check your email and password.' };
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },

  isAdmin: (): boolean => {
    const user = authService.getCurrentUser();
    return user?.role === 'admin';
  },

  getToken: (): string | null => {
    return localStorage.getItem('token');
  },
  
  register: async (userData: { name: string; email: string; password: string; phone?: string }) => {
    // In a real app, you would make an API call to your backend
    // This is a mock implementation
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists (in a real app, this would be checked on the server)
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = users.some((user: any) => user.email === userData.email);
      
      if (userExists) {
        return { success: false, message: 'Email already registered' };
      }
      
      // Create new user
      const newUser = {
        id: `user-${Date.now()}`,
        name: userData.name,
        email: userData.email,
        role: 'user',
        phone: userData.phone || '',
        loyaltyPoints: 0,
        addresses: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Save user to local storage (in a real app, this would be handled by the backend)
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Log the user in automatically after registration
      const token = `mock-jwt-token-${Date.now()}`;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      return { success: true };
    } catch (error) {
      console.error('Registration failed:', error);
      return { success: false, message: 'Registration failed. Please try again.' };
    }
  }
};
