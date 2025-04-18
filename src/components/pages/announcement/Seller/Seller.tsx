import Image from "next/image";
import arrowUrl from "../../../../assets/Svg/rightArrow.svg";
import imageUrl from "../../../../assets/pc.png";
import styles from "./Seller.module.scss";

interface SellerProps {
	sellerInfo: {
		nameUkr: string;
		online: boolean;
		linkToAllAdvert: string;
		imageUrl: string;
		section: string;
	};
}

export default function Seller({ sellerInfo }: SellerProps) {
	if (!sellerInfo) {
		return <div className={styles.container}>Error fetching seller info</div>;
	}

	const { nameUkr, online, linkToAllAdvert, imageUrl: sellerImageUrl, section } = sellerInfo;

	const sellerName = nameUkr || "Невідомо";

	const imageSrc = sellerImageUrl || imageUrl;

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>
				{section === "SELL" ? "Продавець" : "Покупець"}
			</h3>
			<div className={styles.sellerInfo}>
				<div className={styles.sellerImage}>
					<Image
						src={imageSrc}
						alt="Seller"
						width="0"
						height="0"
						sizes="100vh"
						style={{ width: 'auto', height: '100%' }}
					/>
				</div>
				<div>
					<h4 className={styles.name}>{sellerName}</h4>
					<p className={`${styles.status} ${online ? styles.online : styles.offline}`}>
						{online ? "Зараз онлайн" : "Зараз офлайн"}
					</p>
				</div>
			</div>
			<a href={linkToAllAdvert} className={styles.allOrders}>
				Усі оголошення автора
				<Image className={styles.arrow} src={arrowUrl} alt="Right arrow" />
			</a>
		</div>
	);
}
