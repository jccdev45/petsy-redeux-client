import React from "react";
import Layout from "./shared/layout";
import useFetchData from "./util/hooks/useFetchData";
import Routes from "./routes/routes";

function App() {
  const { data, loading, error } = useFetchData();

  return (
    <div className="flex flex-col w-screen min-h-screen">
      <Layout>
        <Routes items={data} loading={loading} error={error} />
      </Layout>
    </div>
  );
}

export default App;
