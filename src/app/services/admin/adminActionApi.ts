import apiSlice from "../api";

export const adminActionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (payload) => ({
        url: "/products/add",
        method: "POST",
        ["Content-Type"]: "multipart/form-data",
        body: payload,
      }),
    }),
    getProductList: builder.query({
      query: () => ({
        url: "/products/get",
        method: "GET",
      }),
    }),
  }),
});

export const { useAddProductMutation, useGetProductListQuery } = adminActionApi;
