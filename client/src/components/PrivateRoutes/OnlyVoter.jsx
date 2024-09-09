import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  return currentUser && !isAdmin ? <Outlet /> : <Navigate to="/login" />;
}
