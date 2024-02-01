import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFileAlt,
  faChartBar,
  faUser,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import "./SideBar.css";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="logo">DyafaToCom</div>
      <nav>
        <NavLink to="/" activeClassName="active">
          <FontAwesomeIcon icon={faHome} /> Accueil
        </NavLink>
        <NavLink to="/page1" activeClassName="active">
          <FontAwesomeIcon icon={faFileAlt} /> Page 1
        </NavLink>
        <NavLink to="/page2" activeClassName="active">
          <FontAwesomeIcon icon={faChartBar} /> Page 2
        </NavLink>
        <NavLink to="/page3" activeClassName="active">
          <FontAwesomeIcon icon={faUser} /> Page 3
        </NavLink>
        <NavLink to="/page4" activeClassName="active">
          <FontAwesomeIcon icon={faCog} /> Page 4
        </NavLink>
      </nav>
    </div>
  );
};

export default SideBar;
