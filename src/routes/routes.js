import React from "react";
import { Route, Switch } from "react-router";
import Home from "../screens/home";
import ItemDetails from "../components/items/itemDetails";

const Routes = ({ items, error, loading }) => (
  <Switch>
    <Route
      path="/"
      render={(props) => (
        <Home {...props} items={items} loading={loading} error={error} />
      )}
    />
    <Route
      exact
      path="/items/:id"
      render={(props) => <ItemDetails {...props} />}
    />
  </Switch>
);

export default Routes;
