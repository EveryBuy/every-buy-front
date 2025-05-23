import axios from "axios";
import setAuthToken from "@/utils/setAuthToken";

type PhoneUserType = {
	data: {
		phone: string;
	}
}

export const GetPhoneUser = async (userId: number): Promise<PhoneUserType | undefined> => {
	const BASE_URL = "https://api-everybuy.onrender.com";
	const persist = localStorage.getItem("persist:root");
	const tokenWithQuotes = persist ? JSON.parse(persist).token : null;
	const token = tokenWithQuotes ? tokenWithQuotes.slice(1, -1) : null;
	setAuthToken(token);
	try {
		if (token) {
			// console.log("token", token);
			const response = await axios.get(`${BASE_URL}/auth/get-phone?userId=${userId}`);
			return response.data;
		} else {
			console.log("not token");
		}
	} catch (error: any) {
		console.error("Error: ", error.status);
	}
};
