"use client";

import { FC, useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useAppDispatch } from "@/redux/store";
import { getFilteredAdverts } from '@/redux/advertisement/operations';
import { CommonIcon, CommonButton } from "@/components";
import styles from "./Search.module.scss";
import { useRouter } from 'next/navigation';
import { addKeyWord, InitialState } from '@/redux/filters/slice';
import SearchSuggest from './SearchSuggest';

type SearchProps = {
	hideSuggest?: boolean
};

type FormEventType = React.FormEvent<HTMLFormElement>;
// type MouseEventType = React.MouseEvent<HTMLButtonElement>;
// type ChangeEventType = React.ChangeEvent<HTMLInputElement>;

const Search: FC = (props: SearchProps) => {

	const hideSearchSuggest = props.hideSuggest || false;

	const dispatch = useAppDispatch();

	const searchParams = useSearchParams() as unknown as Map<keyof InitialState, string | null>;
	const searchParamsKeyWord: string | null | undefined = searchParams.has('keyword') ? searchParams.get('keyword') : "";

	const [word, setWord] = useState<string>(
		(searchParamsKeyWord && searchParamsKeyWord.length > 0) ? searchParamsKeyWord : ""
	);

	if (hideSearchSuggest && searchParamsKeyWord && searchParamsKeyWord.length === 0) {
		setWord("");
	}

	const [searchArr, setSearchArr] = useState<[]>([]);
	const router = useRouter();

	const handlerSetWord = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		setWord(newValue);
	}

	const pathname = usePathname();

	const goToSearch = (event: FormEventType) => {
		event.preventDefault();
		dispatch(addKeyWord(word));
		if (!hideSearchSuggest) {
			router.push(`/catalogy?keyword=${word}`);
		}
	};

	useEffect(() => {
		if (word && word.length > 0) {
			dispatch(addKeyWord(word));
		}
	}, []);

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
