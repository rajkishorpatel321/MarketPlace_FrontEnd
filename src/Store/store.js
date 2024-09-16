// src/app/store.js

import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";
import marketPlaceReducer from "./MarketPlaceDataSlice";
import dateReducer from "./CurrentDateSlice";

const store = configureStore({
  reducer: {
    data: dataReducer, // Add the data slice to the store
    MarketPlace: marketPlaceReducer,
    date: dateReducer,
  },
});

export default store;
