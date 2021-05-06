import React from "react";

import RegisterImg from "../../assets/img/undraw_authentication_fsn5.svg";
import { SignInUpForm } from "../../components/form";
import { Hero } from "../../components/hero";
import { Loader } from "../../components/loader";
import { AUTH_ACTIONS } from "../../util/constants";
import { useAuth } from "../../util/hooks";

export function Register() {
	const auth = useAuth();

	const {
		username,
		email,
		password,
		confirmPassword,
		picture,
		error,
		isLoading,
		isVerified,
	} = auth.state;

	const handleChange = (e) => {
		const { name, value } = e.target;
		auth.dispatch({
			type: AUTH_ACTIONS.INPUT,
			fieldName: name,
			payload: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		auth.register({ username, email, password, picture });
	};

	return (
		<>
			<Hero img={RegisterImg} title="Sign up" subtitle="..for a new account" />
			{error && (
				<h1 className="w-1/3 p-3 mx-auto text-2xl text-center text-white bg-red-500 rounded">
					{JSON.stringify(error)}
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
