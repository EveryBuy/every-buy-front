'use client';

import React, { FC, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { addLocation, addCityId, InitialState } from '@/redux/filters/slice';
import CommonSelect from '@/components/ui/CommonSelect/CommonSelect';
import { SelectChangeEvent } from '@mui/material';
import { City } from '@/redux/advertisement/slice';
import cityList from '@/assets/cityList.json';

const CityListSelect: FC = () => {

	const searchParams = useSearchParams() as unknown as Map<keyof InitialState, string | null>;
	const dispatch = useAppDispatch();

	const regionId: number | null = useAppSelector(state => state.filters.regionId);

	const paramsCityId: number | null = searchParams.has('cityId') && regionId !== null
		? Number(searchParams.get('cityId'))
		: null;

	const initialParams: City[] = paramsCityId && paramsCityId > 0
		? cityList.filter(item => item.id === paramsCityId) : [];

	const [cityListForRegion, setCityListForRegion] = useState<City[]>(
		regionId && regionId > 0 ? cityList.filter(item => item.region.id === regionId) : []
	);
	const [selectedOption, setSelectedOption] = useState<string>("");

	useEffect(() => {
		if (paramsCityId && paramsCityId > 0) {
			setSelectedOption(initialParams[0]?.cityName);
			dispatch(addCityId(paramsCityId));
		} else {
			setSelectedOption('');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [paramsCityId]);

	useEffect(() => {
		if (regionId && regionId > 0) {
			const newList: City[] = cityList.filter(item => item.region.id === regionId);
			setCityListForRegion(newList);
		}
		setSelectedOption('');
		dispatch(addCityId(null));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [regionId]);

	// const options = ["Option 1", "Option 2", "Option 3"];
	const options: string[] = ["Всі міста", ...cityListForRegion.map(item => item.cityName).sort()];

	const handleChange = (event: SelectChangeEvent<string>): void => {
		const target: string = event.target.value;
		const arrCitySelect: City[] = cityListForRegion?.filter(item => item.cityName === target);
		const newIdCity: number = arrCitySelect.length > 0 ? arrCitySelect[0].id : 0;
		if (newIdCity > 0) {
			dispatch(addCityId(newIdCity));
			// dispatch(addLocation(target));
			setSelectedOption(target);
		} else {
			dispatch(addCityId(null));
		}
	};

	return (
		<CommonSelect
			label="Месцезнаходження"
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