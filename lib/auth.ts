
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  loyaltyPoints?: number;
  addresses?: Address[];
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}

class AuthService {
  private users: User[] = [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@freshmart.com',
      role: 'admin'
    },
    {
      id: '2',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+91 98765 43210',
      role: 'customer',
      loyaltyPoints: 250,
      addresses: [
        {
          id: '1',
          name: 'Home',
          street: '123 Main Street, Apt 4B',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001',
          isDefault: true
        }
      ]
    }
  ];

  login(email: string, password: string): Promise<{ user: User; token: string }> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(u => u.email === email);
        if (user && password === 'password123') {
          const token = 'mock-jwt-token-' + user.id;
          localStorage.setItem('auth_token', token);
          localStorage.setItem('user', JSON.stringify(user));
          resolve({ user, token });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  }

  register(userData: Omit<User, 'id'> & { password: string }): Promise<{ user: User; token: string }> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingUser = this.users.find(u => u.email === userData.email);
        if (existingUser) {
          reject(new Error('Email already exists'));
          return;
        }

        const newUser: User = {
          ...userData,
          id: Date.now().toString(),
          role: 'customer',
          loyaltyPoints: 0,
          addresses: []
        };
        
        this.users.push(newUser);
        const token = 'mock-jwt-token-' + newUser.id;
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user', JSON.stringify(newUser));
        resolve({ user: newUser, token });
      }, 1000);
    });
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }

  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  getUserById(userId: string): User | undefined {
    return this.users.find(user => user.id === userId);
  }

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const authService = new AuthService();
