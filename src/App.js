import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Layout from "./shared/layout";
import InitialRoutes from "./routes/initialRoutes";
import {
  loginUser,
  registerUser,
  removeToken,
  verifyUser,
} from "./util/auth/auth";

function App() {
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const doAVerify = async () => {
      const user = await verifyUser();
      setUser(user);
    };
    doAVerify();
  }, []);

  const login = async (data) => {
    const user = await loginUser(data);
    setUser(user);
    history.push("/");
  };

  const register = async (data) => {
    const user = await registerUser(data);
    setUser(user);
    history.push("/");
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    removeToken();
    setUser(null);
    history.push("/");
  };

  return (
    <div className="flex flex-col w-screen min-h-screen">
      <Layout user={user} logout={logout}>
        <InitialRoutes
          user={user}
          login={login}
          register={register}
        />
      </Layout>
    </div>
  );
}

export default App;
