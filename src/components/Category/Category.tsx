"use client";

import React, { useState, useEffect } from "react";
// import Image from "next/image";
import Fold from "@/assets/Svg/fold.svg";
import { fetchCategoryData } from "@/api/fetchCategoryData";
import CategoryItem from "@/types/categoryItemType";
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
  Loading,
  Error,
} from "./Category.styled";
// import style from "./Category.module.scss";

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
    return <Loading>Loading...</Loading>;
  }

  if (error) {
    return <Error>Error: {error}</Error>;
  }

  return (
    <section>
      <SectionContainer>
        <TitleContainer>
          <Title />
          <ButtonsContainer>
            <BuyButton>Куплю</BuyButton>
            <SellButton>Продам</SellButton>
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
                    style={{ objectFit: "cover" }}
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
