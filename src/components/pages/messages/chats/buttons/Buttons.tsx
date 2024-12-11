import { FC } from "react";
import { Box } from "@mui/material";
import { Button } from "@/components";
import style from "./Buttons.module.scss";

interface ButtonsType {
  typeHandle: (buttonId: number) => void;
  styleButton: (buttonId: number) => React.CSSProperties;
  typeButtonBuyStatus?: boolean;
  typeButtonSellStatus?: boolean;
}

const Buttons: FC<ButtonsType> = ({
  typeHandle,
  styleButton,
  typeButtonBuyStatus,
  typeButtonSellStatus,
}) => {
  return (
    <Box className={style.buttonsWrapper}>
      <Button
        text="Куплю"
        onClick={() => typeHandle(1)}
        style={styleButton(1)}
        typeStatus={typeButtonBuyStatus}
      />
      <Button
        text="Продам"
        onClick={() => typeHandle(2)}
        style={styleButton(2)}
        typeStatus={typeButtonSellStatus}
      />
    </Box>
  );
};

export default Buttons;
