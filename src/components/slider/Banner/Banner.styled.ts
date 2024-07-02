"use client";
import styled from "@emotion/styled";

export const BannerLabelContainer = styled.div`
  position: relative;
  width: 30px;
  height: 20px;
  display: inline-block;

  @media (min-width: 768px) {
    width: 68px;
    height: 44px;
  }
`;

export const BannerLabel = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;

  font-weight: 400;
  font-size: 6px;

  @media (min-width: 768px) {
    font-size: 14px;
  }
`;

export const BannerTitle = styled.h2`
  margin-top: 4px;
  font-weight: 200;
  font-size: 13px;
  color: var(--background);

  @media (min-width: 768px) {
    margin-top: 17px;
    font-weight: 400;
    font-size: 28px;
  }

  @media (min-width: 1440px) {
    font-weight: 400;
    font-size: 40px;
  }
`;

export const BannerAdditionalInfo = styled.p`
  margin-top: 2px;
  font-weight: 400;
  font-size: 6px;
  color: var(--background);

  @media (min-width: 768px) {
    margin-top: 6px;
    font-size: 16px;
  }
`;

export const BannerPrice = styled.p`
  margin-top: 5px;
  font-weight: 400;
  font-size: 10px;
  color: var(--background);

  @media (min-width: 768px) {
    margin-top: 32px;
    font-size: 24px;
  }
`;

export const bannerButtonStyles = {};
