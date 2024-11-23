import styles from "./MinCard.module.scss";
import Image from "next/image";
import { minCardType } from "@/types/minCardType";
import nohPhotoCard from "@/assets/noPhotoCard.jpg";

export const MinCard = ({ elem }): JSX.Element => {

	const {
		mainPhotoUrl,
		title,
		productType,
		price,
	}: minCardType = elem;
	return (
		// add styles.minCardString for styles.containerMiniCard makes item inline
		<div className={styles.containerMinCard}>
			<div className={styles.imageWrapper}>
				<Image
					layout="fill"
					sizes="(max-width: 768px) 134px, 94px, (max-width: 2600px) 179px, 182px"
					className={styles.image}
					src={mainPhotoUrl || nohPhotoCard}
					alt={title || "img"}
				/>
			</div>
			<div className={styles.WrapperTitleStatePrice}>
				<h5 className={styles.title}>{title}</h5>
				<p className={styles.state}>
					{productType}
				</p>
				<p className={styles.price}>{`${price} грн`}</p>
			</div>
		</div>
	);
};

export default MinCard;
