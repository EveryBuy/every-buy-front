'use client';

import React from 'react';
import { useAppSelector } from "@/redux/store";


import PriceSlider from './PriceSlider';
import CategoriesSelect from './Selects/CategoriesSelect';
import TopSubCategoriesSelect from './Selects/TopSubCategoriesSelect';
import LowSubCategoriesSelect from './Selects/LowSubCategoriesSelect';
import RegionListSelect from './Selects/RegionListSelect';
import CityListSelect from './Selects/CityListSelect';
import SortOrderSelection from './Selects/SortOrderSelect';
import ProductTyperSelection from './Selects/ProductTypeSelect';

import { Grid2, Button, SelectChangeEvent } from '@mui/material';

type ResetFiltersType = {
	heandlerClick: void
}

export function FilterCatalogySearch(props: ResetFiltersType) {

	const categoryId = useAppSelector(state => state.filters.categoryId);
	const topSubCateroryId = useAppSelector(state => state.filters.topSubCateroryId);

	return (
		<Grid2 container direction="row" spacing={2} sx={{ justifyContent: "center", alignItems: "flex-end", }}>

			<PriceSlider />
			<SortOrderSelection />
			<CategoriesSelect />
			{
				categoryId && categoryId > 0 && <TopSubCategoriesSelect />
			}
			{
				topSubCateroryId && topSubCateroryId > 0 && <LowSubCategoriesSelect />
			}
			<ProductTyperSelection />
			<RegionListSelect />
			{/* <CityListSelect /> */}

			<Grid2
				size={{ xs: 12 }}
				sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}
			>
				<Button
					variant='outlined'
					onClick={props.heandlerClick}  // handlerResetFilters
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
