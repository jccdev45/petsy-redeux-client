import React from "react";
import InitialRoutes from "./routes/initialRoutes";
import { Layout } from "./shared";

import { ProviderAuth, ProviderData, ProviderCart } from "./util/hooks";

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
