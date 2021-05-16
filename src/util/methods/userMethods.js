import { api } from "../api";
import { LS_STRINGS } from "../constants";

export const loginUser = async (data) => {
	const res = await api.post("/auth/login", { authentication: data });
	localStorage.setItem(LS_STRINGS.LS_TOKEN, res.data.token);
	localStorage.setItem(LS_STRINGS.LS_USER, JSON.stringify(res.data.user));
	api.defaults.headers.common.authorization = `Bearer ${res.data.token}`;
	return res.data.user;
};

export const registerUser = async (data) => {
	const res = await api.post("/users", { user: data });
	localStorage.setItem(LS_STRINGS.LS_TOKEN, res.data.token);
	localStorage.setItem(LS_STRINGS.LS_USER, JSON.stringify(res.data.user));
	api.defaults.headers.common.authorization = `Bearer ${res.data.token}`;
	return res.data.user;
};

export const verifyUser = async () => {
	const token = localStorage.getItem(LS_STRINGS.LS_TOKEN);
	if (token) {
		api.defaults.headers.common.authorization = `Bearer ${token}`;
		const res = await api.get("/auth/verify");
		return res.data;
	}
	return null;
};

export const removeToken = () => {
	api.defaults.headers.common.authorization = null;
	localStorage.removeItem(LS_STRINGS.LS_USER);
};

export const getUserById = async (id) => {
	const res = await api.get(`/users/${id}`);
	return res.data;
};

export const getUserItems = async (id) => {
	const res = await api.get(`/users/${id}/items`);
	return res.data.items;
};

export const searchUserFields = async (searchTerm) => {
	return await searchTerm.map(async (term) => {
		const res = await api.get(`/users/${term}`);
		return res.data;
	});
};
