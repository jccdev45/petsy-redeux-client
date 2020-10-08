import React from "react";
import { Route, Switch } from "react-router";
import Login from "../screens/auth/login";
import Register from "../screens/auth/register";
import Home from "../screens/home";

function InitialRoutes() {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
}

export default InitialRoutes;
