import axios from "axios";
import { AUTH_REGISTRATION } from "./endpoints";

async function getTokenRegistration(
  email: string,
  phone: string,
  password: string
) {
  try {
    const response = await axios.post(AUTH_REGISTRATION, {
      email: email,
      phone: phone,
      password: password,
    });
    localStorage.setItem("token", response.data.data.token);
    return response.data.data.token;
  } catch (error) {
    console.log(error);
  }
}

export default getTokenRegistration;
