"use client";

// import { FC } from "react";
import styles from "./SearchSuggest.module.scss";
import Link from 'next/link';
import { Advertisement, ListItemsForSearch } from '@/types/listItemsForSearch';
import Image from 'next/image';
import imgSearchEmpty from '@/assets/Svg/searchEmpty.svg';

type SearchSuggestProps = {
	searchArr: Advertisement[],
	searchArrBuy: Advertisement[]
};

type ItemSearchProps = {
	item: ListItemsForSearch
}

const SearchSuggest = (props: SearchSuggestProps): JSX.Element => {

	const searchArr = props.searchArr;
	const searchArrBuy = props.searchArrBuy;

	return (
		<div className={styles.searchSuggest}>
			<div className={styles.searchTitle}>Рекомендації</div>
			{
				searchArr && Array.isArray(searchArr) && searchArr.length > 0 ||
					searchArrBuy && Array.isArray(searchArrBuy) && searchArrBuy.length > 0
					? <>
						{searchArr && searchArr.length > 0 && <>
							<p className={styles.searchSection}>Продаж</p>
							<ul className={styles.searchSuggestList}>
								{searchArr.slice(0, 10).map((item) => <SuggestItem key={item.advertisementId} item={item} />)}
							</ul>
						</>}
						{searchArrBuy && searchArrBuy.length > 0 && <>
							<p className={styles.searchSection}>Купівля</p>
							<ul className={styles.searchSuggestList}>
								{searchArrBuy.slice(0, 10).map((item) => <SuggestItem key={item.advertisementId} item={item} />)}
							</ul>
						</>}
					</>
					: <div className={styles.searchEmptyWrapper}>
						<div className={styles.searchEmptyTitle}>Нажаль ми не знайшли жодного оголошення</div>
						<Image
							src={imgSearchEmpty}
							sizes="(max-width: 480px) 144px, 175px, (max-width: 2600px) 288px, 350px"
							// width={288}
							// height={350}
							alt="не має оголошення"
						/>
					</div>
			}
		</div>
	)
}

const SuggestItem = (props: ItemSearchProps): JSX.Element => {

	const {
		advertisementId,
		title,
		category,
		topSubCategory,
		lowSubCategory
	} = props.item;

	return (
		<li key={advertisementId} className={styles.searchSuggestItem}>
			<Link href={`/announcement?id=${advertisementId}`}>
				<span className={styles.searchLinkItem}>{title}</span>
				<span className={styles.searchItemCategory}>{category.nameUkr}
					/ {topSubCategory.subCategoryNameUkr}
					{lowSubCategory && " / " + lowSubCategory.subCategoryNameUkr}</span>
			</Link>
		</li>
	)
}
// advertisementId
// category.nameUkr
// lowSubCategory.subCategoryNameUkr  
// topSubCategory.subCategoryNameUkr
// title  
// ? mainPhotoUrl

export default SearchSuggest;
