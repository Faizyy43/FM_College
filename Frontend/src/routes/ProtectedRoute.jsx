import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role")?.toUpperCase();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    if (role === "STUDENT") {
      return <Navigate to="/" replace />;
    }

    if (role) {
      return <Navigate to={`/dashboard/${role.toLowerCase()}`} replace />;
    }

    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
