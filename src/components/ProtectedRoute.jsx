import { Navigate, Outlet } from "react-router-dom";
import { decode } from "jwt-decode";

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("adminAuthToken");

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  try {
    const token = decode(isAuthenticated);
    const currentTime = Math.floor(Date.now() / 1000);
    if (token.exp < currentTime) {
      localStorage.removeItem("adminAuthToken");
      return <Navigate to="/admin/login" />;
    }
  } catch (error) {
    return <Navigate to="/admin/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
