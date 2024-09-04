import { FC } from "react";
import CommonIcon from "@/components/ui/CommonIcon/CommonIcon";
import style from "./Icons.module.scss";

interface IconsType {
  scss?: keyof typeof style;
}

const Icons: FC<IconsType> = ({ scss }) => {
  return (
    <>
      <CommonIcon
        id="icon-heart"
        className={`${style.icon} ${scss ? style[scss] : ""}`}
      />
      <CommonIcon
        id="folder"
        className={`${style.icon} ${scss ? style[scss] : ""}`}
      />
    </>
  );
};

export default Icons;
