import { NavLink } from "react-router-dom";
import "./dropDownPage.scss";
import { useState } from "react";

const DropDownPage = () => {
  const [openMenu, SetOpenMenu] = useState(true);

  return (
    <div className="dropDownPage">
      <ul>
        <NavLink to="/" className="link">
          <li onClick={() => SetOpenMenu(!openMenu)}>Home</li>
        </NavLink>
        <NavLink to="/series" className="link">
          <li onClick={() => SetOpenMenu(!openMenu)}>TV Shows</li>
        </NavLink>
        <NavLink to="/movies" className="link">
          <li onClick={() => SetOpenMenu(!openMenu)}>Movies</li>
        </NavLink>
        <NavLink to="/mylist" className="link">
          <li onClick={() => SetOpenMenu(!openMenu)}>My List</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default DropDownPage;
