import React from "react";
import { Redirect, Route, Switch } from "react-router";
import Items from "../screens/items/items";
import ItemDetails from "../screens/items/itemDetails";
import ItemCreate from "../screens/items/itemCreate";
import Profile from "../screens/user/profile";
import ItemEdit from "../screens/items/itemEdit";

const SecondaryRoutes = () => {
  return (
    <Switch>
      <Route path="/items/new">
        <ItemCreate />
      </Route>
      <Route path="/items/:id/edit">
        <ItemEdit />
      </Route>
      <Route exact path="/items">
        <Items />
      </Route>
      <Route exact path="/items/:id">
        <ItemDetails />
      </Route>
      <Route path="/users/:id">
        <Profile />
      </Route>
      <Redirect from="/" to="/items" exact />
    </Switch>
  );
};

export default SecondaryRoutes;
