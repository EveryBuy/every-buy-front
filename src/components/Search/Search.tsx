"use client";

import { FC, useState, useEffect } from "react";
import React from "react";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/redux/store";
import { getFilteredAdverts, getSearchAdverts } from "@/redux/advertisement/operations";
import { CommonIcon, CommonButton } from "@/components";
import styles from "./Search.module.scss";
import { useRouter } from "next/navigation";
import { addKeyWord, InitialState } from "@/redux/filters/slice";
import SearchSuggest from "./SearchSuggest";

type SearchProps = {
	hideSuggest?: boolean;
	style?: React.CSSProperties;
};

type FormEventType = React.FormEvent<HTMLFormElement>;
// type MouseEventType = React.MouseEvent<HTMLButtonElement>;
// type ChangeEventType = React.ChangeEvent<HTMLInputElement>;

const Search: FC<SearchProps> = (props: SearchProps) => {
	const hideSearchSuggest = props.hideSuggest || false;

	const dispatch = useAppDispatch();

	const searchParams = useSearchParams() as unknown as Map<
		keyof InitialState,
		string | null
	>;
	// console.log("Search params:", searchParams.toString());
	const searchParamsKeyWord: string | null | undefined = searchParams.has(
		"keyword"
	)
		? searchParams.get("keyword")
		: "";

	const [word, setWord] = useState<string>(
		searchParamsKeyWord && searchParamsKeyWord.length > 0
			? searchParamsKeyWord
			: ""
	);

	if (
		hideSearchSuggest &&
		searchParamsKeyWord &&
		searchParamsKeyWord.length === 0
	) {
		setWord("");
	}

	const [searchArr, setSearchArr] = useState<{ SELL: [], BUY: [] }>({ SELL: [], BUY: [] });
	const router = useRouter();

	const handlerSetWord = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const newValue = event.target.value;
		setWord(newValue);
	};

	const pathname = usePathname();

	const hendlerSearch = (event?: FormEventType | undefined): void => {
		event?.preventDefault();
		dispatch(addKeyWord(word));
		if (!hideSearchSuggest) {
			router.push(`/catalogy?keyword=${word}`);
		}
	};

	useEffect(() => {
		if (word && word.length > 0) {
			dispatch(addKeyWord(word));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!hideSearchSuggest && word && word.length > 2) {
			dispatch(
				getSearchAdverts(word)
			).then((data) => {
				if (data) {
					setSearchArr(data.payload);
				}
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [word]);

	const handlerClearWord = (): void => {
		setWord("");
		dispatch(addKeyWord(""));
	};

	return (
		<div className={styles.searchContainer}>
			<form className={styles.searchForm} style={props.style}>
				<div className={styles.searchInputWrapper}>
					<input
						className={styles.searchInput}
						placeholder="Що шукаєте?"
						value={word}
						onChange={handlerSetWord}
					/>
					<div className={styles.searchInputIconsWrapper}>
						{
							word && word.length > 0 ? (
								<>
									<CommonButton
										type="button"
										title=""
										color="transparent"
										className={styles.closeBtn}
										onClick={handlerClearWord}
									>
										<CommonIcon
											id="icon-clean-search"
											width="14"
											height="14"
											className={styles.searchInputIcon}
										/>
									</CommonButton>

									<CommonButton
										type="submit"
										title=""
										color="white"
										className={styles.searchButtonFocus}
										onClick={hendlerSearch}
									>
										<CommonIcon
											id="icon-search-focus"
											width="24"
											height="24"
											className={styles.searchButtonIcon}
										/>
									</CommonButton>
								</>
							) :
								<CommonIcon
									id="icon-search-passive"
									width="26"
									height="26"
									className={styles.searchButtonIconPassive}
								/>
							// (
							// 	<CommonIcon
							// 		id="icon-search"
							// 		width="28"
							// 		height="28"
							// 		className={styles.searchInputIcon}
							// 	/>
							// )
						}
					</div>
				</div>
				{hideSearchSuggest
					? null
					: (word.length > 2)  //  && (searchArr.SELL.length > 0 || searchArr.BUY.length > 0)
						? (
							<SearchSuggest searchArr={searchArr} searchWord={word} />
						)
						: null}
			</form>
		</div>
	);
};

export default Search;