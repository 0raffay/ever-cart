import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "@/routes";
import Root from "@/pages/layout/Root";
import Login from "@/pages/auth/Login";
import ProtectedRoute from "@/components/ProtectedRoute";
import Register from "@/pages/auth/Register";
import Home from "@/pages/home/Home";
import AdminLogin from "@/pages/admin/admin-auth/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminAddProduct from "@/pages/admin/AdminAddProduct";
import AdminProductList from "@/pages/admin/AdminProductList";
import AdminOrderList from "@/pages/admin/AdminOrderList";
import About from "@/pages/about/About";
import Contact from "@/pages/contact/Contact";
import NotFound from "@/pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: ROUTES.about,
            element: <About />,
          },
          {
            path: ROUTES.contact,
            element: <Contact />,
          },
        ],
      },
    ],
  },
  {
    path: ROUTES.login,
    element: <Login />,
  },
  {
    path: ROUTES.register,
    element: <Register />,
  },
  {
    path: ROUTES.adminLogin,
    element: <AdminLogin />,
  },
  {
    path: ROUTES.adminDashboard,
    element: <AdminDashboard />,
    children: [
      {
        path: ROUTES.adminAddProduct,
        element: <AdminAddProduct />,
      },
      {
        path: ROUTES.adminProductsList,
        element: <AdminProductList />,
      },
      {
        path: ROUTES.adminOrderList,
        element: <AdminOrderList />,
      },
    ],
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);

export default router;
