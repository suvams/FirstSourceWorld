import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const GetCourseCatalogueDetailApiCall = createApi({
  reducerPath: "getCourseCatalogueDetailApiCall",
  baseQuery: fetchBaseQuery({ baseUrl: "https://firstsourceworld.com/api" }),
  endpoints: (builder) => ({
    getCourseCatalogueDetailDataById: builder.query({
      query: (_id) => ({
        url: `/public/course-catalogues/${_id}`,
        method: "get",
      }),
    }),
    postApplyForTheCourse: builder.mutation({
      query: (user) => ({
        url: "/public/course-catalogues/apply",
        method: "POST",
        body: user,
      }),
    }),
  }),
});
export const {
  useGetCourseCatalogueDetailDataByIdQuery,
  usePostApplyForTheCourseMutation,
} = GetCourseCatalogueDetailApiCall;
