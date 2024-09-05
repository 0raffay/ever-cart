import apiSlice from "./api";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (payload) => ({
                url: '/auth/login',
                method: 'POST',
                body: payload,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useLoginMutation } = authApi;
