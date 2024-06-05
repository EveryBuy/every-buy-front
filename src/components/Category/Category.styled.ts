"use client";

import styled from "@emotion/styled";
import Image from "next/image";

export const SectionContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 40px;
  padding: 0 60px;
  @media (max-width: 768px) {
    padding: 0 20px;
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
  font-family: Inter;
  font-size: 36px;
  font-weight: 400;
  @media (max-width: 600px) {
    font-size: 24px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const BuyButton = styled.button`
  padding: 10px 24px;
  border-radius: 10px;
  border-bottom: 2px solid #000;
  background: var(--button, #e5ff46);
  @media (max-width: 600px) {
    padding: 4px 16px;
  }
`;

export const SellButton = styled.button`
  padding: 10px 13px;
  font-size: 32px;
  @media (max-width: 600px) {
    padding: 4px 11px;
    font-size: 16px;
  }
`;

export const List = styled.ul`
  display: flex;
  max-width: 1320px;
  gap: 19px 31px;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-wrap: nowrap;
    overflow-x: scroll;
    gap: 17px;
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
  height: 170px;
  @media (max-width: 600px) {
    width: 95px;
    height: 102px;
  }
`;

export const ListItemWrapper = styled.div`
  height: 100%;
  background-image: url("./base.svg");
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  padding-bottom: 6px;
  @media (max-width: 600px) {
    width: 93px;
    background-image: url("./MobileBase.svg");
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
  font-size: 13px;
  @media (max-width: 600px) {
    font-size: 7px;
  }
`;

export const FoldImg = styled(Image)`
  position: absolute;
  top: -2px;
  right: -5px;
  z-index: 1;
  @media (max-width: 600px) {
    height: 45px;
    top: 1px;
    right: -20px;
  }
`;
