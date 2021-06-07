import React from "react";
import { Field, ErrorMessage } from "formik";

export function FormField({
  name,
  label,
  labelClass,
  inputClass,
  component: Component,
  ...rest
}) {
  return (
    <label htmlFor={name} className={labelClass}>
      <small className="absolute bg-white -top-2 left-12">{label}</small>
      <Component className="emoji" />
      <Field name={name} className={inputClass} {...rest} />
      <ErrorMessage name={name} component="span" className="error" />
    </label>
  );
}
