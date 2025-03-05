"use client"

import { FC, useState } from "react";
import styles from "./MiddleCard.module.scss";
import MiniCard from "../MinCard/MinCard";
import Image from "next/image";
import Link from 'next/link';
import { CommonButton, CommonIcon } from "@/components";
import arrowButton from "@/assets/Svg/arrowButton.svg";
import heart from "@/assets/Svg/heartDefault.svg";
import formatAdvertisementDate from "@/utils/formatAdvertisementDate";
import { MiddleCardType } from "@/types/middleCardType";
import { MinCardType } from '@/types/minCardType';

type ItemProps = {
	item: MiddleCardType;
};

export const MiddleCard: FC<ItemProps> = ({ item }: ItemProps) => {
	// console.log(item);
	const [heartSelect, setHeartSelect] = useState<boolean>(false);

	const addSelectGood = (): void => {  // e: React.FormEvent<HTMLFormElement>
		// e.preventDefault();
		setHeartSelect(prev => !prev);
		console.log("select good");
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
			<MiniCard item={minCardProps} />

			<p className={styles.description}>{shortStr(item.description)}</p>

			<div className={styles.wrapperButton}>
				<CommonButton
					type="submit"
					title=""
					className={styles.heart}
					onClick={addSelectGood}
				>
					<CommonIcon
						id={heartSelect ? "heart" : "icon-heart"}
						className={heartSelect ? styles.icon_heart_select : styles.icon_heart}
						width="28px"
						height="28px"
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

			<p className={styles.dateText}>
				{`${formatAdvertisementDate(item.updateDate)}`}
				<br />
				{`${item.city.cityName}, ${item.city.region.regionName}`}
			</p>
		</div>
	);
};

export default MiddleCard;