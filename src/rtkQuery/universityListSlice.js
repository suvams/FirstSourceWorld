import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants/api";

export const GetUniversityListApiCall = createApi({
  reducerPath: "getUniversityListApiCall",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getUniversityListData: builder.query({
      query: (locationId) => ({
        url: `/public/locations/${locationId}/universities/list`,
      }),
    }),
  }),
});
export const { useLazyGetUniversityListDataQuery } = GetUniversityListApiCall;
