import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants/api";

export const GetGlobalListApiCall = createApi({
  reducerPath: "getGlobalListApiCall",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getGlobalListData: builder.query({
      query: (params) => ({
        url: "/global-list",
        params,
      }),
    }),
  }),
});
export const { useGetGlobalListDataQuery, useLazyGetGlobalListDataQuery } =
  GetGlobalListApiCall;
