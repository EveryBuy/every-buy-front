'use client';

import React, { FC, useState, useEffect } from 'react';
import { selectCityList } from "@/redux/advertisement/selectors";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { getCity } from '@/redux/advertisement/operations';
import { addLocation } from '@/redux/filters/slice';
import CommonSelect from '@/components/ui/CommonSelect/CommonSelect';
import { SelectChangeEvent } from '@mui/material';
import { CityList } from '@/redux/advertisement/slice';

const CityListSelect: FC = () => {
	const [selectedOption, setSelectedOption] = useState("");
	const cityList: CityList[] = useAppSelector(selectCityList);

	// const options = ["Option 1", "Option 2", "Option 3"];
	const options: string[] = cityList.map(item => item.cityName).sort();

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getCity());
	}, []);

	const handleChange = (event: SelectChangeEvent<string>) => {
		const target: string = event.target.value;
		const arrCitySelect: CityList[] = cityList?.filter(item => item.cityName === target);
		const newIdCity: number = arrCitySelect.length > 0 ? arrCitySelect[0].id : 0;
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
				tablet: "45%",
				laptop: "30%"
			}}
			outlineColor="blue"
			value={selectedOption}
			onChange={handleChange}
		/>
	);
}

export default CityListSelect;