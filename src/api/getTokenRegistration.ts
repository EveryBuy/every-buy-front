import { API } from "@/utils/axios";

async function getTokenRegistration(
  email: string,
  phone: string,
  password: string
) {
  try {
    const response = await API.post("/auth/registration", {
      email,
      phone,
      password,
    });

    const token = response.data.data.token;

    localStorage.setItem("token", token);

    return token;
  } catch (error) {
    console.log("Registration error:", error);
    throw error;
  }
}

export default getTokenRegistration;
