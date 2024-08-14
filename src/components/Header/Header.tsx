import { FC } from "react";
import Image from "next/image";
import { CommonIcon, CommonButton } from "@/components";
import { headerItems } from "@/mock-data/headerItems";
import Logo from "@/assets/Svg/logo.svg";
import {
  HeaderContainer,
  HeaderTag,
  NavBar,
  List,
  AddAdvertisingContainer,
  RegisterContainer,
} from "./Header.styled";
import styles from "./Header.module.scss";
import Link from "next/link";

const Header: FC = () => {
  return (
    <HeaderTag>
      <NavBar>
        <List>
          {headerItems.map(({ text }) => (
            <li key={text}>
              <a href="">{text}</a>
            </li>
          ))}
        </List>
      </NavBar>
      <HeaderContainer>
        <Image priority src={Logo} alt="Logo" width={104} height={77} />
        <AddAdvertisingContainer>
          <CommonButton
            type="button"
            title="Додати оголошення"
            color="light-yellow"
            className={styles.headerButton}
          />
          <CommonIcon id="icon-heart" width="20" height="20" />
          <RegisterContainer>
            <Link href="/login">
              <CommonIcon id="icon-user" width="20" height="20" />
              <button>Вхід|Реєстрація</button>
            </Link>
          </RegisterContainer>
        </AddAdvertisingContainer>
      </HeaderContainer>
    </HeaderTag>
  );
};

export default Header;
