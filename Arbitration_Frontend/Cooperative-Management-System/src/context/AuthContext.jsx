import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = () => {
      const storedUser = sessionStorage.getItem("user");
      const token = sessionStorage.getItem("token");

      if (storedUser && token) {
        try {
          setUser(JSON.parse(storedUser));
          // 🔴 CRITICAL FIX: Restore token to API service on page reload
          api.setToken(token);
        } catch (e) {
          sessionStorage.clear();
          api.clearToken();
        }
      }
      setLoading(false);
    };
    checkSession();
  }, []);

  const login = (userData, token) => {
    // Store in sessionStorage for persistence across page reloads
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", JSON.stringify(userData));

    // 🔴 CRITICAL FIX: Set token in API service for immediate use
    api.setToken(token);

    setUser(userData);
  };

  const logout = () => {
    sessionStorage.clear();

    // 🔴 CRITICAL FIX: Clear token from API service
    api.clearToken();

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
