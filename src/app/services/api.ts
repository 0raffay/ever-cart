import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { selectToken } from "../features/auth/authSlice";

export const apiSlice = createApi({
<<<<<<< HEAD
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
	endpoints: () => ({}),
=======
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers, { getState }) => {
      const globalState = getState() as RootState;
      if (!globalState) return;
      const token = selectToken(globalState);
      if (token && globalState) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
>>>>>>> 9d5927d5d4bff8515bd369cd51fde448dc0b78eb
});

export default apiSlice;
