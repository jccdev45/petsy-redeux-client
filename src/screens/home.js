import React from "react";
import { Redirect, Route, Switch } from "react-router";
import Items from "../screens/items/items";
import ItemDetails from "../screens/items/itemDetails";
import ItemCreate from "../screens/items/itemCreate";
import Profile from "../screens/user/profile";
import ItemEdit from "../screens/items/itemEdit";
import { ProviderData } from "../util/hooks/useFetchData";

export default function Home() {
  return (
    <ProviderData>
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
    </ProviderData>
    // <SecondaryRoutes
    //   user={user}
    //   items={items}
    //   loading={isLoading}
    //   error={error}
    //   update={updateItem}
    //   addNew={addNewItem}
    //   deletion={deletion}
    // />
  );
}
