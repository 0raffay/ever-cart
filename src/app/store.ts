import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import apiSlice from './services/api';
import authReducer from './features/auth/authSlice'; // Example slice to persist

// Combine all your slice reducers into a single root reducer
const rootReducer = combineReducers({
  auth: authReducer, // Add your slice reducers here
  [apiSlice.reducerPath]: apiSlice.reducer,
});

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Only persist the auth slice; adjust based on your needs
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create and export your store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
