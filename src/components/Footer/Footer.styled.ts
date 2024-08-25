"use client";

import styled from "@emotion/styled";

export const FooterTag = styled.footer`
  display: flex;
  flex-direction: column;
  margin-top: 0px;
  border-top: 5px solid #f5ffb6;

  @media (min-width: 1200px) {
    margin-top: 49px;
  }
`;

export const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 60px;
  flex-wrap: wrap;
  /* margin-top: 49px; */

  @media (max-width: 1000px) {
    gap: 10px;
    padding: 10px 30px;
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  order: 1;
`;

export const NotificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  order: 2;
  gap: 12px;
  @media (max-width: 800px) {
    display: none;
  }
  @media (max-width: 480px) {
    order: 4;
  }
`;

export const EmailContainer = styled.div`
  display: flex;
`;

export const EmailInput = styled.input`
  padding: 10px 152px 10px 10px;
  border-radius: 10px;
  border: 1px solid var(--not-active, #f5ffb6);
  background: var(--background, #fff);

  @media (max-width: 1000px) {
    padding: 0px;
  }
`;

export const EmailButton = styled.button`
  display: flex;
  padding: 10px 40px;
  justify-content: center;
  border-radius: 10px;
  background: var(--not-active, #f5ffb6);
  margin-left: -15px;
`;

export const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  order: 3;
  gap: 16px;

  @media (max-width: 480px) {
    order: 2;
  }
`;

export const SocialMediaContainer = styled.div`
  display: flex;
  flex-direction: column;
  order: 4;
  gap: 16px;

  @media (max-width: 480px) {
    order: 3;
  }
`;

export const MarketPlace = styled.div`
  width: 100%;
  display: flex;
  height: 39px;
  justify-content: center;
  align-items: center;
  background-color: #f5ffb6;

  @media (max-width: 480px) {
    display: none;
  }
`;

export const FooterContainerMobile = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border: 1px solid var(--button, #e5ff46);
  background: #fff;
  padding: 12px 20px;
  margin-top: 30px;
  font-size: var(--f-size-small);

  @media (min-width: 481px) {
    display: none;
  }
`;

export const MobilePaginationItem = styled.li``;

export const MobilePaginationButton = styled.button`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 8px;
`;
