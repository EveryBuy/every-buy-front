"use client"

import { FC, useState } from "react";
import styles from "./CatalogyCardItem.module.scss";
import Image from "next/image";
import Link from 'next/link';
import { CommonButton, CommonIcon, DoLoginModal } from "@/components";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { setHeaderAuthToken } from "@/utils/axios";
import { selectIsLoggedIn } from "@/redux/auth/selectorsAuth";
import { addAdvertToFavourite, removeAdvertFromFavourite } from "@/redux/advertisement/operations";
import { AdvertisementBuySeller } from '@/redux/advertisement/slice';
import formatAdvertisementDate from "@/utils/formatAdvertisementDate";
import { CatalogyCardItemType } from "@/types/catalogyCardItemType";
import noPhotoCard from "@/assets/noPhotoCard.jpg";

type ItemProps = {
	item: AdvertisementBuySeller | CatalogyCardItemType,
	favourite: boolean,
};

export const CatalogyCardItem: FC<ItemProps> = ({ item, favourite }: ItemProps) => {
	// console.log(item);

	const [isFavourite, setIsFavourite] = useState<boolean>(favourite);
	const dispatch = useAppDispatch();
	const isLoggedIn = useAppSelector(selectIsLoggedIn);

	const fetchData = async (id: number, isFamouse: boolean) => {
		if (isLoggedIn) {
			try {
				if (isFamouse) {
					await dispatch(removeAdvertFromFavourite(id)).unwrap();
				} else {
					await dispatch(addAdvertToFavourite(id)).unwrap();
				}
				setIsFavourite(prev => !prev);
			} catch (error) {
				console.error("Error during fetching:", error);
			}
		}
	};

	const [successRegisterModalOpen, setSuccessRegisterModalOpen] = useState(false);
	const openWindowHandle = () => {
		!isLoggedIn ? setSuccessRegisterModalOpen((prev) => !prev) : null;
	};

	const addSelectGood = (id: number): void => {  // e: React.FormEvent<HTMLFormElement>
		isLoggedIn ? fetchData(id, isFavourite) : openWindowHandle();
	}

	const linkHref = `/announcement?id=${item.advertisementId}`;

	const shortTitle = (str: string, countLetters: number): string => {
		const newStr = (str && str.length < countLetters) ? str : str.slice(0, countLetters) + "...";
		return newStr;
	}


	return (
		<>
			<Link href={`/announcement?id=${item.advertisementId}`}>
				<div className={styles.containerCardItem}>
					<div className={styles.imageWrapper}>
						<Image
							className={styles.image}
							src={item.mainPhotoUrl || noPhotoCard}
							alt={item.title || "img"}
							fill
							sizes="100vh"
							priority
						/>
					</div>
					<div className={styles.stateWrapper}>
						<div className={`${styles.state} ${item.productType === "NEW" ? "" : styles.stateNotNew}`}>
							{item.productType === "NEW" ? "нове" : "вживане"}
						</div>

						<button
							className={styles.favouriteBtn}
							onClick={e => {
								e.preventDefault();
								e.stopPropagation();
								// e.nativeEvent.stopImmediatePropagation();
								addSelectGood(item.advertisementId);
							}
							}
						>
							<CommonIcon
								id={isFavourite ? "heart" : "icon-heart"}
								className={isFavourite ? styles.icon_heart_select : styles.icon_heart}
								width="22px"
								height="22px"
							/>
						</button>
					</div>

					<h3 className={styles.title}>{item?.title && shortTitle(item.title, 35)}</h3>

					<p className={styles.dateText}>
						{`${item.city?.cityName || "Місто не вказано"}, 
						${item.city?.region.regionName || "Область не вказано"
							}`}
						<br />
						{`${item.updateDate && formatAdvertisementDate(item.updateDate)}`}
					</p>
					<p className={styles.price}>{`${item.price} грн`}</p>
				</div>
			</Link>


			{successRegisterModalOpen && (
				<DoLoginModal
					doModalOpen={setSuccessRegisterModalOpen}
					openWindowHandle={openWindowHandle}
				/>
			)}
		</>
	);
};

export default CatalogyCardItem;