import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = sessionStorage.getItem("token");
  const user = token ? true : false;

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
