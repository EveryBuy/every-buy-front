'use client';

import React, { useState, useEffect } from 'react';
import { Grid2, Button, SelectChangeEvent } from '@mui/material';

import { useAppSelector, useAppDispatch } from "@/redux/store";

import PriceSlider from './PriceSlider';
import CategoriesSelect from './Selects/CategoriesSelect';
import TopSubCategoriesSelect from './Selects/TopSubCategoriesSelect';
import LowSubCategoriesSelect from './Selects/LowSubCategoriesSelect';
import CityListSelect from './Selects/CityListSelect';
import SortOrderSelection from './Selects/SortOrderSelect';
import ProductTyperSelection from './Selects/ProductTypeSelect';

import { useRouter, useSearchParams } from 'next/navigation';

export function FilterCatalogySearch() {

	const searchParams = useSearchParams();
	const router = useRouter();

	const dispatch = useAppDispatch();
	const filtersSetting = useAppSelector(state => state.filters);
	console.log(filtersSetting);
	const {
		categoryId,
		price: {
			max,
			min
		},
		sortOrder,
		// regionId,
		// topSubcategoryId,
		// lowSubcategoryId,
		productType,
		keyword
	} = filtersSetting;


	const createQuerySettings = () => {
		let queryArray: string[] = [];
		if (categoryId !== null) queryArray.push(`categoryId=${categoryId}`);
		if (min !== 0) queryArray.push(`minPrice=${min}`);
		if (max !== 100000) queryArray.push(`maxPrice=${max}`);
		if (sortOrder !== "") queryArray.push(`sortOrder=${sortOrder}`);
		// if (filtersSetting.location !== "") queryArray.push(`regionId=${filtersSetting.location}`);
		if (filtersSetting.subcategoryId !== null) queryArray.push(`topSubCategoryId=${filtersSetting.subcategoryId}`);
		// if (filtersSetting.subcategoryId !== null) queryArray.push(`lowSubCategoryId=${filtersSetting.subcategoryId}`);
		if (productType !== "") queryArray.push(`productType=${productType}`);
		if (keyword !== "") queryArray.push(`keyword=${keyword}`);

		const queryString: string = queryArray.length > 0 ? "?" + queryArray.join('&') : "";
		console.log(queryString);
		return queryString;
	}

	// createQuerySettings();

	const resetFilters = () => {
		router.push(`/catalogy`, {
			scroll: false,
		});
		// dispatch(resetFilters);
	};

	useEffect(() => {
		const query: string = createQuerySettings();

		router.push(`${query}`, {
			scroll: false,
		});
	}, [min, max, categoryId, sortOrder, productType, router]);

	console.log(filtersSetting);

	return (
		<Grid2 container spacing={2} alignItems='center' justifyItems='center'>

			<PriceSlider />
			<SortOrderSelection />
			<CategoriesSelect />
			{
				categoryId && categoryId > 0 && <TopSubCategoriesSelect />
			}
			{/* <LowSubCategoriesSelect /> */}
			<ProductTyperSelection />
			<CityListSelect />

			<Grid2
				size={{ xs: 12 }}
				sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}
			>
				<Button
					variant='outlined'
					onClick={resetFilters}
					sx={{ border: 'none', color: 'black', fontWeight: '500', fontSize: '20px' }}
				>
					Скинути фільтри
				</Button>
			</Grid2>
		</Grid2>
	);
}

// Сортувати за
// Категорія
// Підкатегорія
// Підкатегорія
// Стан
// Місцезнаходження
