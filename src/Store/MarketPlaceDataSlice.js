import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Define the async thunk for fetching data
export const MarketPlaceData = createAsyncThunk(
  "marketPlace/fetchData", // Action type
  async () => {
    const response = await fetch(
      "http://localhost:8080/api/marketplace/getAllMarketPlace"
    ); // Replace with your actual API endpoint
    const data = await response.json();
    return data; // Return the data from the API
  }
);

// Define the slice
const MarketPlaceDataSlice = createSlice({
  name: "marketPlace",
  initialState: {
    items: [], // Initial state for the data fetched from the API
    loading: false, // Loading state
    error: null, // Error state
  },
  reducers: {
    // Add reducers here if needed for additional synchronous actions
  },
  extraReducers: (builder) => {
    builder
      .addCase(MarketPlaceData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(MarketPlaceData.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // Update the state with the fetched data
      })
      .addCase(MarketPlaceData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Update the state with the error message
      });
  },
});

export default MarketPlaceDataSlice.reducer;