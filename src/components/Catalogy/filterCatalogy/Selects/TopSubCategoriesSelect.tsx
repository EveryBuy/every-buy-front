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
	const paramsTopCategoryId: number | null = searchParams.has('topSubCateroryId')
		? Number(searchParams.get('topSubCateroryId')) : null;

	const subCategoriesList: TopSubCategory[] = useAppSelector(selectTopSubCategories);

	const [initialParams, setInitialParams] = useState<TopSubCategory[]>([]);
	const [selectedOption, setSelectedOption] = useState<string>("");

	useEffect(() => {
		setSelectedOption('');
		if (categoryID && categoryID > 0) {
			dispatch(getTopSubCategory(categoryID));
		}
		if (paramsTopCategoryId && paramsTopCategoryId > 0) {
			dispatch(addTopSubCateroryId(paramsTopCategoryId));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categoryID]);

	useEffect(() => {
		if (paramsTopCategoryId && paramsTopCategoryId > 0) {
			dispatch(addTopSubCateroryId(paramsTopCategoryId));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [paramsTopCategoryId]);

	useEffect(() => {
		if (subCategoriesList.length > 0 && paramsTopCategoryId !== null && paramsTopCategoryId > 0) {
			setInitialParams(subCategoriesList.filter(item => item.id === paramsTopCategoryId));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [subCategoriesList]);

	useEffect(() => {
		if (initialParams && initialParams.length > 0) {
			setSelectedOption(initialParams[0].subCategoryNameUkr)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialParams]);

	// const options = ["Option 1", "Option 2", "Option 3"];
	const options: string[] = ["Всі підкатегорії", ...subCategoriesList.map(item => item.subCategoryNameUkr)];

	const handleChange = (event: SelectChangeEvent<string>): void => {
		const target: string = event.target.value;
		const arrTopCategorySelect: TopSubCategory[] = subCategoriesList?.filter(item => item.subCategoryNameUkr === target);
		const newIdTopCategory: number = arrTopCategorySelect.length > 0 ? arrTopCategorySelect[0].id : 0;
		if (newIdTopCategory > 0) {
			dispatch(addTopSubCateroryId(newIdTopCategory));
			setSelectedOption(target);
		} else {
			dispatch(addTopSubCateroryId(null));
			setSelectedOption('');
		}
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

export default TopSubCategoriesSelect;