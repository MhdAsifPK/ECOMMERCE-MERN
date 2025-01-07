import { apiSlice } from "./apiSlice.js";

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => ({
        url: "/api/products",
      }),
    }),
    getProduct: build.query({
      query: (id) => ({
        url: `/api/products/${id}`,
      }),
    }),
  }),
});
export const { useGetProductsQuery ,useGetProductQuery} = productApiSlice;
