import React, { useContext, useEffect, useReducer, createContext } from "react";
import { useHistory } from "react-router-dom";
import { loginUser, registerUser, removeToken, verifyUser } from "../methods";
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
				isVerified: true,
			};
		}
		case AUTH_ACTIONS.REQUEST: {
			return {
				...state,
				isLoading: true,
			};
		}
		case AUTH_ACTIONS.VERIFY_FIELD: {
			if (
				(state.username === "",
				state.password === "",
				state.confirmPassword === "",
				state.email === "",
				state.picture === "")
			) {
				return {
					...state,
					error: "Field(s) cannot be blank",
					isLoading: false,
				};
			} else if (state.password !== state.confirmPassword) {
				return {
					...state,
					error: "Passwords do not match",
					password: "",
					confirmPassword: "",
					isLoading: false,
				};
			} else if (state.password.length < 6) {
				return {
					...state,
					error: "Password must be longer than 6 characters",
					password: "",
					confirmPassword: "",
					isLoading: false,
				};
			} else {
				return {
					...state,
					isVerified: true,
				};
			}
		}
		case AUTH_ACTIONS.SUCCESS: {
			return {
				...state,
				isLoggedIn: true,
				isVerified: true,
				isLoading: false,
				error: "",
				username: "",
				email: "",
				password: "",
				confirmPassword: "",
				picture: "",
				user: action.payload.data,
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
				user: null,
			};
		}
		default:
			return;
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
	user: null,
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

	return { state, dispatch, login, register, logout };
}
