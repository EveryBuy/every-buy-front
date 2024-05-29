"use client";

import styled from "@emotion/styled";

export const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1440px;
  gap: 161px;
  padding: 12px 0;
  @media (max-width: 1439px) {
    gap: 121px;
    width: 768px;
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

export const Line = styled.div`
  width: 100%;
  height: 5px;
  background-color: #f5ffb6;
  @media (max-width: 767px) {
    display: none;
  }
`;

export const NotificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media (max-width: 1439px) {
    display: none;
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
  gap: 16px;
`;

export const SocialMediaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const MarketPlace = styled.div`
  display: flex;
  width: 1440px;
  height: 59px;
  justify-content: center;
  align-items: center;
  background: var(--not-active, #f5ffb6);
  @media (max-width: 1439px) {
    width: 768px;
    height: 49px;
  }
  @media (max-width: 767px) {
    display: none;
  }
`;

export const FooterContainerMobile = styled.div`
  width: 375px;
  border: 1px solid var(--button, #e5ff46);
  background: #fff;
  padding: 12px 0;
  margin-top: 30px;
  @media (min-width: 768px) {
    display: none;
  }
`;

export const MobilePagination = styled.ul`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const MobilePaginationItem = styled.li``;

export const MobilePaginationButton = styled.button`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 8px;
`;
