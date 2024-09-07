import { LoginPayloadType, RegisterPayloadType } from "@/types";
import apiSlice from "./api";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (payload: LoginPayloadType) => ({
                url: '/auth/login',
                method: 'POST',
                body: payload,
            }),
        }),
        register: builder.mutation({
            query: (payload:RegisterPayloadType) => ({
                url: '/auth/register',
                method: 'POST',
                body: payload,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useLoginMutation, useRegisterMutation } = authApi;
