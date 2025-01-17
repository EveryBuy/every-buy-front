'use client';

import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { getFilteredAdverts } from '@/redux/advertisement/operations';
import { useRouter } from 'next/navigation';
import { addPage, resetFilters } from '@/redux/filters/slice';

import { CatalogyCard } from "../../Catalogy/cardCatalogy/CatalogyCard";
import { Container, Box, Typography } from '@mui/material';
import {
	CustomSeparator,
	FilterCatalogySearch,
	CategoryList,
	Search,
} from '@/components';
import { CommonPagination } from '@/components/ui/CommonPagination/CommonPagination';

import Image from 'next/image';
import imgSearchEmpty from '@/assets/Svg/searchEmpty.svg';
// import { searchGoods } from '@/mock-data/searchGoods';

type createQuerySettingsType = {
	queryString: string,
	queryObj: Object
}

type categotyTopAndLowType = {
	categoryName: string,
	topCategoryName: string,
	lowCategoryName: string
}

const styles = {
	display: 'flex',
	flexDirection: 'column',
};

const stylesHide = {
	display: 'none',
}

const EmptyData = (): JSX.Element => {
	return (
		<Box sx={{ margin: "52px 2em 0", textAlign: "center" }}>
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
	)
};

export const CatalogyPage: React.FC = (): JSX.Element => {

	const dispatch = useAppDispatch();
	const router = useRouter();

	const [isListOpen, setListOpen] = useState<boolean>(false);
	const [dataArray, setDataArray] = useState<[] | string>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [categName, setCategName] = useState<categotyTopAndLowType>({
		categoryName: "",
		topCategoryName: "",
		lowCategoryName: ""
	});  // name categoty, topCategory and lowCategory
	const [page, setPage] = useState<number>(1);

	const makeLinkOpen = (): void => {
		setListOpen((prev) => !prev);
	};

	const filtersSetting = useAppSelector(state => state.filters);
	const {
		categoryId,
		price: {
			max: maxPrice,
			min: minPrice,
		},
		sortOrder,
		regionId,
		cityId,
		topSubCateroryId: topSubCategoryId,
		lowSubCategoryId,
		productType,
		keyword,
		// page
	} = filtersSetting;


	const createQuerySettings = (): createQuerySettingsType => {
		let queryArray: string[] = [];
		if (categoryId !== null) queryArray.push(`categoryId=${categoryId}`);
		if (minPrice !== 0) queryArray.push(`minPrice=${minPrice}`);
		if (maxPrice !== 100000) queryArray.push(`maxPrice=${maxPrice}`);
		if (sortOrder !== "") queryArray.push(`sortOrder=${sortOrder}`);
		if (regionId !== null) queryArray.push(`regionId=${regionId}`);
		if (cityId !== null) queryArray.push(`cityId=${cityId}`);
		if (topSubCategoryId !== null) queryArray.push(`topSubCategoryId=${topSubCategoryId}`);
		if (lowSubCategoryId !== null) queryArray.push(`lowSubCategoryId=${lowSubCategoryId}`);
		if (productType !== "") queryArray.push(`productType=${productType}`);
		if (keyword !== "") queryArray.push(`keyword=${keyword}`);
		if (page !== 1) queryArray.push(`page=${page}`);

		const queryString: string = queryArray.length > 0 ? "?" + queryArray.join('&') : "";
		let queryObj: {} = queryArray.reduce((obj, item) => {
			const itemArr = item.split("=");
			const valueNumber = Number.isNaN(Number(itemArr[1])) ? itemArr[1] : Number(itemArr[1]);
			const newQueryObj = {
				[itemArr[0]]: valueNumber
			};
			return Object.assign(obj, newQueryObj);
		}, {});
		return {
			queryString: queryString,
			queryObj: queryObj
		};
	}

	useEffect(() => {
		setLoading(false);
		const { queryString, queryObj } = createQuerySettings();
		console.log('query', queryObj);
		if (queryString.length > 0) {
			dispatch(getFilteredAdverts(queryObj))
				.then((data) => {
					const newData: [] | string = data.payload;
					console.log(newData);
					if (newData && newData.length > 0) {
						setDataArray(newData);
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filtersSetting, page, router]);  //min, max, categoryId, sortOrder, productType, ...

	const handlerResetFilters = (event?: React.FormEvent<HTMLFormElement> | undefined): void => {
		event?.preventDefault();
		dispatch(resetFilters(1));

		setTimeout(() => {
			if (keyword.length > 0) {
				router.push(`/catalogy?keyword=${keyword}`, {
					scroll: false,
				});
			} else {
				router.push(`/catalogy`, {
					scroll: false,
				});
			}
		}, 0);
	};



	const catArr = useAppSelector(state => state.advertisement.category);
	const catTopArr = useAppSelector(state => state.advertisement.topSubCategory);
	const catLowpArr = useAppSelector(state => state.advertisement.lowSubCategory);

	useEffect(() => {
		let catName: string, catTopName: string, catLowName: string;

		if (catArr.length > 0 && categoryId && categoryId > 0) {
			catName = catArr.filter(item => item.id === categoryId)[0].nameUkr;
		} else {
			catName = "";
		}
		if (catTopArr.length > 0 && topSubCategoryId && topSubCategoryId > 0) {
			catTopName = catTopArr.filter(item => item.id === topSubCategoryId)[0].subCategoryNameUkr;
		} else {
			catTopName = "";
		}
		if (catLowpArr.length > 0 && lowSubCategoryId && lowSubCategoryId > 0) {
			catLowName = catLowpArr.filter(item => item.id === lowSubCategoryId)[0].subCategoryNameUkr;
		} else {
			catLowName = "";
		}

		setCategName({
			categoryName: catName,
			topCategoryName: catTopName,
			lowCategoryName: catLowName,
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categoryId, topSubCategoryId, lowSubCategoryId]);


	const handlerPage = (num: number) => {
		if (num > 0) {
			setPage(num);
			// dispatch(addPage(num))
		}
	}

	return (
		<Container sx={{ marginTop: '1rem' }}>
			<Box className='custom-separator' maxWidth={'sm'}>
				<CustomSeparator
					category={categName.categoryName}
					topSubCaterory={categName.topCategoryName}
					lowSubCategory={categName.lowCategoryName}
				/>
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
			<Box style={isListOpen ? styles : stylesHide}>
				<FilterCatalogySearch heandlerClick={handlerResetFilters} />
			</Box>

			<CategoryList />
			{
				!loading
					? <div>Зачекайте ...</div>
					: typeof (dataArray) === "string"
						? <div style={{ fontSize: "32px" }}>Помилка сервера</div>
						: Array.isArray(dataArray) && dataArray.length > 0
							? <><Typography variant='h3' sx={{ margin: '1rem 0 2.3rem', fontSize: '2.3em' }}>
								Ми знайшли понад 1000 оголошень
							</Typography>
								<CatalogyCard item={dataArray} />
								<Box style={{ marginTop: "32px", fontSize: "20px" }}>
									<CommonPagination
										page={page}
										pages={5}  // change when data will come from the backend
										changePage={(num) => handlerPage(num)} />
								</Box>
							</>
							: <EmptyData />
			}
		</Container>
	);
}