'use client';

import { Box, Typography } from '@mui/material';
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { addCategory, InitialState } from '@/redux/filters/slice';
import { useState, useEffect } from 'react';
import { Category } from '@/redux/advertisement/slice';
import CategoryItem from "@/types/categoryItemType";

export function CategoryList() {

	const categoryIdStore: number = useAppSelector((state) => state.filters.categoryId) || 0;

	const [categories, setCategories] = useState<CategoryItem[] | []>([]);
	const [selectedCategory, setSelectedCategory] = useState<number>(0);

	const dispatch = useAppDispatch();

	const categoriesList: Category[] | [] = useAppSelector((state) => state.advertisement.category);

	useEffect(() => {
		setCategories(categoriesList);
		setSelectedCategory(categoryIdStore);
	}, [categoriesList]);

	useEffect(() => {
		setSelectedCategory(categoryIdStore);
	}, [categoryIdStore]);

	const handleCategoryClick = (id: number) => {
		setSelectedCategory((prev) => (prev === id ? 0 : id));
		dispatch(addCategory(id));
	};

	return (
		<Box
			display='flex'
			flexWrap='wrap'
			gap={2}
			mt={3}
			mb={3}
		>
			{categories.map(({ id, nameUkr }) => (
				<Typography
					key={id}
					variant='body2'
					fontSize='1rem'
					mr={2}
					onClick={() => handleCategoryClick(id)}
					sx={{
						color:
							selectedCategory === id ? '#000' : '#9D9D9D',
						// fontWeight:
						//     selectedCategory === category ? 'bold' : 'normal',
						cursor: 'pointer',
						'&:hover': {
							color: '#000',
						},
						transition: 'color 0.3s ease',
					}}
				>
					{nameUkr}
				</Typography>
			))}
		</Box>
	);
}
