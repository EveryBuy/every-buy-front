'use client';

import React, { useState } from 'react';
import { Grid2, Button } from '@mui/material';
import { FilterConfig } from './CustomSelectProps';
import { CustomSelect } from './customSelect';
import { Slider } from './slider';

export function FilterCatalogySearch() {
	const [price, setPrice] = useState<number[]>([0, 100000]);
	const [sort, setSort] = useState<string>('');
	const [category, setCategory] = useState<string>('');
	const [subcategory, setSubcategory] = useState<string>('');
	const [condition, setCondition] = useState<string>('');
	const [location, setLocation] = useState<string>('');

	const resetFilters = () => {
		setPrice([0, 100000]);
		setSort('');
		setCategory('');
		setSubcategory('');
		setCondition('');
		setLocation('');
	};

	const filterConfigs: FilterConfig[] = [
		{
			label: 'Категорія',
			value: category,
			setter: setCategory,
			options: [
				{ value: 'Категорія', label: 'Мода та стиль' },
				{ value: 'Категорія2', label: 'Мода та жах' },
			],
		},
		{
			label: 'Сортувати за',
			value: sort,
			setter: setSort,
			options: [{ value: 'Сортувати за', label: 'Рекомендоване' }],
		},
		{
			label: 'Підкатегорії',
			value: subcategory,
			setter: setSubcategory,
			options: [{ value: 'Підкатегорії', label: 'Жіночій одяг' }],
		},
		{
			label: 'Стан',
			value: condition,
			setter: setCondition,
			options: [{ value: 'Стан', label: 'Всі оголошення' }],
		},
		{
			label: 'Розташування',
			value: location,
			setter: setLocation,
			options: [{ value: 'Розташування', label: 'Вся Країна' }],
		},
	];

	return (
		<Grid2 container spacing={2} alignItems='center'>
			<Slider price={price} setPrice={setPrice} />
			{filterConfigs.map((config, index) => (
				<Grid2 key={index} size={{ xs: 12, sm: 6, md: 4 }}>
					<CustomSelect
						label={config.label}
						value={config.value}
						onChange={(e) =>
							config.setter(e.target.value as string)
						}
						options={config.options}
					/>
				</Grid2>
			))}
			<Grid2
				size={{ xs: 12 }}
				sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}
			>
				<Button
					variant='outlined'
					onClick={resetFilters}
					sx={{ border: 'none', color: 'black', fontWeight: '500', fontSize: '20px' }}
				>
					Скинути фільтри
				</Button>
			</Grid2>
		</Grid2>
	);
}
