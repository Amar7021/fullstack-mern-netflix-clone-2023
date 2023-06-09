import "./navbar.scss";
import { Search, Notifications, ArrowDropDown } from "@mui/icons-material";
import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { logoutCall } from "../../authContext/apiCalls";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

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
      <div className="container">
        <div className="left">
          <Link to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/1200px-Logonetflix.png"
              alt="Netflix logo"
            />
          </Link>
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
          <Search className="icon" />
          <span>KID</span>
          <Notifications className="icon" />
          <img
            src="https://i.pinimg.com/550x/e3/94/30/e39430434d2b8207188f880ac66c6411.jpg"
            alt="Profile"
          />
          <div className="profile">
            <ArrowDropDown className="icon dropdown" />
            <div className="options">
              <span>Settings</span>
              <span onClick={handleLogout}>Sign out of Netflix</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
