"use client";

import { FC, useEffect } from "react";
// import ApiResponse from "@/types/apiResponseType";
import axios from "axios";

const Test: FC = () => {
  // ! REGISTER (POST => token)
  // https://service-authorization-b1jx.onrender.com/auth/registration
  // async function fetchData() {
  //   const requestBody = {
  //     email: "118@gmail.com",
  //     phone: "637777799",
  //     password: "kdf{DT'nR(d!/i8r4)+U>00",
  //   };
  //   const response = await fetch(
  //     "https://api-everybuy.onrender.com/auth/registration",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(requestBody),
  //     }
  //   );
  //   console.log(await response.json());

  //   if (!response.ok) {
  //     throw new Error("Network response was not ok");
  //   }
  //   const result: ApiResponse = await response.json();
  //   return result.data;
  // }
  // fetchData();

  // ! LOG-IN (POST => token + GET)
  // const authBody = {
  //   login: "test@gmail.com",
  //   password: "kdf{DT'nR(d!/i8r4)+U>Wa",
  // };
  // error: {
  //   message: "User with ID: 79 not found";
  // }

  const authBody = {
    login: "118@gmail.com",
    password: "kdf{DT'nR(d!/i8r4)+U>00",
  };

  async function getToken(auth: { login: string; password: string }) {
    try {
      const response = await axios.post(
        "https://api-everybuy.onrender.com/auth/auth",
        auth
      );
      console.log(response.data.data.token);
      return response.data.data.token;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  getToken(authBody);

  async function getData(auth: { login: string; password: string }) {
    try {
      const token = await getToken(auth);
      console.log(token);
      const response = await axios.get(
        // "https://virtserver.swaggerhub.com/OlesiaSmahlii/EveryBuy/1.0/user", // John Doe
        "https://api-everybuy.onrender.com/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      await getData(authBody);
    }

    fetchData();
  }, []);

  return <section>123</section>;
};

export default Test;
