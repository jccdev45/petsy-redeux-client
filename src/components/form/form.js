import React from "react";
import { Link } from "react-router-dom";
import { FcSignature, FcImport, FcAddressBook, FcKey } from "react-icons/fc";

export default function Form(props) {
  const LABEL_CLASSLIST =
    "w-full md:w-1/4 px-4 py-2 mx-auto border rounded my-3 flex items-center";
  const INPUT_CLASSLIST = "focus:outline-none w-full";
  const EMOJI_CLASSLIST = "mr-2 -ml-2 bg-gray-200 rounded px-1 text-4xl";

  return (
    <form
      onSubmit={props.handleSubmit}
      className="flex flex-col items-center justify-center w-3/4 p-4 mx-auto my-10 rounded shadow-inner md:p-10 md:w-2/3"
    >
      <label htmlFor="username" className={LABEL_CLASSLIST}>
        <FcSignature className={EMOJI_CLASSLIST} />
        <input
          type="text"
          name="username"
          value={props.username}
          placeholder="Username"
          onChange={props.handleChange}
          className={INPUT_CLASSLIST}
        />
      </label>
      {props.type === "Register" ? (
        <label htmlFor="email" className={LABEL_CLASSLIST}>
          <FcAddressBook className={EMOJI_CLASSLIST} />
          <input
            type="email"
            name="email"
            value={props.email}
            placeholder="Email"
            onChange={props.handleChange}
            className={INPUT_CLASSLIST}
          />
        </label>
      ) : null}
      <label htmlFor="password" className={LABEL_CLASSLIST}>
        <FcKey className={EMOJI_CLASSLIST} />
        <input
          type="password"
          name="password"
          value={props.password}
          placeholder="Password"
          onChange={props.handleChange}
          className={INPUT_CLASSLIST}
        />
      </label>
      <button className="px-4 py-2 text-white transition-colors duration-200 ease-in-out bg-red-400 rounded focus:outline-none hover:bg-red-500">
        {props.type}
      </button>
      {props.type === "Register" ? (
        <span className="flex flex-col items-center my-4">
          Already have an account? <br />
          <Link
            className="border-b border-red-300 focus:outline-none"
            to="/login"
          >
            Login
          </Link>
        </span>
      ) : (
        <span className="flex flex-col items-center my-4">
          Need an account? <br />
          <Link
            className="border-b border-red-300 focus:outline-none"
            to="/register"
          >
            Register
          </Link>
        </span>
      )}
    </form>
  );
}
