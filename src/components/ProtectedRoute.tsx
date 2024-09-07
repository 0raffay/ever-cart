import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "@/routes";
import { useAppSelector } from "@/app/hooks";
import { selectIsAuthenticated } from "@/app/features/auth/authSlice";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
