'use client';

import React, { FC, useState, useEffect } from 'react';
import { useAppDispatch } from "@/redux/store";
import { addSortOrder } from '@/redux/filters/slice';
import CommonSelect from '@/components/ui/CommonSelect/CommonSelect';
import { SelectChangeEvent } from '@mui/material';


type sortOrderType = {
	type: "ASC" | "DESC",
	title: string
}

const SortOrderSelection: FC = () => {
	const [selectedOption, setSelectedOption] = useState("");

	const sortOrderList: sortOrderType[] = [
		{
			type: "ASC",
			title: "Від дешевих до дорогих"
		},
		{
			type: "DESC",
			title: "Від дорогих до дешевих"
		}
	];

	const dispatch = useAppDispatch();

	const options: string[] = sortOrderList.map(item => item.title);

	const handleChange = (event: SelectChangeEvent<string>) => {
		const target: string = event.target.value;
		const arrSortSelect: sortOrderType[] = sortOrderList?.filter(item => item.title === target);
		console.log(arrSortSelect);
		const newTypeSort: string = arrSortSelect.length > 0 ? arrSortSelect[0].type : '';
		dispatch(addSortOrder(newTypeSort));
		setSelectedOption(target);
		console.log(newTypeSort);
	};

	return (
		<CommonSelect
			label="Сортувати за"
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

export default SortOrderSelection;