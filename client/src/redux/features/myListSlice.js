import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  movies: localStorage.getItem("movies")
    ? JSON.parse(localStorage.getItem("movies"))
    : [],
};

const myListSlice = createSlice({
  name: "myLists",
  initialState,
  reducers: {
    //Add to My List
    addToMyList: (state, action) => {
      const existsItemIndex = state.movies?.findIndex(
        item => item._id === action.payload._id
      );
      if (existsItemIndex >= 0) {
        toast.error(`"${action.payload.title}" already exists in My List`, {
          position: "bottom-right",
          theme: "colored",
        });
      } else {
        const buildFavItem = { ...action.payload };

        state.movies?.push(buildFavItem);

        toast.success(`"${action.payload.title}" added to My List`, {
          position: "bottom-right",
          theme: "colored",
        });

        localStorage.setItem("movies", JSON.stringify(state.movies));
      }
    },

    removeFromMyList: (state, action) => {
      const filteredItems = state.movies?.filter(
        movie => movie._id !== action.payload._id
      );

      state.movies = filteredItems;

      toast.success(`"${action.payload.title}" removed from My List`, {
        position: "bottom-right",
        theme: "colored",
      });

      localStorage.setItem("movies", JSON.stringify(state.movies));
    },

    // Clear All from My List
    clearAllFromMyList: state => {
      state.movies = [];

      toast.success("My List is cleared", {
        position: "bottom-right",
        theme: "colored",
      });

      localStorage.setItem("movies", JSON.stringify(state.movies));
    },
  },
});

export const { addToMyList, removeFromMyList, clearAllFromMyList } =
  myListSlice.actions;
export default myListSlice.reducer;
