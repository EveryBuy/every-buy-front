'use client';

import React, { FC, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch } from "@/redux/store";
import { ProductType, addProductType, InitialState } from '@/redux/filters/slice';
import CommonSelect from '@/components/ui/CommonSelect/CommonSelect';
import { SelectChangeEvent } from '@mui/material';

type productListType = {
	type: ProductType,
	title: string
}

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

	const paramsType: string | null | undefined = searchParams.has('productType')
		? searchParams.get('productType') : "";

	const initialParams: productListType[] = paramsType && paramsType.length > 0
		? productTypeList.filter(item => item.type === paramsType) : [];

	const [selectedOption, setSelectedOption] = useState<string>(
		initialParams.length > 0 ? initialParams[0]?.title : ""
	);

	useEffect(() => {
		if (paramsType && paramsType !== "") {
			const checkTypeObj: productListType | undefined = productTypeList.find(item => item.type === paramsType);
			if (checkTypeObj) {
				const params: ProductType = checkTypeObj.type;
				dispatch(addProductType(params));
			}
		} else {
			setSelectedOption('');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [paramsType]);

	const options: string[] = ["Всі оголошення", ...productTypeList.map(item => item.title)];

	const handleChange = (event: SelectChangeEvent<string>) => {
		const target: string = event.target.value;
		const arrProductTypeSelect: productListType[] = productTypeList?.filter(item => item.title === target);
		const newProductType: ProductType | "" = arrProductTypeSelect.length > 0
			? arrProductTypeSelect[0].type : "";
		if (newProductType.length > 0) {
			setSelectedOption(target);
			dispatch(addProductType(newProductType));
		} else {
			setSelectedOption('');
			dispatch(addProductType(''));
		}
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