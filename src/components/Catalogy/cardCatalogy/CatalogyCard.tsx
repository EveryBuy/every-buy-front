import { FC } from "react";
import styles from "./CatalogyCard.module.scss";
import MiddleCard from "./MiddleCard";
import { goodsListSell } from "@/mock-data/catalogyCardsData";
// import {middleCardType } from "@/types/middleCardType";

export const CatalogyCard: FC = (props) => {
	console.log(props);
	const items = props.item?.length > 0 ? props.item : goodsListSell;
	return (
		<div className={styles.containerMiddleCardsList}>
			<ul className={styles.middleCardsList}>
				{
					items.map((elem) => {
						return (
							<li key={elem.advertisementId} className={styles.middleCardsItem}>
								<MiddleCard item={elem} />
							</li>
						);
					})

				}
			</ul>
		</div>
	);
};

export default CatalogyCard;
