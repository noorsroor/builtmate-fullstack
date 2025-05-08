// src/components/ProtectedAdminRoute.jsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedAdminRoute = ({ children }) => {
 const {user }= useSelector((state) => state.auth.user); // assuming you have auth slice

//   if (!user) {
//     // If no user at all, redirect to login
//     return <Navigate to="/login" replace />;
//   }

//   if (user.role !== "admin") {
//     // If user exists but is not admin
//     return <Navigate to="/" replace />;
//   }

  // If admin, allow access
  return children;
};

export default ProtectedAdminRoute;
