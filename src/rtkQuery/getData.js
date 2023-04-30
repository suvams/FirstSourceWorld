import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const GetApiCall = createApi({
  reducerPath: "getApiCall",
  baseQuery: fetchBaseQuery({ baseUrl: "https://firstsourceworld.com/api" }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: () => ({
        url: "/public/course-catalogues?page=1&size=50",
        method: "get",
      }),
    }),
    getDataById: builder.query({
      query: (_id) => ({
        url: `/public/course-catalogues/${_id}`,
        // url: 'products/${id}',
        method: "get",
      }),
    }),
    addNewPost: builder.mutation({
      query: (data) => ({
        url: "/public/course-catalogues?page=1&size=10",
        method: "post",
        // body: JSON.stringify(data),
        body: data,
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: "/public/course-catalogues?page=1&size=10" + "/" + id,
        method: "Delete",
        // body: JSON.stringify(data),
        // body: data,
      }),
    }),
  }),
});
export const {
  useGetDataQuery,
  useGetDataByIdQuery,
  useAddNewPostMutation,
  useDeletePostMutation,
} = GetApiCall;
