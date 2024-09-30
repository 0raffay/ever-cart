import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import apiSlice from "@/app/services/api";
import authReducer from "@/app/features/auth/authSlice";
import uiSlice from "@/app/features/ui/uiSlice";
import adminAddProductSlice from "@/app/features/admin/adminAddProductSilce";

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiSlice,
  adminProductSliceState: adminAddProductSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
