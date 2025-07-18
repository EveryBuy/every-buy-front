import axios from "axios";
import { AUTH_AUTH } from "./endpoints";

async function getTokenLogin(auth: { login: string; password: string }) {
  try {
    const response = await axios.post(AUTH_AUTH, auth);
    const token = response.data.data.token;
    
    return token;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default getTokenLogin;
