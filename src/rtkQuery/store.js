import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { GetCourseCataloguesApiCall } from "./courseCatalogueSlice";
import { GetCourseCatalogueDetailApiCall } from "./courseCatalogueDetailSlice";
import { GetUniversityListApiCall } from "./universityListSlice";
import { GetGlobalListApiCall } from "./globalListSlice";
import { GetAccountListApiCall } from "./accountListSlice";
import { GetAccountEntityListApiCall } from "./accountEntityListSlice";

const middleware = getDefaultMiddleware().concat(
  GetCourseCataloguesApiCall.middleware,
  GetCourseCatalogueDetailApiCall.middleware,
  GetUniversityListApiCall.middleware,
  GetGlobalListApiCall.middleware,
  GetAccountListApiCall.middleware,
  GetAccountEntityListApiCall.middleware
);

const reducer = {
  [GetCourseCataloguesApiCall.reducerPath]: GetCourseCataloguesApiCall.reducer,
  [GetCourseCatalogueDetailApiCall.reducerPath]:
    GetCourseCatalogueDetailApiCall.reducer,
  [GetUniversityListApiCall.reducerPath]: GetUniversityListApiCall.reducer,
  [GetGlobalListApiCall.reducerPath]: GetGlobalListApiCall.reducer,
  [GetAccountListApiCall.reducerPath]: GetAccountListApiCall.reducer,
  [GetAccountEntityListApiCall.reducerPath]:
    GetAccountEntityListApiCall.reducer,
};

export const store = configureStore({
  reducer,
  middleware,
});

setupListeners(store.dispatch);
