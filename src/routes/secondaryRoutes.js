import React from "react";
import { Redirect, Route, Switch } from "react-router";
import Items from "../screens/items/items";
import ItemDetails from "../screens/items/itemDetails";
import ItemCreate from "../screens/items/itemCreate";
import Profile from "../screens/user/profile";
import ItemEdit from "../screens/items/itemEdit";

const SecondaryRoutes = ({
  user,
  items,
  error,
  loading,
  update,
  addNew,
  deletion,
}) => {
  return (
    <Switch>
      <Route path="/items/new">
        <ItemCreate addNew={addNew} />
      </Route>
      <Route path="/items/:id/edit">
        <ItemEdit items={items} update={update} />
      </Route>
      <Route exact path="/items">
        <Items
          items={items}
          user={user}
          error={error}
          loading={loading}
          deletion={deletion}
        />
      </Route>
      <Route exact path="/items/:id">
        <ItemDetails user={user} />
      </Route>
      <Route path="/users/:id">
        <Profile user={user} />
      </Route>
      <Redirect from="/" to="/items" exact />
    </Switch>
  );
};

export default SecondaryRoutes;
