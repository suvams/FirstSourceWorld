import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants/api";

export const GetAccountEntityListApiCall = createApi({
  reducerPath: "getAccountEntityListApiCall",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
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
