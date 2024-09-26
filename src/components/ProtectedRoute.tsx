import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "@/routes";
import { useAppSelector } from "@/app/hooks";
import { selectIsAuthenticated } from "@/app/features/auth/authSlice";
import Layout from "./Layout";

const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default ProtectedRoute;
