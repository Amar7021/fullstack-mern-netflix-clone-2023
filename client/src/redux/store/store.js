import { configureStore } from "@reduxjs/toolkit";
import myListReducer from "../features/myListSlice";

const store = configureStore({
  reducer: {
    myLists: myListReducer,
  },
});

export default store;
