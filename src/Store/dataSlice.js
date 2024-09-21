// src/features/dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Create an async thunk for fetching data from the API
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const response = await fetch(
    "https://tpcropprice.as.r.appspot.com/api/crops/getAllCrop"
  ); // Replace with your actual API endpoint
  const data = await response.json();
  return data; // Return the data from the API
});

const dataSlice = createSlice({
  name: "data",
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
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // Update the state with the fetched data
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Update the state with the error message
      });
  },
});

// Export the reducer to include it in the store
export default dataSlice.reducer;
