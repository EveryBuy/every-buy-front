"use client";

import { FC, useState, useEffect } from "react";
import { CommonIcon, CommonButton } from "@/components";
import styles from "./Search.module.scss";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getSearchByWord } from '@/api/getSearchByWord';
import ListItemsForSearch from '@/types/listItemsForSearch';

// import { useAppSelector, useAppDispatch } from "@/redux/store";
// import { getFilteredAdverts } from '@/redux/advertisement/operations';
// import { addKeyWord } from '@/redux/filters/slice';

type ItemProps = {
	item: ListItemsForSearch[];
};

type FormEventType = React.FormEvent<HTMLFormElement>;
// type MouseEventType = React.MouseEvent<HTMLButtonElement>;
// type ChangeEventType = React.ChangeEvent<HTMLInputElement>;

const Search: FC = (props) => {
	const [word, setWord] = useState<string>('');
	const [search, setSearch] = useState<[]>([]);
	const router = useRouter();

	const goToSearch = (e: FormEventType) => {
		e.preventDefault();
		// const wordTest = dispatch(addKeyWord("кош"));
		// console.log(wordTest);
		router.push(`/catalogy?search=${word}`);
	};

	useEffect(() => {
		const fetchForSearch = async () => {
			if (word.length > 1) {
				try {
					const result: ListItemsForSearch[] = await getSearchByWord(word);
					setSearch(result);
					console.log(search);

				} catch (error: any) {
					console.error("Error fetching data:", error);
				}
			}
		};

		fetchForSearch();
	}, [word]);

	// const dispatch = useAppDispatch();
	// console.log(dispatch);

	// useEffect(() => {
	// 	dispatch(getFilteredAdverts({
	// 		filters: {
	// 			keyWord: "кош"
	// 		}
	// 	}));
	// }, [dispatch]);

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
					search.length === 0 || word === ""
						? null
						: <div className={styles.searchSuggest}>
							<ul className={styles.searchSuggestList}>
								{
									search.map(item => <SuggestItem key={item.advertisementId} item={item} />)
								}
							</ul>
						</div>
				}

			</form>
		</div>
	);
};

export default Search;
