// src/auth/AuthContext.js: Context để quản lý auth state.
// Sử dụng AsyncStorage để lưu trữ.

import React, { createContext, useState, useEffect, useContext } from 'react';
import { getItem, setItem, removeItem } from '../utils/storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const storedUser = await getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  const login = async (token, userData) => {
    await setItem('token', token);
    await setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    await removeItem('token');
    await removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};