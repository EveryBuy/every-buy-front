import { Box } from "@mui/material";
import Image from "next/image";
import style from "./Product.module.scss";

const Product = () => {
  return (
    <Box className={style.blockWrapper}>
      <Image
        alt=""
        src="/images/dress.png"
        width={50}
        height={50}
        className={style.picture}
      />
      <Box className={style.textInfo}>
        <p className={style.name}>Стильна жіноча сукня</p>
        <p className={style.sum}>1250 грн</p>
      </Box>
    </Box>
  );
};

export default Product;
