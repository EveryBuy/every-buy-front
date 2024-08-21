// "use client";

// import React, { useState, useEffect } from "react";
// import { fetchCategoryData } from "@/api/fetchCategoryData";
// import CategoryItem from "@/types/categoryItemType";
// import {
//  Error,
//  Loading,
//  SectionContainer,
//  TitleContainer,
//  Title,
//  ButtonsContainer,
//  BuyButton,
//  SellButton,
//  List,
//  ListItem,
//  FoldImg,
//  ListItemWrapper,
//  ListItemImage,
//  ListItemText
// } from './CategoryComponent'

// const Category: React.FC = () => {
//  const [data, setData] = useState<CategoryItem[] | null>(null);
//  const [loading, setLoading] = useState<boolean>(true);
//  const [error, setError] = useState<string | null>(null);

//  useEffect(() => {
//   const fetchData = async () => {
//    try {
//     const result = await fetchCategoryData();
//     setData(result);
//    } catch (error: any) {
//     console.error("Error fetching data:", error);
//     setError(error.message);
//    } finally {
//     setLoading(false);
//    }
//   };

//   fetchData();
//  }, []);

//  if (loading) {
//   return <Loading>Loading...</Loading>;
//  }

//  if (error) {
//   return <Error>Error: {error}</Error>;
//  }

//  return (
//   <section>
//    <SectionContainer>
//     <TitleContainer>
//      <Title />
//      <ButtonsContainer>
//       <BuyButton>Куплю</BuyButton>
//       <SellButton>Продам</SellButton>
//      </ButtonsContainer>
//     </TitleContainer>
//     {
//      data && data.length > 0 ? (
//       <List>
//        {data.map(({ id, nameUkr, photoUrl }) => (
//         <ListItem key={id}>
//          <FoldImg />
//          <ListItemWrapper>
//           <ListItemImage
//            src={photoUrl}
//            alt={nameUkr}
//            width={98}
//            height={98}
//           />
//           <ListItemText>{nameUkr}</ListItemText>
//          </ListItemWrapper>
//         </ListItem>
//        ))}
//       </List>
//      ) : (
//       <p>No data available</p>
//      )
//     }
//    </SectionContainer>
//   </section >
//  );
// };

// export default Category;

"use client";

import { useState, useEffect } from "react";
import { fetchCategoryData } from "@/api/fetchCategoryData";
import Image from "next/image";
import Fold from "@/assets/Svg/fold.svg";
import CategoryItem from "@/types/categoryItemType";
import styles from "./Category.module.scss";

const Category: React.FC = () => {
  const [data, setData] = useState<CategoryItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <section>
      <div className={styles.sectionContainer}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}></h2>
          <div className={styles.buttonsContainer}>
            <div className={styles.buyButton}>Куплю</div>
            <div className={styles.sellButton}>Продам</div>
          </div>
        </div>

        {data && data.length > 0 ? (
          <ul className={styles.list}>
            {data.map(({ id, nameUkr, photoUrl }) => (
              <li className={styles.listItem} key={id}>
                <Image className={styles.foldImg} src={Fold} alt="Fold" />
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
          <p>No data available</p>
        )}
      </div>
    </section>
  );
};

export default Category;
