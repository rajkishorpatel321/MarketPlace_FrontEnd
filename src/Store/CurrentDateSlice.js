import { createSlice } from "@reduxjs/toolkit";

function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const initialState = {
  value: getCurrentDate(),
};

const dateSlice = createSlice({
  name: "dateSlice",
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setDate } = dateSlice.actions;
export default dateSlice.reducer;
