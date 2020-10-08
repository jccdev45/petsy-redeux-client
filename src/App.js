import React from "react";
import InitialRoutes from "./routes/initialRoutes";
import Layout from "./shared/layout";

import { ProviderAuth } from "./util/hooks/useAuth";

function App() {
  return (
    <ProviderAuth>
      <Layout>
        <InitialRoutes />
      </Layout>
    </ProviderAuth>
  );
}

export default App;
