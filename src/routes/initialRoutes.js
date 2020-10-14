import React from "react";
import { Route, Switch } from "react-router";
import Login from "../screens/auth/login";
import Register from "../screens/auth/register";
import Home from "../screens/home";
import ItemCreate from "../screens/items/itemCreate";
import ItemDetails from "../screens/items/itemDetails";
import Profile from "../screens/user/profile";
import ItemEdit from "../screens/items/itemEdit";
import ItemCategories from "../screens/items/itemCategories";
import Items from "../screens/items/items";

function InitialRoutes() {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/items">
        <Items />
      </Route>
      <Route exact path="/items/new">
        <ItemCreate />
      </Route>
      <Route exact path="/items/:id/edit">
        <ItemEdit />
      </Route>
      <Route exact path="/items/:id">
        <ItemDetails />
      </Route>
      <Route exact path="/items/for/:category">
        <ItemCategories />
      </Route>
      <Route path="/users/:id">
        <Profile />
      </Route>
    </Switch>
  );
}

export default InitialRoutes;
