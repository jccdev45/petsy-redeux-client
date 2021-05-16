import React, { useContext, useEffect, useReducer, createContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
	loginUser,
	registerUser,
	removeToken,
	verifyUser,
	searchUserFields,
} from "../methods";
import { AUTH_ACTIONS, LS_STRINGS } from "../constants";

function loginReducer(state, action) {
	switch (action.type) {
		case AUTH_ACTIONS.INPUT: {
			return {
				...state,
				[action.fieldName]: action.payload,
			};
		}
		case AUTH_ACTIONS.VERIFY_USER: {
			return {
				...state,
				user: action.payload.data,
				isLoggedIn: true,
				// isVerified: true,
			};
		}
		case AUTH_ACTIONS.REQUEST: {
			return {
				...state,
				isLoading: true,
				error: "",
			};
		}
		// what the fuck is this
		case AUTH_ACTIONS.VERIFY_FIELD: {
			const { username, password, confirmPassword, email, userFields } = state;

			if (userFields.length > 0) {
				const found = userFields.find(
					(item) => item.username === username || item.email === email
				);

				if (found) {
					console.log(found);
					return {
						...state,
						error: `${found.username || found.email} in use, choose another`,
						[found.username || found.email]: "",
						isVerified: false,
						isLoading: false,
					};
				}
			}

			if (
				username === "" ||
				password === "" ||
				confirmPassword === "" ||
				email === ""
			) {
				return {
					...state,
					error: "Field(s) cannot be blank",
					isVerified: false,
					isLoading: false,
				};
			}

			if (password !== confirmPassword) {
				return {
					...state,
					error: "Passwords do not match",
					password: "",
					confirmPassword: "",
					isVerified: false,
					isLoading: false,
				};
			}

			if (password.length < 6) {
				return {
					...state,
					error: "Password must be longer than 6 characters",
					password: "",
					confirmPassword: "",
					isVerified: false,
					isLoading: false,
				};
			}

			return {
				...state,
				// isVerified: true,
				isLoading: false,
			};
		}
		case AUTH_ACTIONS.SUCCESS: {
			return {
				...state,
				isLoggedIn: true,
				// isVerified: true,
				isLoading: false,
				error: "",
				username: "",
				email: "",
				password: "",
				confirmPassword: "",
				picture: "",
				user: action.payload.data,
				userFields: [],
			};
		}
		case AUTH_ACTIONS.SETUSERFIELDS: {
			return {
				...state,
				userFields: action.payload.fields,
				isLoading: false,
			};
		}
		case AUTH_ACTIONS.ERROR: {
			return {
				...state,
				error: action.payload,
				isLoggedIn: false,
				isLoading: false,
				username: "",
				email: "",
				picture: "",
				password: "",
				confirmPassword: "",
			};
		}
		case AUTH_ACTIONS.LOGOUT: {
			return {
				...state,
				isLoading: false,
				isLoggedIn: false,
				isVerified: false,
				user: {},
			};
		}
		default:
			return state;
	}
}

const initialState = {
	username: "",
	email: "",
	password: "",
	confirmPassword: "",
	picture: "",
	error: "",
	isVerified: false,
	isLoading: false,
	isLoggedIn: false,
	user: {},
	userFields: [],
};

const authContext = createContext();

export function ProviderAuth({ children }) {
	const auth = useProviderAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
	return useContext(authContext);
};

function useProviderAuth() {
	const [state, dispatch] = useReducer(loginReducer, initialState);
	const history = useHistory();

	useEffect(() => {
		const doAVerify = async () => {
			dispatch({ type: AUTH_ACTIONS.REQUEST });

			try {
				const user = await verifyUser();
				if (user) {
					dispatch({
						type: AUTH_ACTIONS.VERIFY_USER,
						payload: { data: user },
					});
				} else {
					dispatch({ type: AUTH_ACTIONS.LOGOUT });
				}
			} catch (error) {
				dispatch({ type: AUTH_ACTIONS.ERROR, payload: error });
			}
		};
		doAVerify();
	}, []);

	const login = async (data) => {
		dispatch({ type: AUTH_ACTIONS.REQUEST });
		dispatch({ type: AUTH_ACTIONS.VERIFY_FIELD });

		try {
			const user = await loginUser(data);
			dispatch({ type: AUTH_ACTIONS.SUCCESS, payload: { data: user } });
			history.push("/");
		} catch (error) {
			dispatch({ type: AUTH_ACTIONS.ERROR, payload: error });
		}
	};

	const register = async (data) => {
		dispatch({ type: AUTH_ACTIONS.REQUEST });
		dispatch({ type: AUTH_ACTIONS.VERIFY_FIELD });
		search([state.username, state.email]);

		try {
			if (state.isVerified) {
				const user = await registerUser(data);
				dispatch({ type: AUTH_ACTIONS.SUCCESS, payload: { data: user } });
				history.push("/");
			}
		} catch (error) {
			dispatch({ type: AUTH_ACTIONS.ERROR, payload: error });
		}
	};

	const logout = () => {
		localStorage.removeItem(LS_STRINGS.LS_TOKEN);
		removeToken();

		dispatch({ type: AUTH_ACTIONS.LOGOUT });

		history.push("/");
	};

	const search = async (field) => {
		const cancelToken = axios.CancelToken.source();
		dispatch({ type: AUTH_ACTIONS.REQUEST, name: "userFields" });

		try {
			const res = await searchUserFields(field);
			dispatch({
				type: AUTH_ACTIONS.SETUSERFIELDS,
				payload: { fields: res },
			});
		} catch (error) {
			if (axios.isCancel(error)) return;
			dispatch({
				type: AUTH_ACTIONS.ERROR,
				name: "userFields",
				payload: { error: error },
			});
		}

		return () => {
			cancelToken.cancel();
		};
	};

	return { state, dispatch, login, register, logout };
}
