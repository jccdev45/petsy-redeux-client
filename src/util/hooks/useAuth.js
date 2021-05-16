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
		case AUTH_ACTIONS.REQUEST: {
			return {
				...state,
				isLoading: true,
				error: "",
			};
		}
		case AUTH_ACTIONS.SUCCESS: {
			return {
				...state,
				isLoggedIn: true,
				isVerified: true,
				isLoading: false,
				error: "",
				user: action.payload.data,
			};
		}
		case AUTH_ACTIONS.ERROR: {
			return {
				...state,
				error: action.payload,
				isLoggedIn: false,
				isLoading: false,
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
						type: AUTH_ACTIONS.SUCCESS,
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

	return { state, dispatch, login, register, logout, search };
}
