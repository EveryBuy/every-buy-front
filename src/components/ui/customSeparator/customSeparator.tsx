'use client';

import { Breadcrumbs, Typography, Link, Stack } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { CategoryBreadcrumbType } from '@/types/categoryBreadcrumbType';

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
	// event.preventDefault();
	// console.info('You clicked a breadcrumb.');
}

// for category link={`/catalogy?categoryId=${category.id}`}
// for topSubCategory link={`/catalogy?categoryId=${categoryId}&topSubCategoryId=${topSubCategory.id}`
// for lowSubCategory link={`/catalogy?categoryId=${categoryId}&topSubCategoryId=${topSubCategoryId}&lowSubCategoryId=${lowSubCategory.id}`

type Props = {
	category: CategoryBreadcrumbType | null,
	topSubCategory: CategoryBreadcrumbType | null,
	lowSubCategory: CategoryBreadcrumbType | null,
}

export function CustomSeparator(props: Props) {
	const breadcrumbs = [
		<Link
			underline='hover'
			key='1'
			color='#9D9D9D'
			href='/'
			onClick={handleClick}
		>
			Головна
		</Link>,
		<Link
			underline='hover'
			key='2'
			color='#9D9D9D'
			href={props.category?.link || '/'}
			onClick={handleClick}
		>
			{props.category?.id ? props.category?.title : "Усі категорії"}
		</Link>,
	];

	if (props.topSubCategory && props.topSubCategory.id) {
		breadcrumbs.push(
			<Link
				underline='hover'
				key='3'
				color='#9D9D9D'
				href={props.topSubCategory.link}
				onClick={handleClick}
			>
				{props.topSubCategory.title}
			</Link>
		);
	}

	if (props.lowSubCategory && props.lowSubCategory.id) {
		breadcrumbs.push(
			<Link
				underline='hover'
				key='4'
				color='#9D9D9D'
				href={props.lowSubCategory.link}
				onClick={handleClick}
			>
				{props.lowSubCategory.title}
			</Link>
		);
	}

	return (
		<Stack spacing={1} sx={{ maxWidth: "95%" }}>
			<Breadcrumbs
				separator={<NavigateNextIcon fontSize='small' />}
				aria-label='breadcrumb'
			>
				{breadcrumbs}
			</Breadcrumbs>
		</Stack>
	);
}
