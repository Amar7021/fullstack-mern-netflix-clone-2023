import {
  createUserFailure,
  createUserStart,
  createUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  getUsersFailure,
  getUsersStart,
  getUsersSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "./UserActions";
import axios from "axios";

// Get
export const getUsers = async dispatch => {
  dispatch(getUsersStart());
  try {
    const res = await axios.get("https://netflix-server-9afl.onrender.com/api/users", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailure());
  }
};

// Create
export const createUser = async (user, dispatch) => {
  dispatch(createUserStart());
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/register/",
      user,
      {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      }
    );
    dispatch(createUserSuccess(res.data));
  } catch (err) {
    dispatch(createUserFailure());
  }
};

// Update
export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await axios.put("http://localhost:5000/api/users/" + id, user, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updateUserSuccess(res.data));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};

// Delete
export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    await axios.delete("http://localhost:5000/api/users/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};
