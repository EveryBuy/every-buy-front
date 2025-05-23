import axios from "axios";

import { persistStore } from "redux-persist";

export const API = axios.create({
  baseURL: "https://api-everybuy.onrender.com",
});

export const setHeaderAuthToken = (token: string | null) => {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearHeaderAuthToken = () => {
  delete API.defaults.headers.common["Authorization"];
};

// export const persistor = persistStore(store);

// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.responce?.status === 401) {
//       console.warn("⛔️ Неавторизований доступ, перенаправлення на /login");

//       clearHeaderAuthToken();
//       // persistor.purge();

//       if (typeof window !== "undefined") {
//         window.location.href = '/login';
//         // useRouter().push("/login"); // якщо через хук
//       }
//     }

//     return Promise.reject(error);

//   }
// )