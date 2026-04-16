import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider?: 'email' | 'google' | 'github';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithGithub: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Google OAuth Configuration
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID'; // Replace with your actual client ID
const GOOGLE_REDIRECT_URI = typeof window !== 'undefined' 
  ? `${window.location.origin}/auth/callback/google` 
  : '';

// GitHub OAuth Configuration
const GITHUB_CLIENT_ID = 'YOUR_GITHUB_CLIENT_ID'; // Replace with your actual client ID
const GITHUB_REDIRECT_URI = typeof window !== 'undefined' 
  ? `${window.location.origin}/auth/callback/github` 
  : '';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 检查本地存储的登录状态
  useEffect(() => {
    const storedUser = localStorage.getItem('rendabio_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Handle OAuth callback
  useEffect(() => {
    const handleOAuthCallback = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const provider = window.location.pathname.includes('google') ? 'google' : 
                       window.location.pathname.includes('github') ? 'github' : null;

      if (code && provider) {
        // In a real app, you would exchange the code for tokens with your backend
        console.log(`OAuth callback received for ${provider}:`, code);
        
        // For demo purposes, create a mock user
        const mockUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          email: `user@${provider}.com`,
          name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${provider}`,
          provider: provider as 'google' | 'github',
        };
        
        setUser(mockUser);
        localStorage.setItem('rendabio_user', JSON.stringify(mockUser));
        
        // Clean up URL
        window.history.replaceState({}, document.title, '/dashboard');
      }
    };

    handleOAuthCallback();
  }, []);

  const login = async (_email: string, _password: string) => {
    // 模拟登录 API 调用
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 模拟用户数据
    const mockUser: User = {
      id: '1',
      email: _email,
      name: _email.split('@')[0],
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${_email}`,
      provider: 'email',
    };
    
    setUser(mockUser);
    localStorage.setItem('rendabio_user', JSON.stringify(mockUser));
  };

  const loginWithGoogle = async () => {
    // For demo: Show alert and create mock user
    // In production: Redirect to Google OAuth
    
    // Check if running in demo mode (no real client ID)
    if (GOOGLE_CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID') {
      // Demo mode - simulate Google login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: 'google.user@gmail.com',
        name: 'Google User',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=google',
        provider: 'google',
      };
      
      setUser(mockUser);
      localStorage.setItem('rendabio_user', JSON.stringify(mockUser));
      return;
    }

    // Production: Redirect to Google OAuth
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${GOOGLE_CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}` +
      `&response_type=code` +
      `&scope=${encodeURIComponent('openid email profile')}` +
      `&state=${Math.random().toString(36).substr(2, 9)}`;
    
    window.location.href = googleAuthUrl;
  };

  const loginWithGithub = async () => {
    // For demo: Show alert and create mock user
    // In production: Redirect to GitHub OAuth
    
    // Check if running in demo mode (no real client ID)
    if (GITHUB_CLIENT_ID === 'YOUR_GITHUB_CLIENT_ID') {
      // Demo mode - simulate GitHub login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: 'github.user@github.com',
        name: 'GitHub User',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=github',
        provider: 'github',
      };
      
      setUser(mockUser);
      localStorage.setItem('rendabio_user', JSON.stringify(mockUser));
      return;
    }

    // Production: Redirect to GitHub OAuth
    const githubAuthUrl = `https://github.com/login/oauth/authorize?` +
      `client_id=${GITHUB_CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(GITHUB_REDIRECT_URI)}` +
      `&scope=${encodeURIComponent('user:email read:user')}` +
      `&state=${Math.random().toString(36).substr(2, 9)}`;
    
    window.location.href = githubAuthUrl;
  };

  const register = async (name: string, email: string, _password: string) => {
    // 模拟注册 API 调用
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      email,
      name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      provider: 'email',
    };
    
    setUser(mockUser);
    localStorage.setItem('rendabio_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rendabio_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithGoogle,
        loginWithGithub,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
