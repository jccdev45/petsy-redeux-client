import React, { useContext } from "react";
import SignInUpForm from "../../components/form/signInUpForm";

import { DispatchContext, StateContext } from "../../App.js";
import Loader from "../../components/loader/loader";

export default function Register({ register }) {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const { username, email, password, error, isLoading } = state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "input", fieldName: name, payload: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    register(state);
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
          type="Register"
          username={username}
          email={email}
          password={password}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
}
