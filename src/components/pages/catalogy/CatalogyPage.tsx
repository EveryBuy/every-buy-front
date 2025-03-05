'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { getFilteredAdverts } from '@/redux/advertisement/operations';
import { useRouter } from 'next/navigation';
import { addPage, addPrice, resetFilters } from '@/redux/filters/slice';

import { CatalogyCard } from "../../Catalogy/cardCatalogy/CatalogyCard";
import { Container, Box, Typography } from '@mui/material';
import {
	CustomSeparator,
	FilterCatalogy,
	CategoryList,
	Search,
} from '@/components';
import { CommonPagination } from '@/components/ui/CommonPagination/CommonPagination';
import { CommonSectionSelector } from '@/components/ui/CommonSectionSelector/CommonSectionSelector';
import { CategotyTopAndLowType } from '@/types/categoryBreadcrumbType';
import style from './CatalogyPage.module.scss';

import Image from 'next/image';
import imgSearchEmpty from '@/assets/Svg/searchEmpty.svg';
// import { searchGoods } from '@/mock-data/searchGoods';

type createQuerySettingsType = {
	queryString: string,
	queryObj: Object
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
	const searchParams = useSearchParams();

	const [isListOpen, setListOpen] = useState<boolean>(false);
	const [dataArray, setDataArray] = useState<[] | string>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [breadcrumbsObj, setBreadcrumbsObj] = useState<CategotyTopAndLowType>({
		category: null,
		topCategory: null,
		lowCategory: null
	});
	const [page, setPage] = useState<number>(1);
	const [totalAdvert, setTotalAdvert] = useState<number>(0);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [section, setSection] = useState<string>("SELL");

	const [isLoadingPage, setIsLoadingPage] = useState(useAppSelector(state => state.advertisement.isLoading));

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
		topSubCategoryId,
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
		if (section !== "SELL") queryArray.push(`section=${section}`);
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

	const dispatchDataAdvert = (str: string, obj: {} | '', cleanPagination: boolean): void => {
		dispatch(getFilteredAdverts(obj))
			.then((data) => {
				const newData: [] | string = data.payload.advertisements;
				// console.log(data);
				if (newData && newData.length > 0) {
					// console.log('newData', newData);
					setDataArray(newData);
					setTotalPages(data.payload.totalPages);
					setTotalAdvert(data.payload.totalAdvertisements);
					// dispatch(addPrice({
					// 	min: data.payload.minPrice,
					// 	max: data.payload.maxPrice
					// }));
				} else {
					setDataArray([]);
					setTotalPages(0);
					// console.log('not data');
					// console.log('dataArray', dataArray);
				}
			})
			.catch(error => console.error('Error: ', error))
			.finally(() => {
				setLoading(true);
				cleanPagination
					? router.push(str, { scroll: false })
					: router.push(str);
				setIsLoadingPage(true);
			});
	}

	const updateDataAdvert = (cleanPagination: boolean) => {
		setLoading(false);
		cleanPagination && setPage(1);
		const { queryString, queryObj } = createQuerySettings();
		if (searchParams.size === 0 && queryString.length === 0) {  // show all data
			dispatchDataAdvert('', '', cleanPagination);
		} else {
			if (queryString.length > 0) {
				// console.log('query', queryObj);
				dispatchDataAdvert(queryString, queryObj, cleanPagination);
			} else {
				if (isLoadingPage) {  // searchParams > 0, query empty
					setTimeout(() => {
						dispatchDataAdvert('', '', cleanPagination);
						router.push(queryString, { scroll: false });
					}, 50);
				}
			}
		}
	}

	useEffect(() => {
		updateDataAdvert(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filtersSetting, section]);  //min, max, categoryId, sortOrder, productType, ...

	useEffect(() => {
		updateDataAdvert(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

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


	// For Breadcrumbs
	const catArr = useAppSelector(state => state.advertisement.category);
	const catTopArr = useAppSelector(state => state.advertisement.topSubCategory);
	const catLowpArr = useAppSelector(state => state.advertisement.lowSubCategory);

	useEffect(() => {

		try {
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

			setBreadcrumbsObj({
				category: categoryId ? {
					id: categoryId,
					title: catName,
					link: `/catalogy?categoryId=${categoryId}`
				} : null,
				topCategory: topSubCategoryId ? {
					id: topSubCategoryId,
					title: catTopName,
					link: `/catalogy?categoryId=${categoryId}&topSubCategoryId=${topSubCategoryId}`
				} : null,
				lowCategory: lowSubCategoryId ? {
					id: lowSubCategoryId,
					title: catLowName,
					link: `/catalogy?categoryId=${categoryId}&topSubCategoryId=${topSubCategoryId}&lowSubCategoryId=${lowSubCategoryId}`
				} : null,
			});
		} catch (e) {
			// console.log('Error categoty id', e);
		}


		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categoryId, topSubCategoryId, lowSubCategoryId, catArr, catTopArr, catLowpArr]);


	const countAdvert = (num: number): string => {
		if (num < 10) {
			return "до 10";
		} else if (num >= 10 && num < 100) {
			return `понад ${Math.floor(num / 10) * 10}`;
		} else if (num >= 100 && num < 1000) {
			return `понад ${Math.floor(num / 100) * 100}`;
		} else {
			return "понад 1000";
		}
	}

	const handlerPage = (num: number) => {
		if (num > 0) {
			setPage(num);
			// dispatch(addPage(num));
		}
	}

	return (
		<Container sx={{ marginTop: '1rem' }}>
			<Box className='custom-separator' maxWidth={'sm'}>
				<CustomSeparator
					category={breadcrumbsObj.category}
					topSubCategory={breadcrumbsObj.topCategory}
					lowSubCategory={breadcrumbsObj.lowCategory}
				/>
			</Box>
			<Box sx={{ margin: "2.5rem 0.5rem 0" }}>
				<Search hideSuggest={true} />
			</Box>
			{/* <div className={style.wrapperSelectSection}>

			</div> */}
			<div className={style.wrapperFilters}>
				<Box sx={{ margin: "2em 0.1em" }}>
					<Typography variant='h3' sx={{ fontSize: '2.3em' }}>
						Фільтри
					</Typography>
					<Typography variant='h3'
						sx={{ fontSize: '1em', cursor: "pointer", margin: "5px 0 0 25px" }}
						onClick={makeLinkOpen}>
						{isListOpen ? "Згорнути" : "Розгорнути"}
					</Typography>
				</Box>
				<CommonSectionSelector section={section} setSection={setSection} />
			</div>
			<div className={isListOpen ? style.showListFilters : style.hideListFilters}>
				<FilterCatalogy heandlerClick={handlerResetFilters} />
			</div>

			<CategoryList />
			{
				!loading
					? <div>Зачекайте ...</div>
					: typeof (dataArray) === "string"
						? <div style={{ fontSize: "32px" }}>Помилка сервера</div>
						: Array.isArray(dataArray) && dataArray.length > 0
							? <><Typography variant='h3' sx={{ margin: '1rem 0 2.3rem', fontSize: '2.3em' }}>
								Ми знайшли {countAdvert(totalAdvert)} оголошень
							</Typography>
								<CatalogyCard item={dataArray} />
								<Box style={{ marginTop: "32px", fontSize: "20px" }}>
									<CommonPagination
										page={page}
										pages={totalPages}
										changePage={(num) => handlerPage(num)} />
								</Box>
							</>
							: <EmptyData />
			}
		</Container>
	);
}