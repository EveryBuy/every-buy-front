"use client";

// import { FC } from "react";
import styles from "./SearchSuggest.module.scss";
import Link from 'next/link';
import Image from 'next/image';
import { ItemSearchType } from '@/types/listItemsForSearch';
import imgSearchEmpty from '@/assets/Svg/searchEmpty.svg';
import CategoriesList from "@/assets/category.json";

type SearchSuggestProps = {
	searchWord: string;
	searchArr: {
		SELL: ItemSearchType[];
		BUY: ItemSearchType[];
	}
};

type ItemSaggestProps = {
	item: ItemSearchType;
	word: string;
	section: string;
}

type ItemSaggestCat = {
	categoryId: number;
	categoryName: string;
	categoryUrl: string;
}

type ItemSaggestCatProps = {
	item: ItemSaggestCat;
	word: string;
	section: string;
}

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
						{searchArrSell && searchArrSell.length > 0 && <>
							<p className={styles.searchSection}>Продаж</p>
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
						</>}
						{searchArrBuy && searchArrBuy.length > 0 && <>
							<p className={styles.searchSection}>Купівля</p>
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
						</>}
					</>
					: <SuggestEmty />
			}
		</div>
	)
}

const SuggestItem = (props: ItemSaggestProps): JSX.Element => {

	const {
		categoryId,
		categoryName,
		count,
		topCategoryId,
		topCategoryName,
	} = props.item;

	const word = props.word;

	return (
		<li key={topCategoryId} className={styles.searchSuggestItem}>
			<Link href={`/catalogy?keyword=${word}&categoryId=${categoryId}&topSubCategoryId=${topCategoryId}${props.section === "SELL" ? "" : "&section=BUY"}`}>
				<span className={styles.searchLinkItem}>{word}</span>
				{/* <span className={styles.searchCount}>{count}</span> */}
				<div className={styles.searchItemCategory}>
					{categoryName} / <strong>{topCategoryName}</strong>
					<span className={styles.searchCount}>{count}</span>
				</div>

			</Link>
		</li>
	)
}

const SuggestCatItem = (props: ItemSaggestCatProps): JSX.Element => {

	const {
		categoryId,
		categoryName,
		categoryUrl
	} = props.item;

	const word = props.word;

	return (
		<li key={categoryId} className={styles.searchSuggestItem}>
			<Link className={styles.searchLinkCatLink} href={`/catalogy?keyword=${word}&categoryId=${categoryId}${props.section === "SELL" ? "" : "&section=BUY"}`}>
				<Image
					alt=""
					src={categoryUrl}
					width={24}
					height={24}
					className={styles.searchLinkCatImg}
				/>
				<span className={styles.searchLinkCatTitle}>{categoryName}</span>
			</Link>
		</li>
	)
}

const SuggestEmty = (): JSX.Element => {
	return (
		<div className={styles.searchEmptyWrapper}>
			<div className={styles.searchEmptyTitle}>Нажаль ми не знайшли жодного оголошення</div>
			<Image
				src={imgSearchEmpty}
				sizes="(max-width: 480px) 144px, 175px, (max-width: 2600px) 288px, 350px"
				// width={288}
				// height={350}
				alt="не має оголошення"
			/>
		</div>
	);
}


export default SearchSuggest;