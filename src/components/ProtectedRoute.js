// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element: Component, auth }) {
  return auth ? Component : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
