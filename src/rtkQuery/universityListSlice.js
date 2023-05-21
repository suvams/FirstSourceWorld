import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const GetUniversityListApiCall = createApi({
  reducerPath: "getUniversityListApiCall",
  baseQuery: fetchBaseQuery({ baseUrl: "https://eduxgateway.com/api" }),
  endpoints: (builder) => ({
    getUniversityListData: builder.query({
      query: (locationId) => ({
        url: `/public/locations/${locationId}/universities/list`,
      }),
    }),
  }),
});
export const { useLazyGetUniversityListDataQuery } = GetUniversityListApiCall;
