import axios from "axios";
import setAuthToken from "@/utils/setAuthToken";
import { BASE_URL } from "@/utils/axios";

type PhoneUserType = {
	data: {
		phone: string;
	}
}

export const GetPhoneUser = async (userId: number): Promise<PhoneUserType | undefined> => {

	let token: string | null = null;

	try {
    const persist = localStorage.getItem("persist:root");
    if (persist) {
      const parsed = JSON.parse(persist);
      const tokenRaw = parsed.token;
      if (tokenRaw) {
        token = JSON.parse(tokenRaw);
      }
    }
  } catch (e) {
    console.warn("Token parse error", e);
  }

  if (!token) {
    console.log("No token");
    return;
  }

  setAuthToken(token);

  try {
    const response = await axios.get(
      `${BASE_URL}/auth/get-phone?userId=${userId}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Request error: ", error.message || error);
  }
};