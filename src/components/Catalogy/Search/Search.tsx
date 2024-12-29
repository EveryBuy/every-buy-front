"use client";

import { FC, useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { getFilteredAdverts } from '@/redux/advertisement/operations';
import { CommonIcon, CommonButton } from "@/components";
import styles from "./Search.module.scss";
import { useRouter } from 'next/navigation';
import { addKeyWord, filtersReducer } from '@/redux/filters/slice';
import SearchSuggest from './SearchSuggest';
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
	const wordState = useAppSelector(state => state.filters.keyword);
	const [word, setWord] = useState<string>(
		wordState ? wordState : ""
	);
	const [searchArr, setSearchArr] = useState<[]>([]);
	const router = useRouter();

	const dispatch = useAppDispatch();

	const handlerSetWord = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		setWord(newValue);
		dispatch(addKeyWord(newValue));
	}

	const goToSearch = (e: FormEventType) => {
		e.preventDefault();
		// const wordTest = dispatch(addKeyWord("кош"));
		// console.log(wordTest);
		router.push(`/catalogy?keyword=${word}`);
	};

	useEffect(() => {
		if (word && word.length > 0) {
			dispatch(getFilteredAdverts({
				keyword: word
			}))
				.then((data) => {
					if (data && data.payload.length > 0) {
						setSearchArr(data.payload);
					}
					console.log(data.payload);
				});
		}
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

	return (
		<div className={styles.searchContainer}>
			<form className={styles.searchForm}>
				<div className={styles.searchInputWrapper}>
					<input
						className={styles.searchInput}
						placeholder="Що шукаєте?"
						value={word}
						onChange={handlerSetWord}
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
					word.length > 0 && searchArr.length > 0
						? <SearchSuggest searchArr={searchArr} />
						: word.length > 0 && searchArr.length === 0
							? <div>Нажаль ми не знайшли жодного оголошення</div>
							: null
				}

			</form>
		</div>
	);
};

export default Search;
