import { FC } from "react";
import styles from "./MiddleCard.module.scss";
import MiniCard from "../MinCard/MinCard";
import Image from "next/image";
import Link from 'next/link';
import { CommonButton } from "@/components";
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

	// const addSelectGood = (e: React.FormEvent<HTMLFormElement>): void => {
	// 	e.preventDefault();
	// 	console.log("select good");
	// }

	const linkHref = `/announcement?id=${item.advertisementId}`;

	const minCardProps: MinCardType = {
		mainPhotoUrl: item.mainPhotoUrl,
		title: item.title,
		productType: item.productType,
		price: item.price,
	};

	return (
		<div className={styles.containerMiddleCard}>
			<MiniCard item={minCardProps} />

			<p className={styles.description}>{item.description}</p>

			<CommonButton
				type="submit"
				title=""
			// onClick={addSelectGood}
			>
				<Image
					className={styles.heart}
					src={heart}
					// src="/images/heartSelect.svg"
					alt="heart"
					width={28}
					height={28}
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

			<p className={styles.dateText}>
				{`${formatAdvertisementDate(item.updateDate)}`}
				<br />
				{`${item.city.cityName}, ${item.city.region.regionName}`}
			</p>
		</div>
	);
};

export default MiddleCard;