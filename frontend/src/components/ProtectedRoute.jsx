import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated");
  return !isAuthenticated ? <Navigate to="/account" /> : children;
};

export default ProtectedRoute;
