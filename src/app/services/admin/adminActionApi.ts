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
      providesTags: ["delete-product"],
    }),
    deleteProductById: builder.mutation({
      query: (id) => ({
        url: `/products/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["delete-product"],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetProductListQuery,
  useDeleteProductByIdMutation,
} = adminActionApi;
