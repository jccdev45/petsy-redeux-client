import { api } from "../api/apiConfig";

export const getItems = async () => {
  const res = await api.get("/items");
  return res.data;
};

export const getItemById = async (id) => {
  const res = await api.get(`/items/${id}`);
  return res.data;
};

export const getItemByCategory = async (category) => {
  const res = await api.get(`/items/for/${category}`);
  return res.data;
};

export const editItem = async (id, data) => {
  const res = await api.put(`/items/${id}`, { item: data });
  return res.data;
};

export const addItem = async (data) => {
  const res = await api.post("/items", { item: data });
  return res.data;
};

export const deleteItem = async (id) => {
  const res = await api.delete(`/items/${id}`);
  return res.data;
};
