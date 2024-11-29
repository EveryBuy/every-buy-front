import styles from "./MinCard.module.scss";
import Image from "next/image";
import { MinCardType } from "@/types/minCardType";
import nohPhotoCard from "@/assets/noPhotoCard.jpg";

type ItemProps = {
	item: MinCardType;
};

export const MinCard = (props: ItemProps): JSX.Element => {

	const {
		mainPhotoUrl,
		title,
		productType,
		price,
	} = props.item;
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
