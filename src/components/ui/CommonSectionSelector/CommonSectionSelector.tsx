"use client";

import { FC } from "react";
import styles from "./CommonSectionSelector.module.css";

// If an advertisement is created, then the BUY/SELL criterion is recorded in the database according to the owner of the advertisement.
// "BUY" means to sell, and "SELL" means to buy for other buyers.
// default - "SELL"

type Props = {
	section: string;
	setSection: (section: string) => void;
};

export const CommonSectionSelector: FC<Props> = ({ section, setSection }) => {
	const handleBuy = () => {
		setSection("BUY");
	};

	const handleSell = () => {
		setSection("SELL");
	};

	return (
		<section className={styles.sectionContainer}>
			<ul className={styles.buttonList}>
				<li>
					<button onClick={handleSell}>Куплю</button>
					{section === "SELL" && <div className={styles.toggle}></div>}
				</li>
				<li>
					<button onClick={handleBuy}>Продам</button>
					{section === "BUY" && <div className={styles.toggle}></div>}
				</li>
			</ul>
			<div className={styles.separator}></div>
		</section>
	);
};

export default CommonSectionSelector;
