import React from "react";
import { Route, Switch } from "react-router";
import Login from "./screens/auth/login";
import Register from "./screens/auth/register";
import Home from "./screens/home";
import Layout from "./shared/layout";

import { ProviderAuth } from "./util/hooks/useAuth";

function App() {
  return (
    <ProviderAuth>
      <Layout>
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
      </Layout>
    </ProviderAuth>
  );
}

export default App;
