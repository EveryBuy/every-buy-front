"use client";

import { FC, useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import formatAdvertisementDate from "@/utils/formatAdvertisementDate";
import { CommonIcon } from "@/components";
// import heartSelected from "@/assets/Svg/heartSelected.svg";
// import heart from "@/assets/Svg/heartDefault.svg";
import { favouriteAdvertisementItemType } from "@/types/favouriteAdvertisementItemType";
import styles from "./SelectedGoodsItem.module.scss";
import noPhotoCard from "@/assets/noPhotoCard.jpg";

type ItemProps = {
	item: favouriteAdvertisementItemType;
	onRemove: (advertisementId: number) => void;
};

export const SelectedGoodsItem: FC<ItemProps> = ({
	item,
	onRemove,
}: ItemProps) => {
	const [isFavourite, setIsFavourite] = useState(true);

	const handleToggleFavourite = () => {
		onRemove(item.advertisementId);
		setIsFavourite(!isFavourite);
	};

	const shortTitle = (str: string, countLetters: number): string => {
		const newStr = (str && str.length < countLetters) ? str : str.slice(0, countLetters) + "...";
		return newStr;
	}

	return (
		<Link href={`/announcement?id=${item.advertisementId}`}>
			<div className={styles.containerSelectedGoodsItem}>
				<div className={styles.imageWrapper}>
					<Image
						className={styles.image}
						src={item.mainPhotoUrl || noPhotoCard}
						alt={item.title || "img"}
						fill
						sizes="100vh"
					/>
				</div>
				<div className={styles.stateWrapper}>
					<div className={`${styles.state} ${item.productType === "NEW" ? "" : styles.stateNotNew}`}>
						{item.productType === "NEW" ? "нове" : "вживане"}
					</div>
					<button
						className={styles.favouriteBtn}
						// onClick={handleToggleFavourite}
						onClick={e => {
							e.preventDefault();
							e.stopPropagation();
							// e.nativeEvent.stopImmediatePropagation();
							handleToggleFavourite();
						}
						}
					>
						<CommonIcon
							id={isFavourite ? "heart" : "icon-heart"}
							width="22px"
							height="22px"
						/>
					</button>
				</div>

				<h3 className={styles.title}>{item?.title && shortTitle(item.title, 20)}</h3>

				<p className={styles.dateText}>
					{`${item.city?.cityName || "Місто не вказано"}, ${item.city?.region.regionName || "Область не вказано"
						}`}
					<br />
					{`${formatAdvertisementDate(item.updateDate)}`}
				</p>
				<p className={styles.price}>{`${item.price} грн`}</p>
			</div>
		</Link>
	);
};

export default SelectedGoodsItem;
