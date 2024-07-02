import { CommonIconProps } from "@/types/commonIconProps";
import { StyledSVG } from "./CommonIcon.styled";

const CommonIcon: React.FC<CommonIconProps> = ({ id, width, height, fill }) => {
  return (
    <StyledSVG width={width} height={height} fill={fill}>
      <use href={`/icons.svg#${id}`} />
    </StyledSVG>
  );
};

export default CommonIcon;
