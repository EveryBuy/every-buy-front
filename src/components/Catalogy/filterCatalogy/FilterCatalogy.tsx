'use client';

import React, { useState, useEffect } from 'react';
import { Grid2, Button, SelectChangeEvent } from '@mui/material';
import { FilterConfig } from './CustomSelectProps';
import { CustomSelect } from './customSelect';
import { Slider } from './slider';

import { useSelector, useDispatch } from 'react-redux';
import { useAppSelector, useAppDispatch } from "@/redux/store";

import { selectCategories } from "@/redux/advertisement/selectors";

import { addCategory } from '@/redux/filters/slice';
import { getCategory, getFilteredAdverts } from '@/redux/advertisement/operations';

import CategoriesSelect from './Selects/CategoriesSelect';
import TopSubCategoriesSelect from './Selects/TopSubCategoriesSelect';
import LowSubCategoriesSelect from './Selects/LowSubCategoriesSelect';
import CityListSelect from './Selects/CityListSelect';
import SortOrderSelection from './Selects/SortOrderSelect';
import ProductTyperSelection from './Selects/ProductTypeSelect';

import { Category, CityList, TopSubCategory, LowSubCategory } from '@/redux/advertisement/slice';
import { SortOrder, ProductType } from '@/redux/filters/slice';

export function FilterCatalogySearch() {

	const dispatch = useAppDispatch();
	// const categoriesList: Category[] = useAppSelector(selectCategories);

	const [sortOrderArr, setSortOrderArr] = useState<SortOrder[] | []>([]);
	// const [categoriesArr, setCategoriesArr] = useState<Category[] | []>([]);
	const [topSubCategoriesArr, setTopSubCategoriesArr] = useState<TopSubCategory[] | []>([]);
	const [lowSubCategoriesArr, setLowSubCategoriesArr] = useState<LowSubCategory[] | []>([]);
	const [productTyperArr, setProductTyperArr] = useState<ProductType[] | []>([]);
	const [cityArr, setCityArr] = useState<CityList[] | []>([]);

	// Сортувати за
	// Категорія
	// Підкатегорія
	// Підкатегорія
	// Стан
	// Місцезнаходження

	// useEffect(() => {
	// 	dispatch(getCategory());
	// }, [dispatch]);

	// const dispatch = useAppDispatch();
	// const categ = useAppSelector(item => item.filters.categoryId);
	// console.log(categ);
	// dispatch(addCategory(4));
	// console.log(categ);



	const [price, setPrice] = useState<number[]>([0, 100000]);
	const [sort, setSort] = useState<string>('');
	const [category, setCategory] = useState<string>('');
	const [subcategory, setSubcategory] = useState<string>('');
	const [condition, setCondition] = useState<string>('');
	const [location, setLocation] = useState<string>('');

	const resetFilters = () => {
		setPrice([0, 100000]);
		setSort('');
		setCategory('');
		setSubcategory('');
		setCondition('');
		setLocation('');
	};

	const filterConfigs: FilterConfig[] = [
		{
			label: 'Категорія',
			value: category,
			setter: setCategory,
			options: [
				{ value: 'Категорія', label: 'Мода та стиль' },
				{ value: 'Категорія2', label: 'Мода та жах' },
			],
		},
		{
			label: 'Сортувати за',
			value: sort,
			setter: setSort,
			options: [{ value: 'Сортувати за', label: 'Рекомендоване' }],
		},
		{
			label: 'Підкатегорії',
			value: subcategory,
			setter: setSubcategory,
			options: [{ value: 'Підкатегорії', label: 'Жіночій одяг' }],
		},
		{
			label: 'Стан',
			value: condition,
			setter: setCondition,
			options: [{ value: 'Стан', label: 'Всі оголошення' }],
		},
		{
			label: 'Розташування',
			value: location,
			setter: setLocation,
			options: [{ value: 'Розташування', label: 'Вся Країна' }],
		},
	];



	return (
		<Grid2 container spacing={2} alignItems='center'>

			<Slider price={price} setPrice={setPrice} />
			<SortOrderSelection />
			<CategoriesSelect />
			<TopSubCategoriesSelect />
			{/* <LowSubCategoriesSelect /> */}
			<CityListSelect />
			<ProductTyperSelection />

			{/* {filterConfigs.map((config, index) => (
				<Grid2 key={index} size={{ xs: 12, sm: 6, md: 4 }}>
					<CustomSelect
						label={config.label}
						value={config.value}
						onChange={(e) =>
							config.setter(e.target.value as string)
						}
						options={config.options}
					/>
				</Grid2>
			))} */}
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
