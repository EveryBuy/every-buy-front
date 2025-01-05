"use client";

import { FC, useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { getFilteredAdverts } from '@/redux/advertisement/operations';
import { CommonIcon, CommonButton } from "@/components";
import styles from "./Search.module.scss";
import { useRouter } from 'next/navigation';
import { addKeyWord, InitialState } from '@/redux/filters/slice';
import SearchSuggest from './SearchSuggest';
import { getSearchByWord } from '@/api/getSearchByWord';
import ListItemsForSearch from '@/types/listItemsForSearch';

type SearchProps = {
	hideSuggest?: boolean
};

type FormEventType = React.FormEvent<HTMLFormElement>;
// type MouseEventType = React.MouseEvent<HTMLButtonElement>;
// type ChangeEventType = React.ChangeEvent<HTMLInputElement>;

const Search: FC = (props: SearchProps) => {

	const hideSearchSuggest = props.hideSuggest || false;

	const wordState = useAppSelector(state => state.filters.keyword);
	const [word, setWord] = useState<string>(
		wordState ? wordState : ""
	);

	const dispatch = useAppDispatch();

	const searchParams = useSearchParams() as unknown as Map<keyof InitialState, string | null>;
	const searchParamsKeyWord: string | null | undefined = searchParams.has('keyword') ? searchParams.get('keyword') : "";

	if (wordState.length === 0 && searchParamsKeyWord && searchParamsKeyWord.length > 0) {
		dispatch(addKeyWord(searchParamsKeyWord));
		// setWord(searchParamsKeyWord);
	}

	if (searchParamsKeyWord && searchParamsKeyWord.length === 0) {
		dispatch(addKeyWord(""));
		// setWord("");
	}

	const [searchArr, setSearchArr] = useState<[]>([]);
	const router = useRouter();

	const handlerSetWord = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		dispatch(addKeyWord(newValue));
		setWord(newValue);
	}

	const goToSearch = (event: FormEventType) => {
		event.preventDefault();
		if (!hideSearchSuggest) {
			router.push(`/catalogy?keyword=${word}`);
		}
	};

	useEffect(() => {
		if (!hideSearchSuggest && word && word.length > 0) {
			dispatch(getFilteredAdverts({
				keyword: word
			}))
				.then((data) => {
					console.log(data.payload);
					if (data) {
						setSearchArr(data.payload);
					}
				});
		}
	}, [word]);

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
					hideSearchSuggest
						? null
						: word.length > 0
							? <SearchSuggest searchArr={searchArr} />
							: null
				}

			</form>
		</div>
	);
};

export default Search;
