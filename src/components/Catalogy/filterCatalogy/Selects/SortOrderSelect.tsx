'use client';

import React, { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch } from "@/redux/store";
import { SortOrder, addSortOrder } from '@/redux/filters/slice';
import CommonSelect from '@/components/ui/CommonSelect/CommonSelect';
import { SelectChangeEvent } from '@mui/material';

type sortOrderListType = {
	type: SortOrder,
	title: string
}

const SortOrderSelection: FC = () => {

	const sortOrderList: sortOrderListType[] = [
		{
			type: "ASC",
			title: "Від дешевих до дорогих"
		},
		{
			type: "DESC",
			title: "Від дорогих до дешевих"
		}
	];

	const searchParams = useSearchParams();
	const dispatch = useAppDispatch();

	const searchParamsSort: string | null = searchParams.has('sortOrder') ? searchParams.get('sortOrder') : '';
	const initialSearchParams: sortOrderListType[] | [] = searchParamsSort && searchParamsSort.length > 0
		? sortOrderList.filter(item => item.type === searchParamsSort) : [];

	const [selectedOption, setSelectedOption] = useState(
		initialSearchParams.length > 0 ? initialSearchParams[0].title : ""
	);

	useEffect(() => {
		if (searchParamsSort && searchParamsSort !== '') {
			dispatch(addSortOrder(searchParamsSort));
		} else {
			setSelectedOption('');
		}
	}, [searchParamsSort]);

	const options: string[] = sortOrderList.map(item => item.title);

	const handleChange = (event: SelectChangeEvent<string>) => {
		const target: string = event.target.value;
		const arrSortSelect: sortOrderListType[] = sortOrderList?.filter(item => item.title === target);
		const newTypeSort: string = arrSortSelect.length > 0 ? arrSortSelect[0].type : "";
		dispatch(addSortOrder(newTypeSort));
		setSelectedOption(target);
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