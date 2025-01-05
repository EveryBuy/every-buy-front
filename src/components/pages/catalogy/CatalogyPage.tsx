'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { getFilteredAdverts } from '@/redux/advertisement/operations';
import { useRouter } from 'next/navigation';
import { addKeyWord, resetFilters, InitialState } from '@/redux/filters/slice';

import { CatalogyCard } from "../../Catalogy/cardCatalogy/CatalogyCard";
import { Container, Box, Typography } from '@mui/material';
import {
	CustomSeparator,
	FilterCatalogySearch,
	CategoryList,
	Search,
} from '@/components';
import Image from 'next/image';
import imgSearchEmpty from '@/assets/Svg/searchEmpty.svg';
// import { searchGoods } from '@/mock-data/searchGoods';

type createQuerySettingsType = {
	queryString: string,
	queryObj: Object
}

const styles = {
	display: 'flex',
	flexDirection: 'column',
};

export const CatalogyPage = () => {

	const dispatch = useAppDispatch();
	const searchParams = useSearchParams() as unknown as Map<keyof InitialState, string | null>;

	const [isListOpen, setListOpen] = useState<boolean>(false);
	const [dataArray, setDataArray] = useState([]);
	const [loading, setLoading] = useState<boolean>(false);
	// const wordSearch = searchParams.get('keyword') ? searchParams.get('keyword') : "";
	// const [word, setWord] = useState<string | null>(wordSearch);

	const makeLinkOpen = () => {
		setListOpen((prev) => !prev);
	};

	const router = useRouter();

	const filtersSetting = useAppSelector(state => state.filters);
	const {
		categoryId,
		price: {
			max: maxPrice,
			min: minPrice,
		},
		sortOrder,
		regionId,
		topSubCateroryId,
		lowSubCategoryId,
		productType,
		keyword,
		page
	} = filtersSetting;


	const createQuerySettings = (): createQuerySettingsType => {
		let queryArray: string[] = [];
		if (categoryId !== null) queryArray.push(`categoryId=${categoryId}`);
		if (minPrice !== 0) queryArray.push(`minPrice=${minPrice}`);
		if (maxPrice !== 100000) queryArray.push(`maxPrice=${maxPrice}`);
		if (sortOrder !== "") queryArray.push(`sortOrder=${sortOrder}`);
		if (regionId !== null) queryArray.push(`regionId=${regionId}`);
		if (topSubCateroryId !== null) queryArray.push(`topSubCategoryId=${topSubCateroryId}`);
		if (lowSubCategoryId !== null) queryArray.push(`lowSubCategoryId=${lowSubCategoryId}`);
		if (productType !== "") queryArray.push(`productType=${productType}`);
		if (keyword !== "") queryArray.push(`keyword=${keyword}`);
		if (page !== 1) queryArray.push(`page=${page}`);

		const queryString: string = queryArray.length > 0 ? "?" + queryArray.join('&') : "";
		console.log(queryString);
		let queryObj: {} = queryArray.reduce((obj, item) => {
			const itemArr = item.split("=");
			const valueNumber = Number.isNaN(Number(itemArr[1])) ? itemArr[1] : Number(itemArr[1]);
			const newQueryObj = {
				[itemArr[0]]: valueNumber
			};
			return Object.assign(obj, newQueryObj);
		}, {});
		console.log(queryObj);
		return {
			queryString: queryString,
			queryObj: queryObj
		};
	}

	useEffect(() => {
		setLoading(false);
		console.log('query');
		const { queryString, queryObj } = createQuerySettings();
		if (queryString.length > 0) {
			dispatch(getFilteredAdverts(queryObj))
				.then((data) => {
					console.log(data.payload);
					if (data && data.payload.length > 0) {
						setDataArray(data.payload);
					} else {
						setDataArray([]);
						console.log('not data');
					}
				});
			setLoading(true);
			setTimeout(() => {
				router.push(`${queryString}`, {
					scroll: false,
				});
			}, 0);
		} else {
			setDataArray([]);
		}

	}, [filtersSetting, router]);  //min, max, categoryId, sortOrder, productType, ...

	const handlerResetFilters = () => {
		dispatch(resetFilters());

		setTimeout(() => {
			router.push(`/catalogy`, {
				scroll: false,
			});
		}, 0);
	};

	return (
		<Container sx={{ marginTop: '1rem' }}>
			<Box className='custom-separator' maxWidth={'sm'}>
				<CustomSeparator category="Moda" />
			</Box>
			<Box sx={{ margin: "2em 1em" }}>
				<Search hideSuggest={true} />
			</Box>
			<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: "center", margin: '2.5rem 0' }}>
				<Typography variant='h3' sx={{ fontSize: '2.3em' }}>
					Фільтри
				</Typography>
				<Typography variant='h3'
					sx={{ fontSize: '1em', cursor: "pointer" }}
					onClick={makeLinkOpen}>
					{isListOpen ? "Згорнути" : "Розгорнути"}
				</Typography>
			</Box>
			<Box className={isListOpen ? styles : "hidden"}>
				<FilterCatalogySearch heandlerClick={handlerResetFilters} />
			</Box>

			<CategoryList />
			{
				!loading
					? <div>Зачекайте ...</div>
					: dataArray.length > 0
						? <><Typography variant='h3' sx={{ margin: '1rem 0 2.3rem', fontSize: '2.3em' }}>
							Ми знайшли понад 1000 оголошень
						</Typography>
							<CatalogyCard item={dataArray} />
						</>
						: <Box sx={{ margin: "52px 2em 0", textAlign: "center" }}>
							<Typography sx={{ fontSize: '2em', marginBottom: "60px" }}>
								Нажаль ми не знайшли жодного оголошення за вашим запитом.
							</Typography>
							<Image
								src={imgSearchEmpty}
								width={288}
								height={350}
								alt="не має оголошення"
							/>
							<Typography sx={{ fontSize: '2em', marginTop: "60px" }}>
								Перевірте правильність запиту <br />
								або оберіть будь-яку категорію для перегляду оголошень.
							</Typography>
						</Box>
			}
		</Container>
	);
}