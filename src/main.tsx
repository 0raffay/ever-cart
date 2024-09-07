import { createRoot } from "react-dom/client";
import "@/assets/css/style.css";
import { store, persistor } from "@/app/store.ts";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "@/components/ui/toaster";
import { RouterProvider } from "react-router-dom";
import router from "@/routes/router";

createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<PersistGate loading={<div>loading...</div>} persistor={persistor}>
			<RouterProvider router={router} />
			<Toaster />
		</PersistGate>
	</Provider>
);
