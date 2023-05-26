import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants/api";

export const GetAccountListApiCall = createApi({
  reducerPath: "getAccountListApiCall",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
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
