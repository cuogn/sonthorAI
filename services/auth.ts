// Mock Authentication Service
// Tài khoản giả lập để test đăng nhập

export interface User {
  id: string;
  email: string;
  password: string; // In real app, never store plain text!
  name: string;
  role: 'admin' | 'analyst' | 'user';
  avatar?: string;
}

// Mock users database
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@sonthor.ai',
    password: 'admin123',
    name: 'Admin SONTHOR',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '2',
    email: 'analyst@sonthor.ai',
    password: 'analyst123',
    name: 'Nguyễn Phân Tích',
    role: 'analyst',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '3',
    email: 'user@sonthor.ai',
    password: 'user123',
    name: 'Trần Đầu Tư',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '4',
    email: 'demo@demo.com',
    password: 'demo',
    name: 'Demo User',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
  }
];

// Auth state (in-memory, resets on refresh)
let currentUser: User | null = null;

export const authService = {
  login: (email: string, password: string): Promise<{ success: boolean; user?: Omit<User, 'password'>; error?: string }> => {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        const user = mockUsers.find(u => u.email === email && u.password === password);
        
        if (user) {
          const { password: _, ...safeUser } = user;
          currentUser = user;
          // Store in localStorage for persistence
          localStorage.setItem('sonthor_user', JSON.stringify(safeUser));
          resolve({ success: true, user: safeUser });
        } else {
          resolve({ success: false, error: 'Email hoặc mật khẩu không đúng' });
        }
      }, 800); // 800ms delay to simulate API call
    });
  },

  logout: (): void => {
    currentUser = null;
    localStorage.removeItem('sonthor_user');
  },

  getCurrentUser: (): Omit<User, 'password'> | null => {
    if (currentUser) {
      const { password: _, ...safeUser } = currentUser;
      return safeUser;
    }
    // Try to restore from localStorage
    const stored = localStorage.getItem('sonthor_user');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
    return null;
  },

  isAuthenticated: (): boolean => {
    return authService.getCurrentUser() !== null;
  }
};

// Export mock credentials for display on login page
export const demoCredentials = [
  { email: 'admin@sonthor.ai', password: 'admin123', role: 'Admin' },
  { email: 'analyst@sonthor.ai', password: 'analyst123', role: 'Analyst' },
  { email: 'user@sonthor.ai', password: 'user123', role: 'User' },
  { email: 'demo@demo.com', password: 'demo', role: 'Demo' },
];
