import { toast } from "react-toastify";
import axios from "../api/axios";
import { loginFailure, loginStart, loginSuccess, logout } from "./AuthActions";

export const loginCall = async (user, dispatch) => {
  dispatch(loginStart());
  console.log(user);
  try {
    const res = await axios.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    toast.success("🦄 Login Successfull!", {
      position: "bottom-right",
      autoClose: 3000,
      closeOnClick: true,
      draggable: true,
      theme: "colored",
    });
  } catch (err) {
    toast.error("Email or Password is wrong!", {
      position: "bottom-right",
      autoClose: 3000,
      closeOnClick: true,
      draggable: true,
      theme: "colored",
    });
    dispatch(loginFailure());
  }
};

export const logoutCall = dispatch => {
  dispatch(logout());
};
