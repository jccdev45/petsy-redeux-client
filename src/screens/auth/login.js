import React from "react";

import { SignInUpForm } from "../../components/form";
import { Loader } from "../../components/loader";
import { View } from "../../components/view";
import { AUTH_ACTIONS } from "../../util/constants";
import { useAuth } from "../../util/hooks";

export function Login() {
	const auth = useAuth();
	const { username, password, error, isLoading } = auth.state;

	const handleChange = (e) => {
		const { name, value } = e.target;

		auth.dispatch({
			type: AUTH_ACTIONS.INPUT,
			fieldName: name,
			payload: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		auth.login({ username, password });
	};

	return (
		<View title="Sign In" class="container">
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
		</View>
	);
}
