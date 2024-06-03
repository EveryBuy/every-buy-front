import React from 'react';
import sprite from "../../assets/icons.svg";

interface CommonIconProps {
  id: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
}

const CommonIcon: React.FC<CommonIconProps> = ({ id, className, width, height, style }) => {
  
  return (
    <svg className={className} width={width} height={height} style={style}>
      <use href={`${sprite}#${id}`}></use>
    </svg>
  );
};

export default CommonIcon;
