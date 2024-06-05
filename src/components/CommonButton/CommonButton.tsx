import React from "react";
import { DefaultCommonButton, WhiteCommonButton, YellowCommonButton } from "./CommonButton.styled";

interface CommonButtonProps {
  type: 'submit' | 'reset' | 'button';
  title: string;
  color: 'white' | 'yellow' | 'default';
  style?: React.CSSProperties;
}

const CommonButton: React.FC<CommonButtonProps> = ({ type, title, color, style, }) => {
  const chooseButtonColor = () => {
    switch (color) {
      case "white":
        return <WhiteCommonButton type={type} style={style}>{title}</WhiteCommonButton>;
        case "yellow":
          return <YellowCommonButton type={type} style={style}>{title}</YellowCommonButton>;
      case "default":
        return <DefaultCommonButton type={type} style={style}>{title}</DefaultCommonButton>;
      default:
        return null;
    }
      
  }
  return chooseButtonColor();
}

export default CommonButton;
