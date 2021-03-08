import React from 'react'
import { Switch, Route, BrowserRouter } from "react-router-dom"
import './App.css';
import Login from './screens/Login/login'
import Account from './screens/Account/account'
import PrivateRoute from "./componenets/private-route/privateRoute"
import Home from "./screens/Home/home"

import Layout from "./componenets/Layout/layout"
import AuthContextProvider from "./context/authContext";
import UserContextProvider from "./context/userContext";

function App() {
  return (

      <BrowserRouter>
      <div className="App">
        <AuthContextProvider>
          <UserContextProvider>
            <Switch>
              <Route path="/login" exact component={Login} />
              <PrivateRoute path="/" exact>
                <Layout>
                  <Account />
                </Layout>
              </PrivateRoute>
              <PrivateRoute path="/home" exact>
                <Layout>
                  <Home />
                </Layout>
              </PrivateRoute>
              <PrivateRoute path="/account" exact>
                <Layout>
                  <Account />
                </Layout>
              </PrivateRoute>
            </Switch>
          </UserContextProvider>
        </AuthContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
