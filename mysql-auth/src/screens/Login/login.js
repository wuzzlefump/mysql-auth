import React, {useState, useContext} from 'react'
import './style.css'
import * as api from "../../utils/api";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { UserContext } from "../../context/userContext";

const Login = (props)=>{
  //context
  const { setUser } = useContext(UserContext);
  const { setIsAuthenticated, setToken } = useContext(AuthContext);
  const history = useHistory();
  //toggle between signup and login
    const [loginState, setLoginState]=useState(true)
      const toggleLogin = ()=>{
        if(loginState === true){
            setLoginState(false)
        }else{
            setLoginState(true)
        }
    }
    //toggle
    //signup states
    const [signUpEmail, setSignUpEmail]=useState("")
    const [signUpPass, setSignUpPass]=useState("")
    //signup States
    // Login States
    const [loginEmail, setLoginEmail]=useState("")
    const [loginPass, setLoginPass]=useState("")
    // Login States

    //handleLogin
    const handleLogin = (e)=>{
      e.preventDefault()
      let request = {
        email:loginEmail,
        password:loginPass
      }
      console.log(request)

      api
      .post({ route: "/login", body: request })
      .then((res) => {
        console.log(res);
        setUser(res.authUser);
        setToken(res.token);
        setIsAuthenticated(true);
        setLoginEmail("");
        setLoginPass("");

        let redirect = new URLSearchParams(window.location.search).get("to");
        redirect = redirect ? redirect : "/home";

        history.push(redirect);
      })
      .catch((err) => {
        console.log("There was a login error");
        console.log(err);
        setLoginEmail("");
        setLoginPass("");
      });
    }

    
    const handleSignup = (e)=>{
      e.preventDefault()
      let request = {
        email:signUpEmail,
        password:signUpPass
      }
      api.post({route: "/signup", body: request})
      .then((res) =>{
        console.log(res)
      })
      .catch((err) =>{
        console.log("There was a signup error");
        console.log(err);
        
      })
     
      console.log(request)
    }


    return(loginState === true ?
        <div className="loginCard">
        <div className="formHeader">Mongo Auth User Login</div>
        <div className="formContainer">
          <form  className= "form">
            <div className="formField">
              <label htmlFor="email" className="formLabel">
                Email
              </label>
              <input
                type="text"
                name="email"
                placeholder="user@example.com"
                required
                className="formInput"
                value = {loginEmail}
                onChange={(e)=>{setLoginEmail(e.target.value)} }
              />
            </div>
            <div className="formField">
              <label htmlFor="password" className="formLabel">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="enter your password"
                required
                className="formInput"
                value={loginPass}
                onChange={(e)=>{setLoginPass(e.target.value)} }
              />
            </div>
            <div className="loginButtonContainer">
            <button type="submit" className="submitButton" onClick={handleLogin}>
              Sign in
            </button>
            <button type="submit" className="submitButton" onClick={toggleLogin}>
              New User
            </button>
            </div>
          </form>
        </div>
      </div> : 
         <div className="loginCard">
           <div className="formHeader">Mongo Auth User Sign Up</div>
        <div className="formContainer">
          <form  className= "form">
            <div className="formField">
              <label htmlFor="email" className="formLabel">
                Email
              </label>
              <input
                type="text"
                name="email"
                placeholder="user@example.com"
                required
                className="formInput"
                value={signUpEmail}
                onChange={(e)=>{setSignUpEmail(e.target.value)}}
              />
            </div>
            <div className="formField">
              <label htmlFor="password" className="formLabel">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="enter your password"
                required
                className="formInput"
                value={signUpPass}
                onChange={(e)=>{setSignUpPass(e.target.value)}}
              />
            </div>
            <div className="loginButtonContainer">
            <button type="submit" className="submitButton" onClick={handleSignup}>
              Sign up
            </button>
            <button type="submit" className="submitButton" onClick={toggleLogin}>
              Existing User
            </button>
            </div>
          </form>
          </div>
         </div>)
}
export default Login;