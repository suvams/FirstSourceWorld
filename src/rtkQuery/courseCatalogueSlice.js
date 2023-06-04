import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants/api";

export const GetCourseCataloguesApiCall = createApi({
  reducerPath: "getCourseCataloguesApiCall",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCourseCataloguesData: builder.query({
      query: (params) => ({
        url: "/public/course-catalogues",
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
        url: "/public/course-catalogues?page=1&size=1000000",
      }),
    }),
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
