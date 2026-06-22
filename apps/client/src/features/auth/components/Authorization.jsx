import { Children } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protect_routes = ({ children }) => {
  const { data,isAuthenticated } = useSelector((state) => state.Auth);

  if (!data || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protect_routes;
