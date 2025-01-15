import { apiSlice } from "./apiSlice.js";

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => ({
        url: "/api/products",
      }),
      providesTags: ["Product"],
    }),
    getProduct: build.query({
      query: (id) => ({
        url: `/api/products/${id}`,
      }),
      providesTags :["Product"]
    }),
    createProduct: build.mutation({
      query: (product) => ({
        url: "/api/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: build.mutation({
      query: (data) => ({
        url: `/api/products/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],

    }),

    uploadProducImage: build.mutation({
      query: (data) => ({
        url: `/api/uploads`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products","Product"],

    }),
  }),
});
export const { useGetProductsQuery, useGetProductQuery ,useCreateProductMutation,useUpdateProductMutation,useUploadProducImageMutation} = productApiSlice;
