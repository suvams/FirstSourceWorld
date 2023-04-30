import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  const res = await fetch(
    "https://firstsourceworld.com/api/global-list?type=Locations&includeChildren=true&status=Active"
  );
  const result = await res.json();
  return result;
});

const Productslice = createSlice({
  name: "products",
  initialState: {
    data: [],
    isLoader: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.isLoader = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoader = false;
      state.data = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoader = false;
      state.isError = true;
    });
  },
});

export default Productslice.reducer;
