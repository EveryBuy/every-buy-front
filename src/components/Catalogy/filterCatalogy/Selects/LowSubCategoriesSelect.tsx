'use client';

import React, { FC, useState, useEffect } from 'react';
import { selectLowSubCategories } from "@/redux/advertisement/selectors";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { getLowSubCategory } from '@/redux/advertisement/operations';
import CommonSelect from '@/components/ui/CommonSelect/CommonSelect';
import { SelectChangeEvent } from '@mui/material';
import { LowSubCategory } from '@/redux/advertisement/slice';

const LowSubCategoriesSelect: FC | void = () => {
	const [selectedOption, setSelectedOption] = useState("");

	const subCategoryID: number = useAppSelector(state => state.filters.subcategoryId) || 0;

	const dispatch = useAppDispatch();
	const lowSubCategoriesList: LowSubCategory[] = useAppSelector(selectLowSubCategories);
	console.log(lowSubCategoriesList);

	// const options = ["Option 1", "Option 2", "Option 3"];
	const options: string[] = lowSubCategoriesList.map(item => item.subCategoryNameUkr);

	useEffect(() => {
		dispatch(getLowSubCategory(subCatelogyID));
	}, [subCategoryID]);

	const handleChange = (event: SelectChangeEvent<string>) => {
		const target: string = event.target.value;
		const arrLowCategorySelect: LowSubCategory[] = lowSubCategoriesList?.filter(item => item.subCategoryNameUkr === target);
		const newIdLowCategory: number = arrLowCategorySelect.length > 0 ? arrLowCategorySelect[0].id : 0;
		// dispatch(addSubCategory(arrLowCategorySelect));
		setSelectedOption(target);
		console.log(newIdLowCategory);
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