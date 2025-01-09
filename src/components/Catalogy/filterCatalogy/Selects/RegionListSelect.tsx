'use client';

import React, { FC, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch } from "@/redux/store";
import { addRegionId, InitialState } from '@/redux/filters/slice';
import CommonSelect from '@/components/ui/CommonSelect/CommonSelect';
import { SelectChangeEvent } from '@mui/material';
import regionList from '@/assets/regionList.json';

type RegionListType = {
	id: number,
	regionName: string
}

const RegionListSelect: FC = () => {

	const searchParams = useSearchParams() as unknown as Map<keyof InitialState, string | null>;
	const dispatch = useAppDispatch();

	const paramsRegionId: number | null = searchParams.has('regionId') ? Number(searchParams.get('regionId')) : null;

	const initialParams: RegionListType[] = paramsRegionId && paramsRegionId > 0
		? regionList.filter(item => item.id === paramsRegionId) : [];

	const [selectedOption, setSelectedOption] = useState<string>(
		initialParams.length > 0 ? initialParams[0]?.regionName : ""
	);

	useEffect(() => {
		if (paramsRegionId && paramsRegionId > 0) {
			dispatch(addRegionId(paramsRegionId));
		} else {
			setSelectedOption('');
		}
	}, [paramsRegionId]);

	// const options = ["Option 1", "Option 2", "Option 3"];
	const options: string[] = regionList.map(item => item.regionName).sort();

	const handleChange = (event: SelectChangeEvent<string>) => {
		const target: string = event.target.value;
		const arrRegoinSelect: RegionListType[] = regionList?.filter(item => item.regionName === target);
		const newIdRegion: number = arrRegoinSelect.length > 0 ? arrRegoinSelect[0].id : 0;
		dispatch(addRegionId(newIdRegion));
		setSelectedOption(target);
	};

	return (
		<CommonSelect
			label="Область"
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

export default RegionListSelect;