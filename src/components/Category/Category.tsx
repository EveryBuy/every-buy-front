"use client";

import React, { useState, useEffect } from "react";

interface CategoryItem {
    id: number;
    categoryName: string;
    nameUkr: string;
  }
  
  interface ApiResponse {
    status: number;
    data: CategoryItem[];
  }
  
  const Category: React.FC = () => {
    const [data, setData] = useState<CategoryItem[] | null>(null); // типізуємо стан даних
    const [loading, setLoading] = useState<boolean>(true); // типізуємо стан завантаження
    const [error, setError] = useState<string | null>(null); // типізуємо стан помилки
  
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('/api/ad/category');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const result: ApiResponse = await response.json();
            setData(result.data); 
            console.log(result.data); // Додай вивід даних у консоль
          } catch (error: any) {
            console.error('Error fetching data:', error);
            setError(error.message);
          } finally {
            setLoading(false);
          }
        };
      
        fetchData();
      }, []);
      
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
console.log(data);

    return (
      <div>
        <h1>Category Data</h1>
        {data && data.length > 0 ? (
          <ul>
            {data.map((item) => (
              <li key={item.id}>
                <h2>{item.categoryName}</h2>
                <p>{item.nameUkr}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No data available</p>
        )}
      </div>
    );
  };
  
  export default Category;
  
  