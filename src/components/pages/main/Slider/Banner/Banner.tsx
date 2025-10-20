import { FC } from "react";
import Link from 'next/link';
import { CommonIcon, CommonButton } from "@/components";
// import { BannerBackground } from "@/components";
import BannerProps from "@/types/bannerProps";
import styles from "./Banner.module.scss";

const Banner: FC<BannerProps> = ({ item }) => {
	const { label, title, condition, price, buttonName, backgroundImage, url } = item;

	const backgroundImageStyles = {
		"--banner-background": `url(${backgroundImage})`,
	};

	return (
		// <BannerBackground backgroundImages={backgroundImages}>
		<div className={styles.bannerBackground} style={backgroundImageStyles}>
			<div className={styles.bannerWrapper}>
				<div className={styles.bannerLabelContainer}>
					<CommonIcon
						id="icon-star"
						width="30"
						height="20"
						className={`${styles.bannerIcon} ${label.toLocaleLowerCase() === "sale" && styles.bannerIconSale
							}`}
					/>
					<span
						className={`${styles.bannerLabel} ${label.toLocaleLowerCase() === "sale" && styles.bannerLabelSale
							}`}
					>{label}</span>
				</div>
				<h2 className={styles.bannerTitle}>{title}</h2>
				<div className={styles.bannerPriceWrapper}>
					<p className={styles.bannerPrice}>{price || "\u00A0"}</p>
					<p
						className={`${styles.bannerAdditionalInfo} ${condition.toLocaleLowerCase() === "нове" && styles.newStatus
							}`}
					>{condition || "\u00A0"}</p>
				</div>
				<Link href={url || "#"}>
					<CommonButton
						type="button"
						title={buttonName}
						color="yellow"
						className={styles.bannerButton}
					/>
				</Link>
			</div>
		</div>
		// </BannerBackground>
	);
};

export default Banner;
