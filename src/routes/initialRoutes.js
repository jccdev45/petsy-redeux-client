import React from "react";
import { Route, Switch } from "react-router";
import Home from "../screens/home";
import Login from "../screens/auth/login";
import Register from "../screens/auth/register";

const InitialRoutes = ({ login, register, user }) => (
  <Switch>
    <Route path="/login">
      <Login login={login} />
    </Route>
    <Route path="/register">
      <Register register={register} />
    </Route>
    <Route path="/">
      <Home user={user} />
    </Route>
  </Switch>
);

export default InitialRoutes;
