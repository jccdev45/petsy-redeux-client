import React from "react";
import InitialRoutes from "./routes/initialRoutes";
import Layout from "./shared/layout";

import { ProviderAuth } from "./util/hooks/useAuth";
import { ProviderData } from "./util/hooks/useFetchData";

function App() {
  return (
    <ProviderAuth>
      <ProviderData>
        <Layout>
          <InitialRoutes />
        </Layout>
      </ProviderData>
    </ProviderAuth>
  );
}

export default App;
