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
	const paramsLowCategoryId: number | null = searchParams.has('lowSubCategoryId') ? Number(searchParams.get('lowSubCategoryId')) : null;

	const lowSubCategoriesList: LowSubCategory[] = useAppSelector(selectLowSubCategories);

	const [initialParams, setInitialParams] = useState<LowSubCategory[]>([]);
	const [selectedOption, setSelectedOption] = useState<string>("");

	useEffect(() => {
		setSelectedOption('');
		dispatch(addLowSubCategoryId(null));
		if (topCategoryID && topCategoryID > 0) {
			dispatch(getLowSubCategory(topCategoryID));
		}
	}, [topCategoryID]);

	useEffect(() => {
		if (paramsLowCategoryId && paramsLowCategoryId > 0) {
			dispatch(addLowSubCategoryId(paramsLowCategoryId));
		}
	}, [paramsLowCategoryId]);


	useEffect(() => {
		if (lowSubCategoriesList.length > 0 && paramsLowCategoryId !== null && paramsLowCategoryId > 0) {
			setInitialParams(lowSubCategoriesList.filter(item => item.id === paramsLowCategoryId));
		}
	}, [lowSubCategoriesList]);

	useEffect(() => {
		if (initialParams.length > 0) {
			setSelectedOption(initialParams[0].subCategoryNameUkr);
		}
	}, [initialParams]);

	useEffect(() => {
		setSelectedOption('');
		setInitialParams([]);
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
				tablet: "30%",
				laptop: "22%"
			}
			}
			outlineColor="blue"
			value={selectedOption}
			onChange={handleChange}
		/>
	);
}

export default LowSubCategoriesSelect;