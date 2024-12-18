import React, { FC, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch } from "@/redux/store";
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

	const searchParamsMinPrice: number = searchParams.has('minPrice')
		? Number(searchParams.get('minPrice')) : priceObj.min;
	const searchParamsMaxPrice: number = searchParams.has('maxPrice')
		? Number(searchParams.get('maxPrice')) : priceObj.max;

	const [price, setPrice] = useState({
		min: searchParamsMinPrice,
		max: searchParamsMaxPrice
	});

	useEffect(() => {
		dispatch(addPrice(price));
	}, []);

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
		const target: number = Number(event.target.value);
		const targetObj = {
			min: target || price.min,
			max: price.max
		}
		setPrice(targetObj);
		dispatch(addPrice(targetObj));
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
		<Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
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
					onChange={handleChangePriceMin}
					label='Мін'
				/>
				<BootstrapInput
					variant='outlined'
					size='small'
					value={price.max}
					onChange={handleChangePriceMax}
					label='Макс'
				/>
			</Box>
		</Grid2>
	);
}
export default PriceSlider;