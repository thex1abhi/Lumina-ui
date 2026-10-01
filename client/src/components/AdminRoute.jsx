import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ authChecked, children }) => {
  const { userData } = useSelector((state) => state.user);
console.log(userData);

  // Wait until the current-user request finishes, otherwise
  // admins get redirected before their data has loaded
  if (!authChecked) return null;

  // Not logged in, or not an admin
  if (!userData || userData.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;