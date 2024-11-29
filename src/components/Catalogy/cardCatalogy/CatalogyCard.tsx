import styles from "./CatalogyCard.module.scss";
import MiddleCard from "./MiddleCard/MiddleCard";
import { goodsListSell } from "@/mock-data/catalogyCardsData";
import { MiddleCardType } from "@/types/middleCardType";

type ElemCard = MiddleCardType & {
	[key: string]: any;
}

type ItemProps = {
	item: ElemCard[];
};

export const CatalogyCard = (props: ItemProps) => {

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
