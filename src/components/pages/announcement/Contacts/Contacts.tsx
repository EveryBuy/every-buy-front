"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CommonIcon, CommonButton, DoLoginModal } from "@/components";
import styles from "./Contacts.module.scss";
import { deliveryToString } from "../deliveryToString";
import { useCreateChatMutation } from "@/redux/messages/chatApi";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { setNewChatId } from "@/redux/messages/slice";
import { FavouriteAdvertisement } from '@/redux/advertisement/slice';
import { getAllFavouriteAdvert, addAdvertToFavourite, removeAdvertFromFavourite } from '@/redux/advertisement/operations';
import { selectIsLoggedIn } from "@/redux/auth/selectors";

interface ContactsProps {
	contactsInfo: {
		publicDate: string;
		cost: number;
		delivery: string[];
		title: string;
		phoneNumber?: string;
		section: string;
	};
	advertisementId: number;
}

export default function Contacts({
	contactsInfo,
	advertisementId,
}: ContactsProps) {
	const { publicDate, cost, delivery, title, phoneNumber, section } =
		contactsInfo;

	const [showNumber, setShowNumber] = useState(false);
	const [createChat] = useCreateChatMutation();
	const [chatId, setChatId] = useState<number | null>(null);
	const [heartSelect, setHeartSelect] = useState<boolean>(false);

	const router = useRouter();
	const dispatch = useAppDispatch();

	const sectionLabel =
		section === "SELL" ? "Продаж" : section === "BUY" ? "Купівля" : "Невідомо";


	const [successRegisterModalOpen, setSuccessRegisterModalOpen] = useState(false);
	const isLoggedIn = useAppSelector(selectIsLoggedIn);
	const openWindowHandle = () => {
		!isLoggedIn ? setSuccessRegisterModalOpen((prev) => !prev) : null;
	};

	useEffect(() => {
		if (isLoggedIn) {
			dispatch(getAllFavouriteAdvert({ section }));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [section]);

	const getNewChatIdHandler = async () => {
		if (!isLoggedIn) {
			openWindowHandle();
		} else {
			try {
				if (advertisementId) {
					const response = await createChat({ advId: advertisementId }).unwrap();
					console.log(response);

					const newChatId = response?.id;
					if (newChatId) {
						setChatId(newChatId);
						dispatch(setNewChatId(newChatId));
					}
				}
			} catch (error) {
				console.error(error);
			}
		};
	}

	useEffect(() => {
		if (chatId) {
			router.push(`/messages`);
		}
	}, [chatId, router]);

	const favourites: FavouriteAdvertisement[] = useAppSelector(state => state.advertisement.favouriteAdvertisements);

	useEffect(() => {

		if (isLoggedIn) {
			const favArr: FavouriteAdvertisement[] = favourites.filter(item => item.advertisementId === advertisementId);
			(favArr.length > 0) ? setHeartSelect(true) : setHeartSelect(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [favourites]);

	const showPhoneNumber = (): void => {
		if (!isLoggedIn) {
			openWindowHandle()
		} else {
			setShowNumber(true);
		}
	}

	const fetchDataHeart = async (id: number, isFamouse: boolean) => {
		try {
			if (isFamouse) {
				await dispatch(removeAdvertFromFavourite(id)).unwrap();
			} else {
				await dispatch(addAdvertToFavourite(id)).unwrap();
			}
			setHeartSelect(prev => !prev);
		} catch (error) {
			console.error("Error during fetching:", error);
		}
	};

	const addSelectGood = (id: number): void => {
		// e.preventDefault();
		isLoggedIn ? fetchDataHeart(id, heartSelect) : openWindowHandle();
	}


	return (
		<div className={styles.list}>
			<div className={styles.titleItem}>
				<CommonButton
					type="submit"
					title=""
					className={styles.favoriteBtn}
					onClick={() => addSelectGood(advertisementId)}
				>
					<CommonIcon
						id={heartSelect ? "heart" : "icon-heart"}
						width="36"
						height="36"
						className={styles.favoriteSvg}
					/>
				</CommonButton>
				<div className={styles.publicBox}>
					<p className={styles.public}>Опубліковано {publicDate}</p>
					<p className={styles.public}>{sectionLabel}</p>
				</div>
				<h1 className={styles.title}>{title}</h1>
				<div>
					<p className={styles.changeWidth}>Вартість</p>
					<p className={styles.price}>{cost} грн</p>
				</div>
				<div className={styles.descVersion}>
					<div className={styles.deliveryBox}>
						<p className={styles.deliveryTitle}>Спосіб доставки</p>
						<p className={styles.text}>{deliveryToString(delivery)}</p>
					</div>
					<div className={styles.buttonsItem}>
						<CommonButton
							type="button"
							title=""
							color="transparent"
							className={styles.yellowBorderButton}
							onClick={() => getNewChatIdHandler()}
						>
							Надіслати повідомлення
						</CommonButton>
						{!showNumber && (
							<CommonButton
								type="button"
								color="transparent"
								title=""
								className={styles.yellowBorderButton}
								onClick={() => showPhoneNumber()}
							>
								Показати телефон
							</CommonButton>
						)}
						{showNumber && <p className={styles.phoneNumber}>0976709876</p>}

						{successRegisterModalOpen && (
							<DoLoginModal
								doModalOpen={setSuccessRegisterModalOpen}
								openWindowHandle={openWindowHandle}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
