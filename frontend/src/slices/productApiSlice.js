import { apiSlice } from "./apiSlice.js";

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => ({
        url: "/api/products",
      }),
    }),
  }),
});
export const { useGetProductsQuery } = productApiSlice;
