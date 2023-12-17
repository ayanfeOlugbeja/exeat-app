import React, { useContext, createContext } from 'react';
import { auth } from './../firebaseConfig';

// Create an authentication context
const AuthContext = createContext();

// Create a provider component to wrap your app and provide the auth context
export const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{ auth }}>{children}</AuthContext.Provider>
  );
};

// Create a custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
