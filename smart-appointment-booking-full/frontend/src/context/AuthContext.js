import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on component mount
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const result = await authService.login(email, password);
    if (result.success) {
      setUser(result.data);
    }
    return result;
  };

  const register = async (userData) => {
    const result = await authService.register(userData);
    if (result.success) {
      setUser(result.data);
    }
    return result;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isServiceProvider: user?.role === 'SERVICE_PROVIDER',
    isAdmin: user?.role === 'ADMIN',
    isCustomer: user?.role === 'CUSTOMER',
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};