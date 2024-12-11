'use client';

import React, { FC, useState, useEffect } from 'react';
import { useAppDispatch } from "@/redux/store";
import { addProductType } from '@/redux/filters/slice';
import CommonSelect from '@/components/ui/CommonSelect/CommonSelect';
import { SelectChangeEvent } from '@mui/material';
import { ProductType } from '@/redux/filters/slice';

type productListType = {
	type: "NEW" | "USED" | "OTHER",
	title: string
}

const ProductTyperSelection: FC = () => {
	const [selectedOption, setSelectedOption] = useState("");

	const productTypeList: productListType[] = [
		{
			type: "NEW",
			title: "Новий"
		},
		{
			type: "USED",
			title: "Вживаний"
		},
		{
			type: "OTHER",
			title: "Інше"
		},
	]

	const dispatch = useAppDispatch();

	const options: string[] = productTypeList.map(item => item.title);

	const handleChange = (event: SelectChangeEvent<string>) => {
		const target: string = event.target.value;
		const arrProductTypeSelect: productListType[] = productTypeList?.filter(item => item.title === target);
		const newProductType: string = arrProductTypeSelect.length > 0 ? arrProductTypeSelect[0].type : '';
		dispatch(addProductType(newProductType));
		setSelectedOption(target);
		console.log(newProductType);
	};

	return (
		<CommonSelect
			label="Стан"
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

export default ProductTyperSelection;