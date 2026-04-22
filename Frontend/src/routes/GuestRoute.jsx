import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role")?.toUpperCase();

  // If logged in → kick out
  if (token) {
    if (role === "STUDENT") {
      return <Navigate to="/" replace />;
    } else {
      return <Navigate to={`/dashboard/${role.toLowerCase()}`} replace />;
    }
  }

  return children;
};

export default GuestRoute;
