import React, { useContext } from "react";
import { DispatchContext, StateContext } from "../../App.js";

import SignInUpForm from "../../components/form/signInUpForm";
import Loader from "../../components/loader/loader";

export default function Register({ register }) {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const {
    username,
    email,
    password,
    confirmPassword,
    picture,
    error,
    isLoading,
    isVerified,
  } = state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "input", fieldName: name, payload: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    register({ username, email, password });
  };

  return (
    <>
      {error && (
        <h1 className="w-1/3 p-3 mx-auto text-2xl text-center text-white bg-red-500 rounded">
          {error}
        </h1>
      )}
      {isLoading ? (
        <Loader size="xl" />
      ) : (
        <SignInUpForm
          type="Register"
          isLoading={isLoading}
          username={username}
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          isVerified={isVerified}
          picture={picture}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
}
