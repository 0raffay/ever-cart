import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@/assets/css/style.css";
import { store, persistor } from "@/app/store.ts";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from "@/components/ui/toaster";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={<div>loading...</div>} persistor={persistor}>
      <App />
      <Toaster />
    </PersistGate>
  </Provider>
);
