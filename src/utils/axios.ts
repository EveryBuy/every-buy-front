import axios from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, {
  retries: 2,
  retryDelay: (retryCount) => retryCount * 1000,
  retryCondition: (error) => error.response?.status === 500,
});
export const BASE_URL = "https://api-everybuy.onrender.com";
export const API = axios.create({
  baseURL: BASE_URL,
});

export const setHeaderAuthToken = (token: string | null) => {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearHeaderAuthToken = () => {
  delete API.defaults.headers.common["Authorization"];
};

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("⛔️ Неавторизований доступ, перенаправлення на /login");

      clearHeaderAuthToken();

      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("force-logout"));
        window.location.href = "/login";
        // useRouter().push("/login"); // якщо через хук
      }
    }

    if (error.response?.status === 403) {
      console.warn("📳 Строк дії токену скінчився, автори зуйтесь заново");

      clearHeaderAuthToken();

      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("force-logout"));
        window.location.href = "/login";
        // useRouter().push("/login"); // якщо через хук
      }
    }

    return Promise.reject(error);
  }
);
