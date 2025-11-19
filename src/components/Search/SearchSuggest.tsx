"use client";

// import { FC } from "react";
import styles from "./SearchSuggest.module.scss";
import { SuggestItem } from './SuggestItem';
import { SuggestCatItem } from './SuggestCatItem';
import { SuggestEmpty } from './SuggestEmpty';
import { ItemSearchType, ItemSaggestCat } from '@/types/listItemsForSearch';
import CategoriesList from "@/assets/category.json";

type SearchSuggestProps = {
	searchWord: string;
	searchArr: {
		SELL: ItemSearchType[];
		BUY: ItemSearchType[];
	}
};

const SearchSuggest = (props: SearchSuggestProps): JSX.Element => {
	// console.log('props.searchArr', props.searchArr);

	const searchArrSell = props.searchArr.SELL
		? [...props.searchArr.SELL].sort((a, b) => b.count - a.count)
		: [];
	const searchArrBuy = props.searchArr.BUY
		? [...props.searchArr.BUY].sort((a, b) => b.count - a.count)
		: [];
	const word = props.searchWord || "";

	// console.log(CategoriesList);

	function transformCategories(input: ItemSearchType[]): ItemSaggestCat[] {
		return input.reduce((acc: ItemSaggestCat[], current) => {
			if (!acc.some(item => item.categoryId === current.categoryId)) {
				acc.push({
					categoryId: current.categoryId,
					categoryName: current.categoryName,
					categoryUrl: CategoriesList[current.categoryId - 1].photoUrl || ""
				});
			}
			return acc;
		}, []);
	}

	const searchCatArrSell = searchArrSell.length > 0 ? transformCategories(searchArrSell) : null;
	const searchCatArrBuy = searchArrBuy.length > 0 ? transformCategories(searchArrBuy) : null;
	// console.log("searchCatArrSell", searchCatArrSell);
	// console.log("searchCatArrBuy", searchCatArrBuy);

	return (
		<div className={styles.searchSuggest}>
			{/* <div className={styles.searchTitle}>Рекомендації</div> */}
			{
				searchArrSell && Array.isArray(searchArrSell) && searchArrSell.length > 0 ||
					searchArrBuy && Array.isArray(searchArrBuy) && searchArrBuy.length > 0
					? <>
						{searchArrSell && searchArrSell.length > 0 &&
							<section className={styles.searchSection}>
								<p className={styles.searchSectionTitle}>Продаж</p>
								<ul className={styles.searchSuggestList}>
									{searchArrSell.slice(0, 10).map((item) =>
										<SuggestItem
											key={"SELL" + item.topCategoryId}
											item={item}
											word={word}
											section="SELL"
										/>
									)}
								</ul>
								<h3 className={styles.titleCats}>Перейти в категорію:</h3>
								<ul className={styles.searchSuggestList}>
									{searchCatArrSell && searchCatArrSell.slice(0, 10).map((item) =>
										<SuggestCatItem
											key={"SELL" + item.categoryId}
											item={item}
											word={word}
											section="SELL"
										/>
									)}
								</ul>
							</section>}
						{searchArrBuy && searchArrBuy.length > 0 &&
							<section className={styles.searchSection}>
								<p className={styles.searchSectionTitle}>Купівля</p>
								<ul className={styles.searchSuggestList}>
									{searchArrBuy.slice(0, 10).map((item) =>
										<SuggestItem
											key={"BUY" + item.topCategoryId}
											item={item}
											word={word}
											section="BUY"
										/>
									)}
								</ul>
								<h3 className={styles.titleCats}>Перейти в категорію:</h3>
								<ul className={styles.searchSuggestList}>
									{searchCatArrBuy && searchCatArrBuy.slice(0, 10).map((item) =>
										<SuggestCatItem
											key={"BUY" + item.categoryId}
											item={item}
											word={word}
											section="BUY"
										/>
									)}
								</ul>
							</section>}
					</>
					: <SuggestEmpty />
			}
		</div>
	)
}

export default SearchSuggest;