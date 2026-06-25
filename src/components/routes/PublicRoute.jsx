import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";

const PublicRoute = ({ children }) => {
  return !isAuthenticated() ? children : <Navigate to="/dashboard" replace />;
};

export default PublicRoute;