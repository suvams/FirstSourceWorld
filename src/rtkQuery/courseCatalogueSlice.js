import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const GetCourseCataloguesApiCall = createApi({
  reducerPath: "getCourseCataloguesApiCall",
  baseQuery: fetchBaseQuery({ baseUrl: "https://firstsourceworld.com/api" }),
  endpoints: (builder) => ({
    getCourseCataloguesData: builder.query({
      query: (params) => ({
        url: "/public/course-catalogues?page=1&size=100000000000000000",
        method: "get",
        params,
      }),
    }),
    getCourseCataloguesFeeRangeData: builder.query({
      query: (params) => ({
        url: "/public/course-catalogues",
        params,
      }),
    }),
    getSearchAllFilterData: builder.query({
      query: (params) => ({
        url: "/public/course-catalogues",
        params,
      }),
    }),
    getAllCourseCataloguesData: builder.query({
      query: () => ({
        url: "/public/course-catalogues?page=1&size=100000000",
      }),
    }),
    // addNewPost: builder.mutation({
    //   query: (data) => ({
    //     url: "/public/course-catalogues?page=1&size=10",
    //     method: "post",
    //     // body: JSON.stringify(data),
    //     body: data,
    //   }),
    // }),
    // deletePost: builder.mutation({
    //   query: (id) => ({
    //     url: "/public/course-catalogues?page=1&size=10" + "/" + id,
    //     method: "Delete",
    //     // body: JSON.stringify(data),
    //     // body: data,
    //   }),
    // }),
  }),
});
export const {
  useGetCourseCataloguesDataQuery,
  useLazyGetCourseCataloguesDataQuery,
  useGetCourseCataloguesFeeRangeDataQuery,
  useLazyGetCourseCataloguesFeeRangeDataQuery,
  useGetSearchAllFilterDataQuery,
  useLazyGetSearchAllFilterDataQuery,
  useGetAllCourseCataloguesDataQuery,
} = GetCourseCataloguesApiCall;
