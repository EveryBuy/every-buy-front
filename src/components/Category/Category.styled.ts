"use client";

import styled from "@emotion/styled";
import Image from "next/image";

export const SectionContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 40px;
  padding: 154px 60px 0px;
  @media (max-width: 768px) {
    padding: 76px 20px 0px;
  }
`;

export const TitleContainer = styled.div`
  max-width: 1320px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h2`
  color: #000;
  font-size: 36px;
  font-weight: 400;

  @media (min-width: 768px) {
    font-size: 30px;
    &::before {
      content: "Розподіл на категорії";
    }
  }
  @media (max-width: 767px) {
    &::before {
      content: "Категорії";
    }
  }

  @media (max-width: 600px) {
    font-size: 24px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const BuyButton = styled.button`
  padding: 10px 29px;
  /* font-size: 32px; */
  border-radius: 10px;
  border-bottom: 2px solid #000;
  background: var(--button, #e5ff46);
  @media (max-width: 600px) {
    padding: 4px 16px;
  }
  @media (min-width: 768px) {
    font-size: 30px;
  }
`;

export const SellButton = styled.button`
  padding: 10px 13px;
  font-size: 32px;
  @media (max-width: 600px) {
    padding: 4px 11px;
    font-size: 16px;
  }
  @media (min-width: 768px) {
    font-size: 30px;
  }
`;

export const List = styled.ul`
  display: flex;
  /* max-width: 1320px; */
  gap: 19px 31px;
  flex-wrap: wrap;
  justify-content: center;
  @media (max-width: 600px) {
    flex-wrap: nowrap;
    overflow-x: scroll;
    column-gap: 0px;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const ListItem = styled.li`
  position: relative;
  width: 160px;
  height: 185px;
  @media (max-width: 600px) {
    width: 97px;
    height: 103px;
  }
`;

export const FoldImg = styled(Image)`
  position: absolute;
  top: 0px;
  right: -5px;
  z-index: 1;
  @media (max-width: 600px) {
    height: 45px;
    top: 1px;
    right: -20px;
  }
`;

export const ListItemWrapper = styled.div`
  height: 100%;
  background-image: url("./icons/base.svg");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  row-gap: 8px;
  padding: 36px 0px 5px;
  @media (max-width: 600px) {
    width: 93px;
    padding: 23px 0px 5px;
    background-image: url("./icons/MobileBase.svg");
  }
`;

export const ListItemImage = styled(Image)`
  width: 98px;
  height: 98px;
  border-radius: 6px;
  @media (max-width: 600px) {
    width: 59px;
    height: 59px;
  }
`;

export const ListItemText = styled.p`
  width: 100%;
  text-align: center;
  /* font-size: 16px; */
  @media (max-width: 600px) {
    font-size: 10px;
    padding: 0px 5px;
  }
`;

export const Loading = styled("div")`
  width: 100%;
  padding: 160px 0 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    padding: 110px 0 50px;
  }
`;

export const Error = styled("div")`
  width: 100%;
  padding: 160px 0 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    padding: 110px 0 50px;
  }
`;
