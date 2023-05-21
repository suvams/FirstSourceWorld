import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const GetGlobalListApiCall = createApi({
  reducerPath: "getGlobalListApiCall",
  baseQuery: fetchBaseQuery({ baseUrl: "https://eduxgateway.com/api" }),
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
