/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ component: Dashboard, ...rest }) {
  const isAuthenticated = localStorage.getItem("adminAuthToken");

  if (!isAuthenticated) {
    return <Navigate to="admin/login" />;
  }

  try {
    const token = JSON.parse(atob(isAuthenticated.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    if (token.exp < currentTime) {
      return <Navigate to="admin/login" />;
    }
  } catch (error) {
    return <Navigate to="admin/login" />;
  }

  return <Dashboard {...rest} />;
}
