'use client';

import React, { FC, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { selectCityList } from "@/redux/advertisement/selectors";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { getCity } from '@/redux/advertisement/operations';
import { addLocation, addRegionId, InitialState } from '@/redux/filters/slice';
import CommonSelect from '@/components/ui/CommonSelect/CommonSelect';
import { SelectChangeEvent } from '@mui/material';
import { CityList } from '@/redux/advertisement/slice';

const CityListSelect: FC = () => {

	const searchParams = useSearchParams() as unknown as Map<keyof InitialState, string | null>;
	const dispatch = useAppDispatch();

	const searchParamsRegionId: number | null = searchParams.has('regionId') ? Number(searchParams.get('regionId')) : null;

	const cityList: CityList[] = useAppSelector(selectCityList);

	const [initialSearchParams, setInitialSearchParams] = useState<CityList[]>([]);
	const [selectedOption, setSelectedOption] = useState<string>("");

	useEffect(() => {
		dispatch(getCity());
		if (searchParamsRegionId && searchParamsRegionId > 0) {
			dispatch(addRegionId(searchParamsRegionId));
		} else {
			setInitialSearchParams([]);
			setSelectedOption('');
		}
	}, [searchParamsRegionId]);

	useEffect(() => {
		if (cityList && cityList.length > 0 && searchParamsRegionId && searchParamsRegionId > 0) {
			setInitialSearchParams(cityList.filter(item => item.id === searchParamsRegionId));
			console.log(cityList);
		}

		if (initialSearchParams.length > 0) setSelectedOption(initialSearchParams[0].cityName)
	}, [cityList]);

	// const options = ["Option 1", "Option 2", "Option 3"];
	const options: string[] = cityList.map(item => item.cityName).sort();

	const handleChange = (event: SelectChangeEvent<string>) => {
		const target: string = event.target.value;
		const arrCitySelect: CityList[] = cityList?.filter(item => item.cityName === target);
		const newIdCity: number = arrCitySelect.length > 0 ? arrCitySelect[0].id : 0;
		dispatch(addRegionId(newIdCity));
		dispatch(addLocation(target));
		setSelectedOption(target);
		console.log(newIdCity);
	};

	return (
		<CommonSelect
			label="Розташування"
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

export default CityListSelect;