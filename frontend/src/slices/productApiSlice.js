import { apiSlice } from "./apiSlice.js";

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => ({
        url: "/api/products",
      }),
      providesTags: ["Products"],
    }),
    // =================================================product by id
    getProduct: build.query({
      query: (id) => ({
        url: `/api/products/${id}`,
      }),
      providesTags: ["Product"],
    }),
    // =================================================
    createProduct: build.mutation({
      query: (product) => ({
        url: "/api/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),
    // =================================================
    updateProduct: build.mutation({
      query: (data) => ({
        url: `/api/products/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products","Product"],
    }),
    // =================================================
    uploadProducImage: build.mutation({
      query: (data) => ({
        url: `/api/uploads`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [ "Product"],
    }),
    // =================================================
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `/api/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products","Product"],
    }),
    // =================================================
    createProductReview: build.mutation({
      query: (data) => ({
        url: `/api/products/${data.id}/review`,
        method: "POST",
        body: data,
        }),
        invalidatesTags: ["Product"],
        }),

  }),
});
export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProducImageMutation,
  useDeleteProductMutation,
  useCreateProductReviewMutation,
} = productApiSlice;
