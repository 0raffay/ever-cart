import apiSlice from "../api";

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProductList: builder.query({
      query: () => ({
        method: "GET",
        url: `/products/get`,
      }),
    }),
  }),
});

export const { useGetUserProductListQuery } = productApiSlice;
export default productApiSlice;
