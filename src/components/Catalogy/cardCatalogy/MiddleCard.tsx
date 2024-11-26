import { FC } from "react";
import styles from "./MiddleCard.module.scss";
import MiniCard from "./MinCard";
import Image from "next/image";
import { CommonButton } from "@/components";
import arrowButton from "@/assets/svg/arrowButton.svg";
import heart from "@/assets/svg/heart.svg";
import formatAdvertisementDate from "@/utils/formatAdvertisementDate";
import { middleCardType } from "@/types/middleCardType";
// import { minCardType } from "@/types/minCardType";

type ItemProps = {
	item: middleCardType;
};

export const MiddleCard: FC<ItemProps> = ({ item }: ItemProps) => {
	// console.log(item);

	return (
		<div className={styles.containerMiddleCard}>
			<MiniCard elem={{
				mainPhotoUrl: item.mainPhotoUrl,
				title: item.title,
				productType: item.productType,
				price: item.price,
			}} />

			<p className={styles.description}>{item.description}</p>

			<CommonButton
				type="button"
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
			<CommonButton
				type="button"
			>
				<Image
					className={styles.arrowButton}
					src={arrowButton}
					alt="arrow Button"
					width={58}
					height={58}
				/>
			</CommonButton>

			<p className={styles.dateText}>
				{`${formatAdvertisementDate(item.updateDate)}`}
				<br />
				{`${item.city.cityName}, ${item.city.region.regionName}`}
			</p>
		</div>
	);
};

export default MiddleCard;