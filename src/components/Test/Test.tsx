"use client";

import React, { useState, useEffect } from "react";
import { fetchCategoryData } from "../../api/fetchCategoryData";
import CategoryItem from "@/types/categoryItemType";
import ApiResponse from "@/types/apiResponseType";

const Category: React.FC = () => {
  const [data, setData] = useState<CategoryItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // console.log(data);

  const fetchCategoryData = async (): Promise<CategoryItem[]> => {
    // https://service-authorization-b1jx.onrender.com/auth/registration
    // const requestBody = {
    //   email: "test@gmail.com",
    //   phone: "011195833",
    //   password: "kdf{DT'nR(d!/i8r4)+U>Wa",
    // };
    const authBody = {
      login: "test@gmail.com",
      password: "kdf{DT'nR(d!/i8r4)+U>Wa",
    };

    // const response = await fetch("/api/ad/category");
    const response = await fetch(
      "https://service-authorization-b1jx.onrender.com/auth/auth",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authBody),
      }
    );
    console.log(await response.json());

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result: ApiResponse = await response.json();
    return result.data;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchCategoryData();
        setData(result);
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return <section></section>;
};

export default Category;
