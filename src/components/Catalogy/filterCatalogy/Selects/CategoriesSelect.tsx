'use client';

import React, { FC, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { selectCategories } from "@/redux/advertisement/selectors";
import { getCategory } from '@/redux/advertisement/operations';
import { addCategory, InitialState, addTopSubCateroryId, addLowSubCategoryId } from '@/redux/filters/slice';
import CommonSelect from '@/components/ui/CommonSelect/CommonSelect';
import { SelectChangeEvent } from '@mui/material';
import { Category } from '@/redux/advertisement/slice';

const CategoriesSelect: FC = () => {

	const searchParams = useSearchParams() as unknown as Map<keyof InitialState, string | null>;
	const dispatch = useAppDispatch();

	const searchParamsCategoryId: number | null = searchParams.has('categoryId') ? Number(searchParams.get('categoryId')) : null;

	const categoryIdStore: number = useAppSelector((state) => state.filters.categoryId) || 0;

	useEffect(() => {
		dispatch(getCategory());
		if (searchParamsCategoryId && searchParamsCategoryId > 0) {
			dispatch(addCategory(searchParamsCategoryId));
		}
	}, []);

	const categoriesList: Category[] = useAppSelector(selectCategories);

	const [initialSearchParams, setInitialSearchParams] = useState<Category[]>([]);
	const [selectedOption, setSelectedOption] = useState<string>("");

	useEffect(() => {
		if (categoriesList.length > 0 && searchParamsCategoryId !== null && searchParamsCategoryId > 0) {
			const arrCategory = categoriesList.filter(item => item.id === searchParamsCategoryId);
			setInitialSearchParams(arrCategory);
		}
	}, [categoriesList]);

	useEffect(() => {
		if (initialSearchParams.length > 0) {
			setSelectedOption(initialSearchParams[0].nameUkr)
		}
	}, [initialSearchParams]);

	useEffect(() => {
		dispatch(addTopSubCateroryId(null));
		dispatch(addLowSubCategoryId(null));
		if (categoryIdStore && categoryIdStore > 0 && categoriesList.length > 0) {
			const arrCategoryIdSelect: Category[] = categoriesList?.filter(item => item.id === categoryIdStore);
			if (arrCategoryIdSelect.length > 0) {
				const categoryName: string = arrCategoryIdSelect[0].nameUkr;
				setSelectedOption(categoryName);
			}
		} else {
			setSelectedOption('');
			setInitialSearchParams([]);
		}
	}, [categoryIdStore]);

	// const options = ["Option 1", "Option 2", "Option 3"];
	const options: string[] = categoriesList.map(item => item.nameUkr);

	const handleChange = (event: SelectChangeEvent<string>) => {
		const target: string = event.target.value;
		const arrCategorySelect: Category[] = categoriesList?.filter(item => item.nameUkr === target);
		const newIdCategory: number = arrCategorySelect.length > 0 ? arrCategorySelect[0].id : 0;
		dispatch(addCategory(newIdCategory));
		setSelectedOption(target);
	};

	return (
		<CommonSelect
			label="Категорія"
			options={options}
			size={{
				//mobile: "0",  0 - якщо не відображається на даному екрані
				mobile: "100%",
				tablet: "30%",
				laptop: "22%"
			}}
			outlineColor="blue"
			value={selectedOption}
			onChange={handleChange}
		/>
	);
}

export default CategoriesSelect;