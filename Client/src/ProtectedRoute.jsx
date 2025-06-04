import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  if (!auth.isAuthenticated) {
    return <Navigate to="/landing" />; // Changed from "/login" to "/landing"
  }

  return children;
};

export default ProtectedRoute;
