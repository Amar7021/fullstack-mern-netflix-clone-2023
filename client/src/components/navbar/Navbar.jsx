import "./navbar.scss";
import {
  Search,
  Notifications,
  ArrowDropDown,
  Logout,
  Settings,
} from "@mui/icons-material";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { logoutCall } from "../../authContext/apiCalls";
import { toast } from "react-toastify";
import DropDownPage from "../dropDownMenus/dropDownPage/DropDownPage";
import DropDownProfile from "../dropDownMenus/dropDownProfile/DropDownProfile";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMenu, SetOpenMenu] = useState(false);
  const [openProfile, SetOpenProfile] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const menuRef = useRef();

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  useEffect(() => {
    const handler = e => {
      if (!menuRef.current.contains(e.target)) {
        SetOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  useEffect(() => {
    const handler = e => {
      if (!menuRef.current.contains(e.target)) {
        SetOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

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
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container" ref={menuRef}>
        <div className="left">
          <Link to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/1200px-Logonetflix.png"
              alt="Netflix logo"
            />
          </Link>
          <div className="mobileDropDown">
            <ArrowDropDown
              className="arrowDropDownLeft"
              onClick={() => SetOpenMenu(prev => !prev)}
            />
          </div>
          <div className={`dropDownMenu ${openMenu ? "visible" : "hidden"}`}>
            {openMenu && <DropDownPage />}
          </div>
          <NavLink to="/" className="link">
            <span>Home</span>
          </NavLink>
          <NavLink to="/series" className="link">
            <span className="navbarmainLinks">TV Shows</span>
          </NavLink>
          <NavLink to="/movies" className="link">
            <span className="navbarmainLinks">Movies</span>
          </NavLink>
          {/* <span>New and Popular</span> */}
          <NavLink to="/mylist" className="link">
            <span className="navbarmainLinks">My List</span>
          </NavLink>
        </div>
        <div className="right">
          <Search className="icon searchIcon" />
          <Notifications className="icon notificationIcon" />
          <img
            src="https://i.pinimg.com/550x/e3/94/30/e39430434d2b8207188f880ac66c6411.jpg"
            alt="Profile"
            onClick={() => SetOpenProfile(prev => !prev)}
          />
          <div
            className={`profileDropDown ${openProfile ? "visible" : "hidden"}`}
          >
            {openProfile && <DropDownProfile />}
          </div>
          <div className="profile">
            <ArrowDropDown className="icon dropdownIcon" />
            <div className="options">
              <span>
                <Settings className="profileIcon" />
                Settings
              </span>
              <span onClick={handleLogout}>
                <Logout className="profileIcon" />
                Sign out of Netflix
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
