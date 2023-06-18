import { configureStore } from "@reduxjs/toolkit";
import myListReducer from "../features/myListSlice";
import modalReducer from "../features/modalSlice";

const store = configureStore({
  reducer: {
    myLists: myListReducer,
    modal: modalReducer,
  },
});

export default store;
