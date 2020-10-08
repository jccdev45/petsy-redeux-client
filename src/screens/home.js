import React from "react";
import SecondaryRoutes from "../routes/secondaryRoutes";
import { ProviderData } from "../util/hooks/useFetchData";

export default function Home() {
  return (
    <ProviderData>
      <SecondaryRoutes />
    </ProviderData>
  );
}
