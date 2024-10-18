import axios from "axios";

export const API = axios.create({
  baseURL: "https://api-everybuy.onrender.com",
});

export const setHeaderAuthToken = (token: string | null) => {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearHeaderAuthToken = () => {
  delete API.defaults.headers.common["Authorization"];
};