import React from "react";
import SignInUpForm from "../../components/form/signInUpForm";

import Loader from "../../components/loader/loader";
import { DATA_ACTIONS } from "../../util/constants/constants";
import { useAuth } from "../../util/hooks/useAuth";

export default function Login() {
  const auth = useAuth();
  const { username, password, error, isLoading } = auth.state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    auth.dispatch({
      type: DATA_ACTIONS.INPUT,
      fieldName: name,
      payload: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.login({ username, password });
  };

  return (
    <>
      {error && (
        <h1 className="w-1/3 p-3 mx-auto text-2xl text-center text-white bg-red-500 rounded">
          There was an error, please try again.
        </h1>
      )}
      {isLoading ? (
        <Loader size="xl" />
      ) : (
        <SignInUpForm
          type="Login"
          username={username}
          password={password}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
}
