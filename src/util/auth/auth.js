import { api } from "../api/apiConfig";

export const loginUser = async (data) => {
  const res = await api.post("/auth/login", { authentication: data });
  localStorage.setItem("authToken", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));
  api.defaults.headers.common.authorization = `Bearer ${res.data.token}`;
  return res.data.user;
};

export const registerUser = async (data) => {
  const res = await api.post("/users", { user: data });
  localStorage.setItem("authToken", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));
  api.defaults.headers.common.authorization = `Bearer ${res.data.token}`;
  return res.data.user;
};

export const verifyUser = async () => {
  const token = localStorage.getItem("authToken");
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`;
    const res = await api.get("/auth/verify");
    return res.data;
  }
  return null;
};

export const removeToken = () => {
  api.defaults.headers.common.authorization = null;
  localStorage.removeItem("user")
};
