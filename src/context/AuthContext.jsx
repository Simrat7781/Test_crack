import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing session on mount
  useEffect(() => {
    const token = localStorage.getItem('assessly_token');
    if (token) {
      authService
        .getCurrentUser(token)
        .then((userData) => {
          if (userData) {
            setUser(userData);
          } else {
            localStorage.removeItem('assessly_token');
          }
        })
        .catch(() => {
          localStorage.removeItem('assessly_token');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password, remember = false) => {
    setError(null);
    setLoading(true);
    try {
      const { user: userData, token } = await authService.login(email, password);
      if (remember) {
        localStorage.setItem('assessly_token', token);
      } else {
        sessionStorage.setItem('assessly_token', token);
        localStorage.setItem('assessly_token', token); // for demo simplicity
      }
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setError(null);
    setLoading(true);
    try {
      const { user: newUser, token } = await authService.register(userData);
      localStorage.setItem('assessly_token', token);
      setUser(newUser);
      return newUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('assessly_token');
    sessionStorage.removeItem('assessly_token');
    setUser(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
    isAuthenticated: !!user,
    isStudent: user?.role === 'student',
    isRecruiter: user?.role === 'recruiter',
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
