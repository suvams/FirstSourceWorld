import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { GetApiCall } from "../rtkQuery/getData";
import ProductReducer from "../rtkQuery/slice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
export const store = configureStore({
  reducer: {
    product: ProductReducer,
    [GetApiCall.reducerPath]: GetApiCall.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(GetApiCall.middleware),
});
setupListeners(store.dispatch);
