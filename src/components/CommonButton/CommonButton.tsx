import React, { FC } from "react";
import CommonButtonProps from "@/types/commonButtonProps";
import {
  DefaultCommonButton,
  WhiteCommonButton,
  YellowCommonButton,
} from "./CommonButton.styled";

const CommonButton: FC<CommonButtonProps> = ({ type, title, color, style }) => {
  const chooseButtonColor = () => {
    switch (color) {
      case "white":
        return (
          <WhiteCommonButton type={type} style={style}>
            {title}
          </WhiteCommonButton>
        );
      case "yellow":
        return (
          <YellowCommonButton type={type} style={style}>
            {title}
          </YellowCommonButton>
        );
      case "default":
        return (
          <DefaultCommonButton type={type} style={style}>
            {title}
          </DefaultCommonButton>
        );
      default:
        return null;
    }
  };
  return chooseButtonColor();
};

export default CommonButton;
