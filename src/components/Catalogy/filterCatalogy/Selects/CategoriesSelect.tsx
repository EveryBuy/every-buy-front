'use client';

import React, { FC, useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { selectCategories } from "@/redux/advertisement/selectors";
import { getCategory } from '@/redux/advertisement/operations';
import { addCategory } from '@/redux/filters/slice';
import CommonSelect from '@/components/ui/CommonSelect/CommonSelect';
import { SelectChangeEvent } from '@mui/material';
import { Category } from '@/redux/advertisement/slice';

const CategoriesSelect: FC = () => {

	const [selectedOption, setSelectedOption] = useState("");
	const categoriesList: Category[] = useAppSelector(selectCategories);

	// const options = ["Option 1", "Option 2", "Option 3"];
	const options: string[] = categoriesList.map(item => item.nameUkr);

	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(getCategory());
	}, []);

	const handleChange = (event: SelectChangeEvent<string>) => {
		const target: string = event.target.value;
		const arrCategorySelect: Category[] = categoriesList?.filter(item => item.nameUkr === target);
		const newIdCategory: number = arrCategorySelect.length > 0 ? arrCategorySelect[0].id : 0;
		dispatch(addCategory(newIdCategory));
		setSelectedOption(target);
		console.log(newIdCategory);
	};

	return (
		<CommonSelect
			label="Категорія"
			options={options}
			size={{
				//mobile: "0",  0 - якщо не відображається на даному екрані
				mobile: "100%",
				tablet: "45%",
				laptop: "30%"
			}}
			outlineColor="blue"
			value={selectedOption}
			onChange={handleChange}
		/>
	);
}

export default CategoriesSelect;