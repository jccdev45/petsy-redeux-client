import axios from "axios";
let apiURL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://petsy-redeux.herokuapp.com";

export const api = axios.create({
  baseURL: apiURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export const getItems = async () => {
  try {
    const res = await api.get("/items");
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const getItemById = async (id) => {
  try {
    const res = await api.get(`/items/${id}`);
    return res.data;
  } catch (e) {
    throw e;
  }
};
