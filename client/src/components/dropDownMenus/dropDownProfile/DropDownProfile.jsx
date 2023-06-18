import { Logout, Notifications, Search, Settings } from "@mui/icons-material";
import { AuthContext } from "../../../authContext/AuthContext";
import { logoutCall } from "../../../authContext/apiCalls";
import { useContext } from "react";
import { toast } from "react-toastify";
import "./dropDownProfile.scss";
import { useNavigate } from "react-router-dom";

const DropDownProfile = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutCall(dispatch);
    toast.success("🦄 Logout Successfull!", {
      position: "bottom-right",
      autoClose: 3000,
      closeOnClick: true,
      draggable: true,
      theme: "colored",
    });
    navigate("/register");
  };

  return (
    <div className="dropDownProfile">
      <ul>
        <li>
          <img
            src="https://i.pinimg.com/550x/e3/94/30/e39430434d2b8207188f880ac66c6411.jpg"
            alt="Profile"
            className="profileIcon"
          />
          Profile
        </li>
        <li>
          <Search className="profileIcon" />
          Search
        </li>
        <li>
          <Notifications className="profileIcon" />
          Notifications
        </li>
        <li>
          <Settings className="profileIcon" />
          Settings
        </li>
        <li onClick={handleLogout}>
          <Logout className="profileIcon" />
          Sign out of Netflix
        </li>
      </ul>
    </div>
  );
};

export default DropDownProfile;
