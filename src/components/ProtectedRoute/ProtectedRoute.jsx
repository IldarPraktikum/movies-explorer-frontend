import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, loggedIn, ...rest }) => {
  return loggedIn ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/" replace state={{ from: rest.location }} />
  );
};

export default ProtectedRoute;