'use client';

import React, { FC, useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { selectTopSubCategories } from "@/redux/advertisement/selectors";
import { TopSubCategory } from '@/redux/advertisement/slice';
import { getTopSubCategory } from '@/redux/advertisement/operations';
import { addSubCategory } from '@/redux/filters/slice';
import CommonSelect from '@/components/ui/CommonSelect/CommonSelect';
import { SelectChangeEvent } from '@mui/material';

const TopSubCategoriesSelect: FC = () => {
	const [selectedOption, setSelectedOption] = useState("");

	const categoryID: number = useAppSelector(state => state.filters.categoryId) || 0;

	const dispatch = useAppDispatch();
	const subCategoriesList: TopSubCategory[] = useAppSelector(selectTopSubCategories);

	// const options = ["Option 1", "Option 2", "Option 3"];
	const options: string[] = subCategoriesList.map(item => item.subCategoryNameUkr) || [];

	useEffect(() => {
		dispatch(getTopSubCategory(categoryID));
	}, [categoryID]);

	const handleChange = (event: SelectChangeEvent<string>) => {
		const target: string = event.target.value;
		const arrTopCategorySelect: TopSubCategory[] = subCategoriesList?.filter(item => item.subCategoryNameUkr === target);
		const newIdTopCategory: number = arrTopCategorySelect.length > 0 ? arrTopCategorySelect[0].id : 0;
		dispatch(addSubCategory(newIdTopCategory));
		setSelectedOption(target);
		console.log(newIdTopCategory);
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