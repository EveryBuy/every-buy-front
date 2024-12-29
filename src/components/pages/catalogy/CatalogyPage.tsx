'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { getFilteredAdverts } from '@/redux/advertisement/operations';
import { useRouter } from 'next/navigation';
import { addKeyWord, resetFilters, InitialState } from '@/redux/filters/slice';

import { CatalogyCard } from "../../Catalogy/cardCatalogy/CatalogyCard";
import { Container, Box, Typography } from '@mui/material';
import {
	CustomSeparator,
	FilterCatalogySearch,
	CategoryList,
	Search,
} from '@/components';
// import { searchGoods } from '@/mock-data/searchGoods';

const styles = {
	display: 'flex',
	flexDirection: 'column',
};

export const CatalogyPage = () => {

	const dispatch = useAppDispatch();
	const searchParams = useSearchParams() as unknown as Map<keyof InitialState, string | null>;

	const [isListOpen, setListOpen] = useState(false);
	const [search, setSearch] = useState([]);
	const [loading, setLoading] = useState(false);
	const wordSearch = searchParams.get('keyword') ? searchParams.get('keyword') : "";
	const [word, setWord] = useState<string | null>(wordSearch);

	const makeLinkOpen = () => {
		setListOpen((prev) => !prev);
	};

	const router = useRouter();

	const filtersSetting = useAppSelector(state => state.filters);
	const {
		categoryId,
		price: {
			max,
			min
		},
		sortOrder,
		regionId,
		topSubCateroryId,
		lowSubCategoryId,
		productType,
		keyword,
		page
	} = filtersSetting;


	const createQuerySettings = () => {
		let queryArray: string[] = [];
		if (categoryId !== null) queryArray.push(`categoryId=${categoryId}`);
		if (min !== 0) queryArray.push(`minPrice=${min}`);
		if (max !== 100000) queryArray.push(`maxPrice=${max}`);
		if (sortOrder !== "") queryArray.push(`sortOrder=${sortOrder}`);
		if (regionId !== null) queryArray.push(`regionId=${regionId}`);
		if (topSubCateroryId !== null) queryArray.push(`topSubCategoryId=${topSubCateroryId}`);
		if (lowSubCategoryId !== null) queryArray.push(`lowSubCategoryId=${lowSubCategoryId}`);
		if (productType !== "") queryArray.push(`productType=${productType}`);
		if (keyword !== "") queryArray.push(`keyword=${keyword}`);
		if (page !== 1) queryArray.push(`page=${page}`);

		const queryString: string = queryArray.length > 0 ? "?" + queryArray.join('&') : "";
		console.log(queryString);
		return queryString;
	}

	// createQuerySettings();

	useEffect(() => {
		if (wordSearch && wordSearch.length > 0) {
			dispatch(addKeyWord(wordSearch));

			dispatch(getFilteredAdverts({
				keyword: wordSearch
			}))
				.then((data) => {
					if (data && data.payload.length > 0) {
						setSearch(data.payload);
					}
					console.log(data.payload);
				});
		}
	}, [wordSearch]);

	useEffect(() => {
		const query: string = createQuerySettings();

		router.push(`${query}`, {
			scroll: false,
		});
	}, [filtersSetting, router]);  //min, max, categoryId, sortOrder, productType,

	console.log(filtersSetting);

	const handlerResetFilters = () => {
		dispatch(resetFilters());

		setTimeout(() => {
			router.push(`/catalogy`, {
				scroll: false,
			});
		}, 0);
	};

	return (
		<Container sx={{ marginTop: '1rem' }}>
			<Box className='custom-separator' maxWidth={'sm'}>
				<CustomSeparator category="Moda" />
			</Box>
			<Box sx={{ margin: "2em 1em" }}>
				<Search />
			</Box>
			<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: "center", margin: '2.5rem 0' }}>
				<Typography variant='h3' sx={{ fontSize: '2.3em' }}>
					Фільтри
				</Typography>
				<Typography variant='h3'
					sx={{ fontSize: '1em', cursor: "pointer" }}
					onClick={makeLinkOpen}>
					{isListOpen ? "Згорнути" : "Розгорнути"}
				</Typography>
			</Box>
			<Box className={isListOpen ? styles : "hidden"}>
				<FilterCatalogySearch heandlerClick={handlerResetFilters} />
			</Box>

			<CategoryList />
			<Typography variant='h3' sx={{ margin: '1rem 0 2.3rem', fontSize: '2.3em' }}>
				Ми знайшли понад 1000 оголошень
			</Typography>
			{
				search.length > 0
					? <CatalogyCard item={search} />
					: <CatalogyCard />
			}
		</Container>
	);
}