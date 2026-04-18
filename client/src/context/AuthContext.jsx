import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Dummy user for testing
  const [user] = useState({
    uid: 'dev_user_789',
    displayName: 'Test Student',
    email: 'test@example.com'
  });

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
