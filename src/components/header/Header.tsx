"use client";

import { useState, useEffect, useRef, FC } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/redux/store";
import { selectIsLoggedIn } from "@/redux/auth/selectors";
import {
  useGetBuyChatsQuery,
  useGetSellChatsQuery,
} from "@/redux/messages/chatApi";
import {
  CommonIcon,
  CommonButton,
  DropdownMenu,
  DoLoginModal,
} from "@/components";
import Logo from "@/assets/Svg/logo.svg";
import styles from "./Header.module.scss";

const Header: FC = () => {
  const path = usePathname();
  const [isDropdownMenuVisible, setDropdownMenuVisible] = useState(false);
  const [successRegisterModalOpen, setSuccessRegisterModalOpen] =
    useState(false);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const dropdownMenuHandle = () => {
    setDropdownMenuVisible((prev) => !prev);
  };

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const openWindowHandle = () => {
    !isLoggedIn ? setSuccessRegisterModalOpen((prev) => !prev) : null;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target as Node)
      ) {
        setDropdownMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // for tha chat mark refresh
  const {
    data: buyChats = [],
    // isFetching: isBuyChatsFetching,
    refetch: refetchBuyChats,
  } = useGetBuyChatsQuery(undefined, {
    skip: !isLoggedIn,
  });

  const {
    data: sellChats = [],
    // isFetching: isSellChatsFetching,
    refetch: refetchSellChats,
  } = useGetSellChatsQuery(undefined, {
    skip: !isLoggedIn,
  });
  console.log(buyChats, sellChats);
  const isUnreadMessageInBuyChat = buyChats.some((chat) => {
    return chat.unreadMessagesCount && chat.unreadMessagesCount !== 0;
  });
  const isUnreadMessageInSellChat = sellChats.some((chat) => {
    return chat.unreadMessagesCount && chat.unreadMessagesCount !== 0;
  });

  useEffect(() => {
    if (isLoggedIn) {
      refetchBuyChats();
      refetchSellChats();
    }
  }, [isLoggedIn, refetchBuyChats, refetchSellChats]);

  return (
    <header className={styles.header}>
      <div
        className={
          path === "/"
            ? styles.headerContainer
            : path === "/messages"
            ? `${styles.headerContainer} ${styles.headerMessagePageContainer}`
            : `${styles.headerContainer} ${styles.headerPageContainer}`
        }
      >
        <Link href="/" className={path === "/" ? "" : styles.logo}>
          <Image priority src={Logo} alt="Logo" width={104} height={77} />
        </Link>

        {path === "/" ? null : (
          <CommonButton type="submit" title="" className={styles.searchButton}>
            <CommonIcon id="icon-search" width="25" height="25" />
          </CommonButton>
        )}

        <div className={styles.addAdvertisingContainer}>
          <CommonButton
            type="button"
            title="Додати оголошення"
            color="yellow"
            className={styles.headerButton}
          />
          <div className={styles.iconsWrapper}>
            <div
              onClick={openWindowHandle}
              className={styles.iconMessageWrapper}
            >
              <Link
                href="/messages"
                onClick={(e) => !isLoggedIn && e.preventDefault()}
                className={styles.linkToUserPage}
              >
                <CommonIcon id="icon-chat" width="30" height="30" />
              </Link>
              {isUnreadMessageInSellChat || isUnreadMessageInBuyChat ? (
                <div className={styles.unreadMessageMark}></div>
              ) : null}
            </div>
            <div onClick={openWindowHandle}>
              <Link
                href="/user/selected-goods"
                onClick={(e) => !isLoggedIn && e.preventDefault()}
                className={styles.linkToUserPage}
              >
                <CommonIcon id="icon-heart" width="30" height="30" />
              </Link>
            </div>
            <div onClick={openWindowHandle}>
              <Link
                href="/user"
                onClick={(e) => !isLoggedIn && e.preventDefault()}
                className={styles.linkToUserPage}
              >
                <CommonIcon id="icon-user" width="30" height="30" />
              </Link>
            </div>

            {successRegisterModalOpen && (
              <DoLoginModal
                doModalOpen={setSuccessRegisterModalOpen}
                openWindowHandle={openWindowHandle}
              />
            )}

            <div ref={dropdownMenuRef} className={styles.iconDropdown}>
              <div onClick={dropdownMenuHandle}>
                <CommonIcon id="arrow-header" width="17" height="17" />
              </div>
              <DropdownMenu
                status={isDropdownMenuVisible}
                changeStatus={dropdownMenuHandle}
                isLoggedIn={isLoggedIn}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
