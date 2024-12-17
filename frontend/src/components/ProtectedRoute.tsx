import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  console.log(document.cookie.match("/adminToken"));
  return !!localStorage.getItem("adminToken");
};
const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  if (!isAuthenticated()) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
