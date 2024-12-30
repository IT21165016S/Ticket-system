import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


const ProtectedRoutes = ({ requiredRole }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
