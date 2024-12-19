"use client";
import { useState, useEffect } from "react";
import { fetchCategoryData } from "@/api/fetchCategoryData";
import { useRouter } from "next/navigation";
import CategoryItem from "@/types/categoryItemType";
import Image from "next/image";
import styles from "./Category.module.scss";
import Fold from "@/assets/Svg/fold.svg";
// import CommonPreloader from "@/components/ui/CommonPreloader";

const Category: React.FC = () => {
  const [data, setData] = useState<CategoryItem[] | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isListOpen, setListOpen] = useState(false);

  const router = useRouter();

  const toggleListOpen = () => setListOpen((prev) => !prev);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const categoryData = await fetchCategoryData();
        setData(categoryData);
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setError(error.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "160px 0 50px" }}>
        {/* <CommonPreloader size={40} sx={{ color: "#e5ff46" }} /> */}
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }


  const handleSectionClick = (section: string) => {
    setSelectedSection(section);
  }
  
  const handleCategoryClick = (categoryId: string) => {
    if (selectedSection){
      router.push(`/products?category=${categoryId}&section=${selectedSection}`)
    }
  };

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}></h2>
        <div className={styles.buttonsContainer}>
          <div
            className={`${styles.buyButton} ${
              selectedSection === "BUY" ? styles.activeButton : ""
            }`}
            onClick={() => handleSectionClick("BUY")}
          >
            Куплю
          </div>
          <div
            className={`${styles.sellButton} ${
              selectedSection === "SELL" ? styles.activeButton : ""
            }`}
            onClick={() => handleSectionClick("SELL")}
          >
            Продам
          </div>
        </div>
      </div>
      <div className={styles.wrapperHiddenText}>
        <h2 className={styles.hiddenText} onClick={toggleListOpen}>
          {isListOpen ? "Сховати" : "Дивитись усі"}
        </h2>
      </div>
      {data && data.length > 0 ? (
        <ul className={isListOpen ? styles.listAll : styles.list}>
          {data.map(({ id, nameUkr, photoUrl }) => (
            <li
              className={styles.listItem}
              key={id}
              onClick={() => handleCategoryClick(`${id}`)}
            >
              <div className={styles.listItemWrapper}>
                <Image
                  className={styles.listItemImage}
                  src={photoUrl}
                  alt={nameUkr}
                  width={98}
                  height={98}
                  style={{ objectFit: "cover" }}
                />
                <p className={styles.listItemText}>{nameUkr}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.textAvailable}>No data available</p>
      )}
    </div>
  );
};

export default Category;
