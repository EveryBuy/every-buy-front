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

	const priceObj: Price = useAppSelector(state => state.filters.limitPrice);

	const searchParams = useSearchParams();
	const dispatch = useAppDispatch();

	const paramsMinPrice: number = searchParams.has('minPrice')
		? Number(searchParams.get('minPrice')) : priceObj.min;
	const paramsMaxPrice: number = searchParams.has('maxPrice')
		? Number(searchParams.get('maxPrice')) : priceObj.max;

	const priceStore = useAppSelector(state => state.filters.price);


	const [price, setPrice] = useState<Price>({
		min: paramsMinPrice,
		max: paramsMaxPrice
	});

	useEffect(() => {
		if (priceStore.min !== price.min || priceStore.max !== price.max) {
			dispatch(addPrice(price));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [inputMin, setInputMin] = useState(paramsMinPrice);
	const [inputMax, setInputMax] = useState(paramsMaxPrice);

	const checkMinMax = (obj: Price): Price => {
		if (obj.min <= obj.max) {
			return obj;
		} else {
			setInputMin(obj.max);
			setInputMax(obj.min);
			return {
				min: obj.max,
				max: obj.min
			}
		}
	}

	const handleChangeMinPrice = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const newValue = Number(event.target.value);
		if (newValue >= 0 && newValue <= priceObj.max) {
			setInputMin(newValue);
		}
	};

	const handleKeyPressMinPrice = (event: React.KeyboardEvent<HTMLInputElement>): void => {
		if (event.key === 'Enter') {
			event.preventDefault();
			const newValue = Number((event.target as HTMLInputElement).value);
			if (newValue >= 0) {
				const targetObj = checkMinMax({
					min: newValue || priceStore.min,
					max: priceStore.max
				});
				setPrice(targetObj);
				dispatch(addPrice(targetObj));
			}
		}
	};

	const handleChangeMaxPrice = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const newValue = Number(event.target.value);
		if (newValue >= 0 && newValue <= priceObj.max) {
			setInputMax(newValue);
		}
	};

	const handleKeyPressMaxPrice = (event: React.KeyboardEvent<HTMLInputElement>): void => {
		if (event.key === 'Enter') {
			event.preventDefault();
			const newValue = Number((event.target as HTMLInputElement).value);
			if (newValue >= 0) {
				const targetObj = checkMinMax({
					min: priceStore.min,
					max: newValue || priceStore.max
				});
				setPrice(targetObj);
				dispatch(addPrice(targetObj));
			}
		}
	};

	useEffect(() => {
		if (!searchParams.get('minPrice') && !searchParams.get('maxPrice')) {
			setPrice({
				...priceObj
			});
			setInputMin(priceObj.min);
			setInputMax(priceObj.max);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [paramsMinPrice, paramsMaxPrice]);

	const handleChangePriceSlider = (event: Event, newValue: number | number[]) => {
		if (Array.isArray(newValue)) {
			const targetObj = {
				min: newValue[0] || price.min,
				max: newValue[1] || price.max
			}
			setInputMin(targetObj.min);
			setInputMax(targetObj.max);
			setPrice(targetObj);
			dispatch(addPrice(targetObj));
		}
	}

	return (
		<Grid2 size={{ xs: 12, sm: 4, md: 4 }} style={{ padding: "0 6px 5px 10px" }}>
			<Typography>Ціна, грн.</Typography>
			<MuiSlider
				value={Object.values(price)}
				valueLabelDisplay='auto'
				getAriaValueText={valuetext}
				min={priceObj.min}
				max={priceObj.max}
				step={50}
				sx={{ color: 'black' }}
				onChange={handleChangePriceSlider}
			/>
			<Box display='flex' gap={1}>
				<BootstrapInput
					variant='outlined'
					size='small'
					value={inputMin}
					style={{ borderRadius: "6px", border: "none", backgroundColor: "#fff" }}
					onChange={handleChangeMinPrice}
					onKeyDown={handleKeyPressMinPrice}
					label='Мін'
				/>
				<BootstrapInput
					variant='outlined'
					size='small'
					value={inputMax}
					style={{ borderRadius: "6px", border: "none", backgroundColor: "#fff" }}
					onChange={handleChangeMaxPrice}
					onKeyDown={handleKeyPressMaxPrice}
					label='Макс'
				/>
			</Box>
		</Grid2 >
	);
}
export default PriceSlider;