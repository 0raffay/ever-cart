import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "@/routes";
import Root from "@/pages/layout/Root";
import Login from "@/pages/auth/Login";
import ProtectedRoute from "@/components/ProtectedRoute";
import Register from "@/pages/auth/Register";

const router = createBrowserRouter([
	{
		path: ROUTES.base,
		element: (
			<ProtectedRoute>
				<Root />
			</ProtectedRoute>
		),
	},
	{
		path: ROUTES.login,
		element: <Login />,
	},
	{
		path: ROUTES.register,
		element: <Register />,
	},
]);

export default router;
