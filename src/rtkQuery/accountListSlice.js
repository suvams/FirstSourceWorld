import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const GetAccountListApiCall = createApi({
  reducerPath: "getAccountListApiCall",
  baseQuery: fetchBaseQuery({ baseUrl: "https://firstsourceworld.com/api" }),
  endpoints: (builder) => ({
    getAccountListData: builder.query({
      query: () => ({
        url: "/public/accounts/list",
      }),
    }),
  }),
});
export const { useGetAccountListDataQuery, useLazyGetAccountListDataQuery } =
  GetAccountListApiCall;
