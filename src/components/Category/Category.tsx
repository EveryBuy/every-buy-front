"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image"; // Import Image from next/image
import Fold from "../../assets/Svg/fold.svg";
import PC from "../../assets/pc.png";
import {
  SectionContainer,
  TitleContainer,
  Title,
  ButtonsContainer,
  BuyButton,
  SellButton,
  List,
  ListItem,
  ListItemWrapper,
  ListItemText,
  ListItemImage,
  FoldImg,
} from "./Category.styled";
import CategoryItem from "@/types/categoryItemType";
import ApiResponse from "@/types/apiResponseType";
import CommonButton from "../CommonButton/CommonButton";
import styles from "./Category.module.scss";

const Category: React.FC = () => {
  const [data, setData] = useState<CategoryItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/ad/category");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result: ApiResponse = await response.json();
        setData(result.data);
        console.log(result.data);
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section>
      <SectionContainer>
        <TitleContainer>
          <Title>
            {windowWidth >= 768 ? "Розподіл на категорії" : "Категорії"}
          </Title>
          <ButtonsContainer>
            {/* <BuyButton>Куплю</BuyButton>
            <SellButton>Продам</SellButton> */}
            <CommonButton
              type="button"
              title="Куплю"
              color="yellow"
              className={styles.categoryButtonBuy}
            />
            <CommonButton
              type="button"
              title="Продам"
              color="transparent"
              className={styles.categoryButtonSell}
            />
          </ButtonsContainer>
        </TitleContainer>
        {data && data.length > 0 ? (
          <List>
            {data.map(({ id, nameUkr, photoUrl }) => (
              <ListItem key={id}>
                <FoldImg src={Fold} alt="Fold" />
                <ListItemWrapper>
                  <ListItemImage
                    src={photoUrl}
                    alt={nameUkr}
                    width={98}
                    height={98}
                  />
                  <ListItemText>{nameUkr}</ListItemText>
                </ListItemWrapper>
              </ListItem>
            ))}
          </List>
        ) : (
          <p>No data available</p>
        )}
      </SectionContainer>
    </section>
  );
};

export default Category;
