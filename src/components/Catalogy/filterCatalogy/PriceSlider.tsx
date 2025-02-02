import React, { FC, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { addPrice, Price } from '@/redux/filters/slice';
import {
	Grid2,
	Typography,
	Slider as MuiSlider,
	Box,
	TextField,
} from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';

const BootstrapInput = styled(TextField)(({ theme }) => ({
	'& .MuiInputBase-root': {
		borderRadius: 4,
		border: '1px solid #ced4da',
		fontSize: 14,
		padding: '6px 12px',
		backgroundColor: '#f6f6f6,'
	},
}));

function valuetext(value: number) {
	return `${value} грн`;
}


const PriceSlider: FC = () => {

	const priceObj: Price = {
		min: 0,
		max: 100000
	};

	const searchParams = useSearchParams();
	const dispatch = useAppDispatch();

	const paramsMinPrice: number = searchParams.has('minPrice')
		? Number(searchParams.get('minPrice')) : priceObj.min;
	const paramsMaxPrice: number = searchParams.has('maxPrice')
		? Number(searchParams.get('maxPrice')) : priceObj.max;

	const [price, setPrice] = useState({
		min: paramsMinPrice,
		max: paramsMaxPrice
	});

	useEffect(() => {
		dispatch(addPrice(price));
	}, []);

	useEffect(() => {
		if (!searchParams.get('minPrice') && !searchParams.get('maxPrice')) {
			setPrice({
				...priceObj
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [paramsMinPrice, paramsMaxPrice]);

	const handleChangePriceSlider = (event: Event, newValue: number | number[]) => {
		if (Array.isArray(newValue)) {
			const targetObj = {
				min: newValue[0] || price.min,
				max: newValue[1] || price.max
			}
			setPrice(targetObj);
			dispatch(addPrice(targetObj));
		}
	}

	const handleChangePriceMin = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event && Number(event.target.value) >= 0) {
			const target: number = Number(event.target.value);
			const targetObj = {
				min: target || price.min,
				max: price.max
			}
			setPrice(targetObj);
			dispatch(addPrice(targetObj));
		}
	}
	const handleChangePriceMax = (event: React.ChangeEvent<HTMLInputElement>) => {
		const target: number = Number(event.target.value);
		const targetObj = {
			min: price.min,
			max: target || price.max
		}
		setPrice(targetObj);
		dispatch(addPrice(targetObj));
	}

	return (
		<Grid2 size={{ xs: 12, sm: 4, md: 4 }} style={{ padding: "0 6px 5px 10px" }}>
			<Typography>Ціна</Typography>
			<MuiSlider
				value={Object.values(price)}
				valueLabelDisplay='auto'
				getAriaValueText={valuetext}
				min={priceObj.min}
				max={priceObj.max}
				sx={{ color: 'black' }}
				onChange={handleChangePriceSlider}
			/>
			<Box display='flex' gap={1}>
				<BootstrapInput
					variant='outlined'
					size='small'
					value={price.min}
					style={{ borderRadius: "6px", border: "none", backgroundColor: "#fff" }}
					onChange={handleChangePriceMin}
					label='Мін'
				/>
				<BootstrapInput
					variant='outlined'
					size='small'
					value={price.max}
					style={{ borderRadius: "6px", border: "none", backgroundColor: "#fff" }}
					onChange={handleChangePriceMax}
					label='Макс'
				/>
			</Box>
		</Grid2 >
	);
}
export default PriceSlider;