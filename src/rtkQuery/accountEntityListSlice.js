import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const GetAccountEntityListApiCall = createApi({
  reducerPath: "getAccountEntityListApiCall",
  baseQuery: fetchBaseQuery({ baseUrl: "https://firstsourceworld.com/api" }),
  endpoints: (builder) => ({
    getAccountEntityListData: builder.query({
      query: (id) => ({
        url: `/public/accounts/${id}/entities/list`,
      }),
    }),
  }),
});
export const {
  useGetAccountEntityListDataQuery,
  useLazyGetAccountEntityListDataQuery,
} = GetAccountEntityListApiCall;
