import React from "react";
import { Field, ErrorMessage } from "formik";

const EMOJI_CLASSLIST = "mr-2 -ml-2 bg-gray-200 rounded px-1 text-4xl";
const ERROR_CLASSLIST =
	"absolute font-bold text-red-500 bg-white -bottom-3 left-12";

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
			<Component className={EMOJI_CLASSLIST} />
			<Field name={name} className={inputClass} {...rest} />
			<ErrorMessage name={name} component="span" className={ERROR_CLASSLIST} />
		</label>
	);
}
