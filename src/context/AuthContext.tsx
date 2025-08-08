import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types/auth';
import { authService } from '../services/auth';

type AuthContextType = {
  user: User | null;
  currentUser: User | null; // Alias for user for consistency with Next.js
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id' | 'role' | 'loyaltyPoints' | 'addresses'> & { password: string }) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Type guard to check if a value is a valid User role
  const isValidRole = (role: any): role is 'admin' | 'user' | 'customer' => {
    return ['admin', 'user', 'customer'].includes(role);
  };

  // Function to safely parse user data from localStorage
  const parseUserData = (data: any): User | null => {
    try {
      if (!data) return null;
      
      const user: Partial<User> = { ...data };
      
      // Ensure required fields exist and have correct types
      const parsedUser: User = {
        id: typeof user.id === 'string' ? user.id : '',
        name: typeof user.name === 'string' ? user.name : '',
        email: typeof user.email === 'string' ? user.email : '',
        phone: typeof user.phone === 'string' ? user.phone : '',
        role: isValidRole(user.role) ? user.role : 'customer',
        loyaltyPoints: typeof user.loyaltyPoints === 'number' ? user.loyaltyPoints : 0,
        addresses: Array.isArray(user.addresses) ? user.addresses : [],
      };
      
      // Add optional fields if they exist
      if (user.createdAt) parsedUser.createdAt = user.createdAt;
      if (user.updatedAt) parsedUser.updatedAt = user.updatedAt;
      
      return parsedUser;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  };

  // Check if user is already logged in on initial load
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      const parsedUser = parseUserData(currentUser);
      if (parsedUser) {
        setUser(parsedUser);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      if (response.success) {
        // Get the updated user data from auth service
        const user = authService.getCurrentUser();
        if (user) {
          const userWithRole: User = {
            ...user,
            role: user.role as 'user' | 'admin', // Ensure role is properly typed
            loyaltyPoints: 0, // Default value
            addresses: [],    // Default value
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          setUser(userWithRole);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const register = async (userData: Omit<User, 'id' | 'role' | 'loyaltyPoints' | 'addresses' | 'createdAt' | 'updatedAt'> & { password: string }) => {
    try {
      const response = await authService.register({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        phone: userData.phone || ''
      });

      if (response.success) {
        // Get the registered user data from auth service
        const user = authService.getCurrentUser();
        if (user) {
          const userWithRole: User = {
            ...user,
            role: 'user' as const, // New users are always 'user' role
            phone: userData.phone || '',
            loyaltyPoints: 0, // Default value for new users
            addresses: [],    // Default value for new users
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          setUser(userWithRole);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    currentUser: user, // Alias for user for consistency with Next.js
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
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
