'use client';

import React, { FC, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch } from "@/redux/store";
import { ProductType, addProductType, InitialState } from '@/redux/filters/slice';
import CommonSelect from '@/components/ui/CommonSelect/CommonSelect';
import { SelectChangeEvent } from '@mui/material';

type productListType = {
	type: ProductType | "OTHER",
	title: string
}

type ProductItemType = ProductType | "OTHER" | "";

const ProductTyperSelection: FC = () => {

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

	const searchParams = useSearchParams() as unknown as Map<keyof InitialState, string | null>;
	const dispatch = useAppDispatch();

	const searchParamsType: string | null | undefined = searchParams.has('productType')
		? searchParams.get('productType') : '';

	const initialSearchParams: productListType[] = searchParamsType && searchParamsType.length > 0
		? productTypeList.filter(item => item.type === searchParamsType) : [];

	const [selectedOption, setSelectedOption] = useState<string>(
		initialSearchParams.length > 0 ? initialSearchParams[0]?.title : ""
	);

	useEffect(() => {
		if (searchParamsType && searchParamsType !== "") {
			dispatch(addProductType(searchParamsType));
		} else {
			setSelectedOption('');
		}
	}, [searchParamsType]);

	const options: string[] = productTypeList.map(item => item.title);

	const handleChange = (event: SelectChangeEvent<string>) => {
		const target: string = event.target.value;
		const arrProductTypeSelect: productListType[] = productTypeList?.filter(item => item.title === target);
		const newProductType: string = arrProductTypeSelect.length > 0 ? arrProductTypeSelect[0].type : '';
		dispatch(addProductType(newProductType));
		setSelectedOption(target);
	};

	return (
		<CommonSelect
			label="Стан"
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

export default ProductTyperSelection;