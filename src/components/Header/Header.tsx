import { FC } from "react";
import Image from "next/image";
import { CommonIcon, CommonButton } from "@/components";
import Logo from "@/assets/Svg/logo.svg";
import styles from "./Header.module.scss";


const Header: FC = () => {
  return (
   <header className={styles.headerTag}>
    <div className={styles.headerContainer}>
     <Image priority src={Logo} alt="Logo" width={104} height={77} />
     <div className={styles.addAdvertisingContainer}>
      <CommonButton
       type="button"
       title="Додати оголошення"
       color="yellow"
       className={styles.headerButton}
      />
      <CommonIcon id="icon-chat" width="20" height="20" />
      <CommonIcon id="icon-heart" width="20" height="20" />
      <CommonIcon id="icon-user" width="20" height="20" />
      <CommonIcon id="arrow-header" width="20" height="20" />
     </div>
      </div>
    </header>
  );
};

export default Header;
