import React from "react";
import { Link } from "react-router-dom";
import { Form } from "formik";
import { Button } from "../button";
import { FormField } from "./FormField";
import {
  FcSignature,
  FcAddressBook,
  FcKey,
  FcPicture,
  FcLock,
} from "react-icons/fc";

const fields = [
  {
    id: 1,
    name: "username",
    label: "Username",
    placeholder: "coolguy69420",
    type: "text",
    component: FcSignature,
  },
  {
    id: 2,
    name: "password",
    label: "Password",
    placeholder: "passwordistaco",
    type: "password",
    component: FcKey,
  },
  // {
  // 	id: 3,
  // 	name: "confirmPassword",
  // 	label: "Confirm Password",
  // 	placeholder: "passwordistaco",
  // 	type: "password",
  // 	component: FcLock,
  // },
  // {
  // 	id: 4,
  // 	name: "email",
  // 	label: "Email",
  // 	placeholder: "coolguy@69420.com",
  // 	type: "email",
  // 	component: FcAddressBook,
  // },
  // {
  // 	id: 5,
  // 	name: "picture",
  // 	label: "Picture",
  // 	placeholder: "http://loremflickr.com/500/500/user",
  // 	type: "text",
  // 	component: FcPicture,
  // },
];

export function SignInUpForm(props) {
  function renderFields() {
    return fields.map((field) => (
      <FormField
        key={field.id}
        name={field.name}
        label={field.label}
        placeholder={field.placeholder}
        type={field.type}
        component={field.component}
        inputClass="auth-form-input"
        labelClass={`${
          props.errors[field.name] && props.touched[field.name]
            ? `border border-red-500`
            : ""
        } auth-form-label`}
      />
    ));
  }

  return (
    <Form className="flex flex-col items-center justify-center w-11/12 p-4 mx-auto my-10 rounded shadow-lg md:p-10 md:w-3/4 lg:w-2/3">
      {renderFields()}
      {props.type === "Register" ? (
        <>
          <FormField
            name="confirmPassword"
            label="Confirm Password"
            placeholder="passwordistaco"
            type="password"
            component={FcLock}
            inputClass="auth-form-input"
            labelClass={`${
              props.errors.confirmPassword && props.touched.confirmPassword
                ? `border border-red-500`
                : null
            } auth-form-label`}
          />
          <FormField
            name="email"
            label="Email"
            placeholder="coolguy@69420.com"
            type="email"
            component={FcAddressBook}
            inputClass="auth-form-input"
            labelClass={`${
              props.errors.email && props.touched.email
                ? `border border-red-500`
                : null
            } auth-form-label`}
          />
          <FormField
            name="picture"
            label="Picture"
            placeholder="http://loremflickr.com/500/500/user"
            type="text"
            component={FcPicture}
            inputClass="auth-form-input"
            labelClass={`${
              props.errors.picture && props.touched.picture
                ? `border border-red-500`
                : null
            } auth-form-label`}
          />
        </>
      ) : null}
      <Button
        disabled={!(props.dirty && props.isValid)}
        extraClass="px-4 py-2 bg-primary-light hover:bg-secondary-light transition-colors duration-200 ease-in-out"
      >
        {props.type}
      </Button>
      {props.type === "Register" ? (
        <span className="flex flex-col items-center my-4">
          Already have an account? <br />
          <Link className="text-primary-dark hover:underline" to="/login">
            Login
          </Link>
        </span>
      ) : (
        <span className="flex flex-col items-center my-4">
          Need an account? <br />
          <Link className="text-primary-dark hover:underline" to="/register">
            Register
          </Link>
        </span>
      )}
    </Form>
  );
}
