import React from "react";
import InitialRoutes from "./routes/initialRoutes";
import Layout from "./shared/layout";

import { ProviderAuth } from "./util/hooks/useAuth";
import { ProviderData } from "./util/hooks/useFetchData";
import { ProviderCart } from "./util/hooks/useCart";

function App() {
  return (
    <ProviderAuth>
      <ProviderData>
        <ProviderCart>
          <Layout>
            <InitialRoutes />
          </Layout>
        </ProviderCart>
      </ProviderData>
    </ProviderAuth>
  );
}

export default App;
