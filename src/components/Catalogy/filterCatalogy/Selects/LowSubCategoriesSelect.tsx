'use client';

import React, { FC, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { selectLowSubCategories } from "@/redux/advertisement/selectors";
import { LowSubCategory } from '@/redux/advertisement/slice';
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { addLowSubCategoryId, InitialState } from '@/redux/filters/slice';
import { getLowSubCategory } from '@/redux/advertisement/operations';
import CommonSelect from '@/components/ui/CommonSelect/CommonSelect';
import { SelectChangeEvent } from '@mui/material';

const LowSubCategoriesSelect: FC = () => {
	const searchParams = useSearchParams() as unknown as Map<keyof InitialState, string | null>;
	const dispatch = useAppDispatch();

	const categoryID: number | null = useAppSelector(state => state.filters.categoryId) || null;
	const topCategoryID: number | null = useAppSelector(state => state.filters.topSubCateroryId) || null;
	const searchParamsLowCategoryId: number | null = searchParams.has('lowSubCategoryId') ? Number(searchParams.get('lowSubCategoryId')) : null;

	const lowSubCategoriesList: LowSubCategory[] = useAppSelector(selectLowSubCategories);

	const [initialSearchParams, setInitialSearchParams] = useState<LowSubCategory[]>([]);
	const [selectedOption, setSelectedOption] = useState<string>("");

	useEffect(() => {
		setSelectedOption('');
		dispatch(addLowSubCategoryId(null));
		if (topCategoryID && topCategoryID > 0) {
			dispatch(getLowSubCategory(topCategoryID));
		}
	}, [topCategoryID]);

	useEffect(() => {
		if (searchParamsLowCategoryId && searchParamsLowCategoryId > 0) {
			dispatch(addLowSubCategoryId(searchParamsLowCategoryId));
		}
	}, [searchParamsLowCategoryId]);


	useEffect(() => {
		if (lowSubCategoriesList.length > 0 && searchParamsLowCategoryId !== null && searchParamsLowCategoryId > 0) {
			setInitialSearchParams(lowSubCategoriesList.filter(item => item.id === searchParamsLowCategoryId));
		}
	}, [lowSubCategoriesList]);

	useEffect(() => {
		if (initialSearchParams.length > 0) {
			setSelectedOption(initialSearchParams[0].subCategoryNameUkr);
		}
	}, [initialSearchParams]);

	useEffect(() => {
		setSelectedOption('');
		setInitialSearchParams([]);
	}, [categoryID]);

	// const options = ["Option 1", "Option 2", "Option 3"];
	const options: string[] = lowSubCategoriesList.map(item => item.subCategoryNameUkr);

	const handleChange = (event: SelectChangeEvent<string>) => {
		const target: string = event.target.value;
		const arrLowCategorySelect: LowSubCategory[] = lowSubCategoriesList?.filter(item => item.subCategoryNameUkr === target);
		const newIdLowCategory: number = arrLowCategorySelect.length > 0 ? arrLowCategorySelect[0].id : 0;
		dispatch(addLowSubCategoryId(newIdLowCategory));
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

export default LowSubCategoriesSelect;