'use client';

import React, { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch } from "@/redux/store";
import { SortOrder, addSortOrder, InitialState } from '@/redux/filters/slice';
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

	const searchParams = useSearchParams() as unknown as Map<keyof InitialState, string | null>;
	const dispatch = useAppDispatch();

	const paramsSort: SortOrder | "" = searchParams.has('sortOrder') ? searchParams.get('sortOrder') : "";
	const initialParams: sortOrderListType[] = paramsSort && paramsSort.length > 0
		? sortOrderList.filter(item => item.type === paramsSort) : [];

	const [selectedOption, setSelectedOption] = useState<string>(
		initialParams.length > 0 ? initialParams[0].title : ""
	);

	useEffect(() => {
		if (paramsSort && paramsSort.length > 0) {
			dispatch(addSortOrder(paramsSort));
		} else {
			setSelectedOption('');
		}
	}, [paramsSort]);

	const options: string[] = sortOrderList.map(item => item.title);

	const handleChange = (event: SelectChangeEvent<string>) => {
		const target: string = event.target.value;
		const arrSortSelect: sortOrderListType[] = sortOrderList?.filter(item => item.title === target);
		const newTypeSort: SortOrder | "" = arrSortSelect.length > 0 ? arrSortSelect[0].type : "";
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
				tablet: "30%",
				laptop: "22%"
			}}
			outlineColor="blue"
			value={selectedOption}
			onChange={handleChange}
		/>
	);
}

export default SortOrderSelection;