import React,{useState,useContext} from 'react'

import { UserContext } from "../../context/userContext";
import { AuthContext } from "../../context/authContext";
import { useHistory } from "react-router-dom";
import "./style.css"

const Account = (props)=>{
    const { user, setUser } = useContext(UserContext);
    const { setIsAuthenticated, setToken } = useContext(AuthContext);

    const history = useHistory();

    const handleLogout = () => {
        setUser({});
        setToken("");
        setIsAuthenticated(false);
        history.push("/login");
      };

    return(<div className="accountCard">
        <h1>Welcome {user.email}</h1>
        <button className="logoutButton" onClick={handleLogout}>
        Log Out
      </button>
        </div>)
}
export default Account;