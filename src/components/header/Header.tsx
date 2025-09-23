"use client";

import { useState, useEffect, useRef, FC } from "react";
import { usePathname, useRouter } from "next/navigation";
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
import { selectUser } from "@/redux/auth/selectorsAuth";
import LogoMobile from "@/assets/logo-header-black.svg";
import LogoDesktop from "@/assets/logo-header-white.svg";
import styles from "./Header.module.scss";

const Header: FC = () => {
	const router = useRouter();
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

	const isUnreadMessageInBuyChat = buyChats?.some((chat) => {
		return chat.unreadMessagesCount && chat.unreadMessagesCount !== 0;
	});
	const isUnreadMessageInSellChat = sellChats?.some((chat) => {
		return chat.unreadMessagesCount && chat.unreadMessagesCount !== 0;
	});

	useEffect(() => {
		if (isLoggedIn) {
			refetchBuyChats();
			refetchSellChats();
		}
	}, [isLoggedIn, refetchBuyChats, refetchSellChats]);

	const user = useAppSelector(selectUser);
	const userPictureUrl = user?.userPhotoUrl || "/images/user.png";
	const userName = user?.fullName || "";

	const handleAddAdClick = () => {
    if (!isLoggedIn) {
      console.log('Потрібна аторизація')
      
      setSuccessRegisterModalOpen(true);
    } else {
      router.replace("/adver");
    }
  };


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

				<Link href="/" className={styles.logoMobile}>
					<Image priority src={LogoMobile} alt="Logo" width={103} height={76} />
				</Link>

				<Link href="/" className={styles.logo}>
					<Image priority src={LogoDesktop} alt="Logo" width={103} height={76} />
				</Link>

				{/* {path === "/" ? null : (
          <CommonButton type="submit" title="" className={styles.searchButton}>
            <CommonIcon id="icon-search" width="25" height="25" />
          </CommonButton>
        )} */}

				<div className={styles.addAdvertisingContainer}>
					<CommonButton
						type="button"
						title="Додати оголошення"
						color="yellow"
						className={styles.headerButton}
						onClick={handleAddAdClick}
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
								<CommonIcon id="icon-chat-header" width="24" height="24" />
							</Link>
							{isUnreadMessageInSellChat || isUnreadMessageInBuyChat ? (
								<div className={styles.unreadMessageMarkGreen}></div>
							) : null}
						</div>
						<div onClick={openWindowHandle}>
							<Link
								href="/user/selected-goods"
								onClick={(e) => !isLoggedIn && e.preventDefault()}
								className={styles.linkToUserPage}
							>
								<CommonIcon id="icon-heart-header" width="24" height="24" />
							</Link>
						</div>

						{
							isLoggedIn
								?
								<div ref={dropdownMenuRef} className={styles.iconDropdown}>
									<div className={styles.userInfo} onClick={dropdownMenuHandle}>
										{/* <CommonIcon id="arrow-header" width="17" height="17" /> */}
										<Image
											alt="alt"
											src={`${userPictureUrl}`}
											width={24}
											height={24}
											className={styles.userPicture}
										/>
										<p className={styles.userName}>{userName}</p>
									</div>
									<DropdownMenu
										status={isDropdownMenuVisible}
										changeStatus={dropdownMenuHandle}
										isLoggedIn={isLoggedIn}
									/>
								</div>

								:
								<Link
									href="/login"
									className={styles.linkToUserPage}
								>
									<CommonIcon id="icon-user-header" width="16" height="20" />
									<span className={styles.userLoginText}>Вхід/реєстрація</span>
								</Link>
						}

						{successRegisterModalOpen && (
							<DoLoginModal
								doModalOpen={setSuccessRegisterModalOpen}
								openWindowHandle={openWindowHandle}
							/>
						)}

					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
