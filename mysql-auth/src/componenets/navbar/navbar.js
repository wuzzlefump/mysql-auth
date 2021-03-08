import React from "react";
import { Link } from "react-router-dom";
import "./style.css"

const Navbar =  ()=> {

    return (
      <nav className="navigationContainer">
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/account">Account</Link>
          </li>
        </ul>
      </nav>
    );

}

export default Navbar;