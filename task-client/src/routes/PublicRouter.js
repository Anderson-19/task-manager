import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children }) => {
  const user = localStorage.getItem('user');

  return JSON.parse(user).logged
        ? <Navigate to="/dashboard" />
        : children

}