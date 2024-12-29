"use client";

import { FC } from "react";
import styles from "./Search.module.scss";
import Link from 'next/link';
import ListItemsForSearch from '@/types/listItemsForSearch';

type ItemProps = {
	searchArr: ListItemsForSearch[];
};

const SearchSuggest: FC<ItemProps> = (props) => {

	const searchArr = props.searchArr;
	console.log(searchArr);

	return (
		<div className={styles.searchSuggest}>
			<ul className={styles.searchSuggestList}>
				{searchArr.map((item) => <SuggestItem key={item.advertisementId} item={item} />)}
			</ul>
		</div>
	)
}

const SuggestItem = (props: ListItemsForSearch): JSX.Element => {

	const {
		advertisementId,
		title,
		category,
		topSubCategory
	} = props.item;

	// console.log(item.advertisementId);
	return (
		<li key={advertisementId} className={styles.searchSuggestItem}>
			<Link href={`/announcement?id=${advertisementId}`}>
				<span className={styles.searchLinkItem}>{title}</span>
				<span className={styles.searchItemCategory}>{category.nameUkr}
					/ {topSubCategory.subCategoryNameUkr}</span>
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
