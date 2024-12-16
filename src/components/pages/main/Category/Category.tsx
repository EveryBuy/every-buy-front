"use client";
import { useState, useEffect } from "react";
<<<<<<< HEAD
import { fetchCategoryData } from "@/api/fetchCategoryData";
import { fetchCategoryFilter } from "@/api/fetchCategoryFilter";
import Image from "next/image";
import Fold from "@/assets/Svg/fold.svg";
import CategoryItem from "@/types/categoryItemType";
import FilterItem from "@/types/filterItemType";
import styles from "./Category.module.scss";
// import CommonPreloader from "@/components/ui/CommonPreloader";

const Category: React.FC = () => {
  const [data, setData] = useState<CategoryItem[] | null>(null);
  const [filter, setFilter] = useState<FilterItem[] | null>(null);
=======
import Image from "next/image";
import { CommonPreloader } from "@/components";
import { fetchCategoryData } from "@/api/fetchCategoryData";
// import Fold from "@/assets/Svg/fold.svg";
import CategoryItem from "@/types/categoryItemType";
import styles from "./Category.module.scss";

const Category: React.FC = () => {
  const [data, setData] = useState<CategoryItem[] | null>(null);
>>>>>>> 3c6254c7bbb0f754f23afe00e6624536522817f6
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isListOpen, setListOpen] = useState(false);

<<<<<<< HEAD
  const toggleListOpen = () => setListOpen((prev) => !prev);
=======
  const makeLinkOpen = () => {
    setListOpen((prev) => !prev);
  };
>>>>>>> 3c6254c7bbb0f754f23afe00e6624536522817f6

  useEffect(() => {
    const fetchData = async () => {
      try {
<<<<<<< HEAD
        setLoading(true);
        const [categoryData, categoryFilter] = await Promise.all([
          fetchCategoryData(),
          fetchCategoryFilter(),
        ]);
        setData(categoryData);
        setFilter(categoryFilter);
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setError(error.message || "Failed to fetch data.");
=======
        const result = await fetchCategoryData();
        setData(result);
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setError(error.message);
>>>>>>> 3c6254c7bbb0f754f23afe00e6624536522817f6
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "160px 0 50px" }}>
<<<<<<< HEAD
        {/* <CommonPreloader size={40} sx={{ color: "#e5ff46" }} /> */}
=======
        <CommonPreloader size={40} sx={{ color: "#e5ff46" }} />
>>>>>>> 3c6254c7bbb0f754f23afe00e6624536522817f6
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

<<<<<<< HEAD
  const handleFilterButtonClick = (section: string) => {
    const filteredItems = filter.filter((item) => item.section === section);

    if (filteredItems.length > 0) {
      console.log(`${section} items:`, filteredItems);
    } else {
      console.log(`No items found for section: ${section}`);
    }
  };

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title} />
        <div className={styles.buttonsContainer}>
          <div
            className={styles.buyButton}
            onClick={() => handleFilterButtonClick("BUY")}
          >
            Куплю
          </div>
          <div
            className={styles.sellButton}
            onClick={() => handleFilterButtonClick("SELL")}
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
            <li className={styles.listItem} key={id}>
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
=======
  return (
    <>
      <div className={styles.sectionContainer}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}></h2>
          <div className={styles.buttonsContainer}>
            <div className={styles.buyButton}>Куплю</div>
            <div className={styles.sellButton}>Продам</div>
          </div>
        </div>
        <div className={styles.wrapperHiddenText}>
          <h2 className={styles.hiddenText} onClick={makeLinkOpen}>
            {isListOpen ? "Сховати" : "Дивитись усі"}
          </h2>
        </div>
        {data && data.length > 0 ? (
          <ul className={isListOpen ? styles.listAll : styles.list}>
            {data.map(({ id, nameUkr, photoUrl }) => (
              <li className={styles.listItem} key={id}>
                {/* <Image className={styles.foldImg}  src={Fold} alt="Fold" /> */}
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
    </>
>>>>>>> 3c6254c7bbb0f754f23afe00e6624536522817f6
  );
};

export default Category;
