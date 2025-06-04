import React, { createContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, isAuthenticated: false });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth({ token, isAuthenticated: true });
      // Only navigate to home if user is on landing, login, or signup pages
      if (["/landing", "/login", "/signup", "/"].includes(location.pathname)) {
        navigate("/home");
      }
    }
  }, [location.pathname, navigate]);

  const login = (token) => {
    localStorage.setItem("token", token);
    setAuth({ token, isAuthenticated: true });
    navigate("/home"); // Changed from '/' to '/home'
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ token: null, isAuthenticated: false });
    navigate("/landing");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
