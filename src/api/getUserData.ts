import axios from "axios";
import getTokenLogin from "./getTokenLogin";
import { USER } from "./endpoints";

async function getUserData(auth: { login: string; password: string }) {
  try {
    const token = await getTokenLogin(auth);
    localStorage.setItem("token", token);
    const response = await axios.get(USER, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);

    return response;
  } catch (error) {
    console.log(error);
  }
}

export default getUserData;
