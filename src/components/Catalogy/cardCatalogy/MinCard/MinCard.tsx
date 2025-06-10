import styles from "./MinCard.module.scss";
import Image from "next/image";
import { MinCardType } from "@/types/minCardType";
import noPhotoCard from "@/assets/noPhotoCard.jpg";

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

	const shortStr = (str: string): string => {
		if (str.length < 30) {
			return str;
		} else {
			return str.substring(0, 30) + " ...";
		}
	}

	return (
		// add styles.minCardString for styles.containerMiniCard makes item inline
		<div className={styles.containerMinCard}>
			<div className={styles.imageWrapper}>
				<Image
					fill
					sizes="100vh"
					className={styles.image}
					src={mainPhotoUrl || noPhotoCard}
					alt={title || "img"}
					priority
				/>
			</div>
			<div className={styles.WrapperTitleStatePrice}>
				<p className={styles.state}>
					{productType}
				</p>
				<h5 className={styles.title}>{shortStr(title)}</h5>
				<p className={styles.price}>{`${price} грн`}</p>
			</div>
		</div>
	);
};

export default MinCard;
