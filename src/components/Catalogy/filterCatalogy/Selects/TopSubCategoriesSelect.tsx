'use client';

import React, { FC, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { selectTopSubCategories } from "@/redux/advertisement/selectors";
import { TopSubCategory } from '@/redux/advertisement/slice';
import { getTopSubCategory } from '@/redux/advertisement/operations';
import { addTopSubCateroryId, InitialState } from '@/redux/filters/slice';
import CommonSelect from '@/components/ui/CommonSelect/CommonSelect';
import { SelectChangeEvent } from '@mui/material';

const TopSubCategoriesSelect: FC = () => {

	const searchParams = useSearchParams() as unknown as Map<keyof InitialState, string | null>;
	const dispatch = useAppDispatch();

	const categoryID: number | null = useAppSelector(state => state.filters.categoryId) || null;
	const searchParamsTopCategoryId: number | null = searchParams.has('topSubCateroryId') ? Number(searchParams.get('topSubCateroryId')) : null;

	const subCategoriesList: TopSubCategory[] = useAppSelector(selectTopSubCategories);

	const [initialSearchParams, setInitialSearchParams] = useState<TopSubCategory[]>([]);
	const [selectedOption, setSelectedOption] = useState<string>("");

	useEffect(() => {
		setSelectedOption('');
		if (categoryID && categoryID > 0) {
			dispatch(getTopSubCategory(categoryID));
		}
		if (searchParamsTopCategoryId && searchParamsTopCategoryId > 0) {
			dispatch(addTopSubCateroryId(searchParamsTopCategoryId));
		}
	}, [categoryID]);

	useEffect(() => {
		if (searchParamsTopCategoryId && searchParamsTopCategoryId > 0) {
			dispatch(addTopSubCateroryId(searchParamsTopCategoryId));
		}
	}, [searchParamsTopCategoryId]);

	useEffect(() => {
		if (subCategoriesList.length > 0 && searchParamsTopCategoryId !== null && searchParamsTopCategoryId > 0) {
			setInitialSearchParams(subCategoriesList.filter(item => item.id === searchParamsTopCategoryId));
		}
	}, [subCategoriesList]);

	useEffect(() => {
		if (initialSearchParams && initialSearchParams.length > 0) {
			setSelectedOption(initialSearchParams[0].subCategoryNameUkr)
		}
	}, [initialSearchParams]);

	// const options = ["Option 1", "Option 2", "Option 3"];
	const options: string[] = subCategoriesList.map(item => item.subCategoryNameUkr) || [];

	const handleChange = (event: SelectChangeEvent<string>) => {
		const target: string = event.target.value;
		const arrTopCategorySelect: TopSubCategory[] = subCategoriesList?.filter(item => item.subCategoryNameUkr === target);
		const newIdTopCategory: number = arrTopCategorySelect.length > 0 ? arrTopCategorySelect[0].id : 0;
		dispatch(addTopSubCateroryId(newIdTopCategory));
		setSelectedOption(target);
	};

	return (
		<CommonSelect
			label="Підкатегорія"
			options={options}
			size={{
				//mobile: "0",  0 - якщо не відображається на даному екрані
				mobile: "100%",
				tablet: "45%",
				laptop: "30%"
			}
			}
			outlineColor="blue"
			value={selectedOption}
			onChange={handleChange}
		/>
	);
}

export default TopSubCategoriesSelect;