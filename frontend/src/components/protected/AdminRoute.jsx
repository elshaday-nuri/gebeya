import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not an admin
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Admin
  return children;
}

export default AdminRoute;