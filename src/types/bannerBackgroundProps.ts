import { ReactNode } from "react";

export default interface BannerBackgroundProps {
  backgroundImages: {
    mobile1x: string;
    mobile2x: string;
    laptop1x: string;
    laptop2x: string;
  };
  children: ReactNode;
}
