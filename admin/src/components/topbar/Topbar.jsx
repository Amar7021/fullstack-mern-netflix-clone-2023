import React, { useContext } from "react";
import "./topbar.css";
import { Link, useHistory } from "react-router-dom";
import { NotificationsNone, Language, Settings } from "@mui/icons-material";
import { logoutCall } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";

const Topbar = () => {
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();
  const handleLogout = e => {
    e.preventDefault();
    logoutCall(dispatch);
    history.push("/");
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">
            <Link className="link" to="/">
              Admin
            </Link>
          </span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer" onClick={handleLogout}>
            Logout
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img
            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
