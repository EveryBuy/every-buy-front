"use client"

import { FC, useState } from "react";
import styles from "./MiddleCard.module.scss";
import MiniCard from "../MinCard/MinCard";
import Image from "next/image";
import Link from 'next/link';
import { CommonButton, CommonIcon, DoLoginModal } from "@/components";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { setHeaderAuthToken } from "@/utils/axios";
import { selectIsLoggedIn } from "@/redux/auth/selectors";
import { addAdvertToFavourite, removeAdvertFromFavourite } from "@/redux/advertisement/operations";
import arrowButton from "@/assets/Svg/arrowButton.svg";
import heart from "@/assets/Svg/heartDefault.svg";
import formatAdvertisementDate from "@/utils/formatAdvertisementDate";
import { MiddleCardType } from "@/types/middleCardType";
import { MinCardType } from '@/types/minCardType';

type ItemProps = {
	item: MiddleCardType;
	favourite: boolean
};

export const MiddleCard: FC<ItemProps> = ({ item, favourite }: ItemProps) => {
	// console.log(item);

	const [heartSelect, setHeartSelect] = useState<boolean>(favourite);
	const dispatch = useAppDispatch();

	const fetchData = async (id: number, isFamouse: boolean) => {
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

	const [successRegisterModalOpen, setSuccessRegisterModalOpen] = useState(false);
	const isLoggedIn = useAppSelector(selectIsLoggedIn);
	const openWindowHandle = () => {
		!isLoggedIn ? setSuccessRegisterModalOpen((prev) => !prev) : null;
	};

	const addSelectGood = (id: number): void => {  // e: React.FormEvent<HTMLFormElement>
		// e.preventDefault();
		isLoggedIn ? fetchData(id, heartSelect) : openWindowHandle();
	}

	const linkHref = `/announcement?id=${item.advertisementId}`;

	const minCardProps: MinCardType = {
		mainPhotoUrl: item.mainPhotoUrl,
		title: item.title,
		productType: item.productType,
		price: item.price,
	};

	const shortStr = (str: string): string => {
		if (str.length < 120) {
			return str;
		} else {
			return str.substring(0, 120) + " ...";
		}
	}



	return (
		<div className={styles.containerMiddleCard}>
			<Link href={linkHref}>
				<MiniCard item={minCardProps} />

				<p className={styles.description}>{shortStr(item.description)}</p>
			</Link>
			<div className={styles.wrapperButton}>
				<CommonButton
					type="submit"
					title=""
					className={styles.heart}
					onClick={() => addSelectGood(item.advertisementId)}
				>
					<CommonIcon
						id={heartSelect ? "heart" : "icon-heart"}
						className={heartSelect ? styles.icon_heart_select : styles.icon_heart}
						width="36px"
						height="36px"
					/>

				</CommonButton>
				<Link className={styles.link} href={linkHref}>
					<Image
						className={styles.arrowButton}
						src={arrowButton}
						alt="arrow Button"
						width={58}
						height={58}
					/>
				</Link>
			</div>

			{successRegisterModalOpen && (
				<DoLoginModal
					doModalOpen={setSuccessRegisterModalOpen}
					openWindowHandle={openWindowHandle}
				/>
			)}

			<p className={styles.dateText}>
				{`${formatAdvertisementDate(item.updateDate)}`}
				<br />
				{`${item.city.cityName}, ${item.city.region.regionName}`}
			</p>
		</div>
	);
};

export default MiddleCard;