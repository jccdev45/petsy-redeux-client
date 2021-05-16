import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import RegisterImg from "../../assets/img/undraw_authentication_fsn5.svg";
import { SignInUpForm } from "../../components/form";
import { Hero } from "../../components/hero";
import { Loader } from "../../components/loader";
import { useAuth } from "../../util/hooks";
import { View } from "../../components/view";

const signUpSchema = Yup.object().shape({
	username: Yup.string()
		.required("Username is required")
		.min(3, "Username must be at least 3 characters"),
	email: Yup.string().email().required("Email is required"),
	password: Yup.string()
		.required("Password is required")
		.min(6, "Password should be at least 6 characters"),
	confirmPassword: Yup.string()
		.required("Please confirm your password")
		.when("password", {
			is: (password) => (password && password.length > 0 ? true : false),
			then: Yup.string().oneOf([Yup.ref("password")], "Password doesn't match"),
		}),
	picture: Yup.string().url(),
});

export function Register() {
	const auth = useAuth();

	const { isLoading, isVerified } = auth.state;

	const initialValues = {
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
		picture: "",
	};

	const handleSubmit = async (values) => {
		await auth.register(values);
	};

	return (
		<View class="container">
			<Hero img={RegisterImg} title="Sign up" subtitle="..for a new account" />
			{isLoading && <Loader size="xl" />}
			<Formik
				initialValues={initialValues}
				validationSchema={signUpSchema}
				onSubmit={(values) => handleSubmit(values)}
			>
				{(formik) => {
					const { errors, touched, isValid, dirty } = formik;
					return (
						<SignInUpForm
							type="Register"
							isLoading={isLoading}
							errors={errors}
							touched={touched}
							isValid={isValid}
							dirty={dirty}
							isVerified={isVerified}
						/>
					);
				}}
			</Formik>
		</View>
	);
}
