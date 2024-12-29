'use client';

import { Box, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { addCategory, InitialState } from '@/redux/filters/slice';
import { useState, useEffect } from 'react';
import { Category } from '@/redux/advertisement/slice';
import CategoryItem from "@/types/categoryItemType";

export function CategoryList() {

	const searchParams = useSearchParams() as unknown as Map<keyof InitialState, string | null>;
	const dispatch = useAppDispatch();

	const searchParamsCategoryId: number | null = searchParams.has('categoryId') ? Number(searchParams.get('categoryId')) : null;

	const categoryIdStore: number = useAppSelector((state) => state.filters.categoryId) || 0;

	const [categories, setCategories] = useState<CategoryItem[] | []>([]);
	const [selectedCategory, setSelectedCategory] = useState<number>(0);

	const categoriesList: Category[] | [] = useAppSelector((state) => state.advertisement.category);

	useEffect(() => {
		setCategories(categoriesList);
		if (searchParamsCategoryId && searchParamsCategoryId > 0) {
			setSelectedCategory(searchParamsCategoryId);
		}
	}, [categoriesList]);

	const handleCategoryClick = (id: number) => {
		setSelectedCategory((prev) => (prev === id ? 0 : id));
		dispatch(addCategory(id));
	};

	useEffect(() => {
		if (categoryIdStore && categoryIdStore > 0) {
			setSelectedCategory(categoryIdStore);
		} else {
			setSelectedCategory(0);
		}
	}, [categoryIdStore]);

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
