import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants/api";

export const GetCourseCataloguesApiCall = createApi({
  reducerPath: "getCourseCataloguesApiCall",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCourseCataloguesData: builder.query({
      query: (params) => ({
        url: "/public/course-catalogues?page=1&size=10",
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
        url: "/public/course-catalogues?page=1&size=10",
      }),
    }),
    paginateData: builder.query({
      query: (params) => {
        console.log("params ", params);
        return {
          url: `/public/course-catalogues`,
          params: {
            ...params,
            size: 10,
          },
        };
      },
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
  usePaginateDataQuery,
  useLazyPaginateDataQuery,
} = GetCourseCataloguesApiCall;
