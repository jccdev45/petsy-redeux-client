import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import LoginImg from "../../assets/img/undraw_secure_login_pdn4.svg";
import { SignInUpForm } from "../../components/form";
import { Hero } from "../../components/hero";
import { Loader } from "../../components/loader";
import { View } from "../../components/view";
import { useAuth } from "../../util/hooks";

const loginSchema = Yup.object().shape({
	username: Yup.string().required("Username is required"),
	password: Yup.string()
		.required("Password is required")
		.min(6, "Password should be at least 6 characters"),
});

export function Login() {
	const auth = useAuth();
	const { isLoading } = auth.state;

	const initialValues = {
		username: "",
		password: "",
	};

	const handleSubmit = async (values) => {
		await auth.login(values);
	};

	return (
		<View class="container">
			<Hero title="Welcome back!" subtitle="Happy to see you!" img={LoginImg} />
			{isLoading ? (
				<Loader size="xl" />
			) : (
				<Formik
					initialValues={initialValues}
					validationSchema={loginSchema}
					onSubmit={(values) => handleSubmit(values)}
				>
					{(formik) => {
						const { errors, touched, isValid, dirty } = formik;
						return (
							<SignInUpForm
								type="Login"
								isLoading={isLoading}
								errors={errors}
								touched={touched}
								isValid={isValid}
								dirty={dirty}
							/>
						);
					}}
				</Formik>
			)}
		</View>
	);
}
