"use client";

import { FC, useState, useEffect } from "react";
import { CommonIcon, CommonButton } from "@/components";
import styles from "./Search.module.scss";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getSearchByWord } from '../../api/getSearchByWord';

const Search: FC = (props) => {
	const [word, setWord] = useState<string>('');
	const [search, setSearch] = useState<[]>([]);
	const router = useRouter();

	const goToSearch = (): void => {
		router.push(`/search/${word}`);
	};

	useEffect(() => {
		const fetchForSearch = async () => {
			try {
				const result = await getSearchByWord(word);
				setSearch(result);
				// console.log(search);

			} catch (error: any) {
				console.error("Error fetching data:", error);
			}
		};

		fetchForSearch();
	}, [word]);

	const SuggestItem = ({ item }) => {

		// console.log(item.advertisementId);
		return (
			<li key={item.advertisementId} className={styles.searchSuggestItem}>
				<Link href={`/products/${item.advertisementId}`}>
					<span className={styles.searchLinkItem}>{item.title}</span>
					<span className={styles.searchItemCategory}>{item.category.nameUkr}
						/ {item.topSubCategory.subCategoryNameUkr}</span>
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

	return (
		<div className={styles.searchContainer}>
			<form className={styles.searchForm}>
				<div className={styles.searchInputWrapper}>
					<input
						className={styles.searchInput}
						placeholder="Що шукаєте?"
						value={word}
						onChange={e => setWord(e.target.value)}
					/>
					<div className={styles.searchInputIconWrapper}>
						<CommonIcon
							id="icon-search"
							width="28"
							height="28"
							className={styles.searchInputIcon}
						/>
					</div>
				</div>
				<CommonButton
					type="submit"
					title=""
					color="white"
					className={styles.searchButton}
					onClick={goToSearch}
				>
					<CommonIcon
						id="icon-search"
						width="25"
						height="25"
						className={styles.searchButtonIcon}
					/>
				</CommonButton>
				{
					search.length === 0
						? null
						: <div className={styles.searchSuggest}>
							<ul className={styles.searchSuggestList}>
								{
									search.map(item => <SuggestItem item={item} />)
								}
							</ul>
						</div>
				}

			</form>
		</div>
	);
};

export default Search;
