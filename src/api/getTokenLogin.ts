import axios from "axios";
import { API } from "@/utils/axios";

async function getTokenLogin(auth: { login: string; password: string }) {
  try {
    const response = await API.post("/auth/auth", auth);
    return response.data.data.token;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default getTokenLogin;