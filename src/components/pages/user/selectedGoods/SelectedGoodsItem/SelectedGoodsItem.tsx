"use client";

import { FC, useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import formatAdvertisementDate from "@/utils/formatAdvertisementDate";
import { CommonIcon } from "@/components";
import heartSelected from "@/assets/Svg/heartSelected.svg";
import heart from "@/assets/Svg/heartDefault.svg";
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

	return (
		<div className={styles.containerSelectedGoodsItem}>
			<Link href={`/announcement?id=${item.advertisementId}`}>
				<div className={styles.imageWrapper}>
					<Image
						className={styles.image}
						src={item.mainPhotoUrl || noPhotoCard}
						alt={item.title || "img"}
						fill
						sizes="100vh"
					/>
				</div>
				<div className={styles.titleWrapper}>
					<h3 className={styles.title}>{item.title}</h3>
					<p className={styles.state}>
						{item.productType === "NEW" ? "нове" : "вживане"}
					</p>
				</div>
			</Link>
			<div className={styles.priceWrapper}>
				<p className={styles.price}>{`${item.price} грн`}</p>
				<button className={styles.favouriteBtn} onClick={handleToggleFavourite}>
					<CommonIcon
						id={isFavourite ? "heart" : "icon-heart"}
						width="24px"
						height="24px"
					/>
				</button>
			</div>
			<p className={styles.dateText}>
				{`${formatAdvertisementDate(item.updateDate)}`}
				<br />
				{`${item.city?.cityName || "Хз, яке місто"}, ${item.city?.region.regionName || "Хз, яка область"
					}`}
			</p>
		</div>
	);
};

export default SelectedGoodsItem;
