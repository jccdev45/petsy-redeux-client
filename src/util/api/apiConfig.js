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
