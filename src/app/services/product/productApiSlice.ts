import apiSlice from "../api";

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProductList: builder.query({
      query: () => ({
        method: "GET",
        url: `/products/get`,
      }),
    }),
    getSingleProductDetails: builder.query({
      query: (id) => ({
        url: `/products/get/${id}`,
        method: "GET",
      }),
    }),
    addToCart: builder.mutation({
      query: (payload) => ({
        url: `/cart/add`,
        method: "POST",
        body: payload,
      }),
    }),
    getUserCart: builder.query({
      query: (id) => ({
        url: `/cart/get/${id}`,
        method: "GET",
      }),
      providesTags: ["user-cart"],
    }),
    deleteProductUserCart: builder.mutation({
      query: (payload) => ({
        url: "/cart/delete-single-cart",
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["user-cart"],
    }),
    deleteAllCartItems: builder.mutation({
      query: (payload) => ({
        url: `/cart/delete-all-cart/${payload.user_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user-cart"],
    }),
  }),
});

export const {
  useGetUserProductListQuery,
  useGetSingleProductDetailsQuery,
  useAddToCartMutation,
  useGetUserCartQuery,
  useDeleteProductUserCartMutation,
  useDeleteAllCartItemsMutation,
} = productApiSlice;
export default productApiSlice;
