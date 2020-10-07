import { api } from "../api/apiConfig";

export const getUserById = async (id) => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};

export const getUserItems = async (id) => {
  const res = await api.get(`/users/${id}/items`);
  return res.data.items;
};
