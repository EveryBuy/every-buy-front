'use client';

import React, { FC, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { selectCategories } from "@/redux/advertisement/selectors";
import { getCategory } from '@/redux/advertisement/operations';
import { addCategory, InitialState, addTopSubCategoryId, addLowSubCategoryId } from '@/redux/filters/slice';
import CommonSelect from '@/components/ui/CommonSelect/CommonSelect';
import { SelectChangeEvent } from '@mui/material';
import { Category } from '@/redux/advertisement/slice';

const CategoriesSelect: FC = () => {

	const searchParams = useSearchParams() as unknown as Map<keyof InitialState, string | null>;
	const dispatch = useAppDispatch();

	const paramsCategoryId: number | null = searchParams.has('categoryId') ? Number(searchParams.get('categoryId')) : null;

	const categoryIdStore: number = useAppSelector((state) => state.filters.categoryId) || 0;

	useEffect(() => {
		dispatch(getCategory());
		if (paramsCategoryId && paramsCategoryId > 0) {
			dispatch(addCategory(paramsCategoryId));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const categoriesList: Category[] = useAppSelector(selectCategories);

	const [initialParams, setInitialParams] = useState<Category[]>([]);
	const [selectedOption, setSelectedOption] = useState<string>("");

	useEffect(() => {
		if (categoriesList.length > 0 && paramsCategoryId !== null && paramsCategoryId > 0) {
			const arrCategory = categoriesList.filter(item => item.id === paramsCategoryId);
			setInitialParams(arrCategory);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categoriesList]);

	useEffect(() => {
		if (initialParams.length > 0) {
			setSelectedOption(initialParams[0].nameUkr)
		}
	}, [initialParams]);

	useEffect(() => {
		dispatch(addTopSubCategoryId(null));
		dispatch(addLowSubCategoryId(null));
		if (categoryIdStore && categoryIdStore > 0 && categoriesList.length > 0) {
			const arrCategoryIdSelect: Category[] = categoriesList?.filter(item => item.id === categoryIdStore);
			if (arrCategoryIdSelect.length > 0) {
				const categoryName: string = arrCategoryIdSelect[0].nameUkr;
				setSelectedOption(categoryName);
			}
		} else {
			setSelectedOption('');
			setInitialParams([]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categoryIdStore]);

	// const options = ["Option 1", "Option 2", "Option 3"];
	const options: string[] = ["Всі категорії", ...categoriesList.map(item => item.nameUkr)];

	const handleChange = (event: SelectChangeEvent<string>) => {
		const target: string = event.target.value;
		const arrCategorySelect: Category[] = categoriesList?.filter(item => item.nameUkr === target);
		const newIdCategory: number = arrCategorySelect.length > 0 ? arrCategorySelect[0].id : 0;
		if (newIdCategory > 0) {
			dispatch(addCategory(newIdCategory));
			setSelectedOption(target);
		} else {
			dispatch(addCategory(null));
		}

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