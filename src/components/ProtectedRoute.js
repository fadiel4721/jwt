// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ auth, children}) {
  return auth ? children : <Navigate to="/login"  />;
}

export default ProtectedRoute;

