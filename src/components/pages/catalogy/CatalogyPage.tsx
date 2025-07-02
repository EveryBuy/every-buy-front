"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux/store";

import { getFilteredAdverts } from '@/redux/advertisement/operations';
import { useRouter } from 'next/navigation';
import { addPage, addLimitPrice, resetFilters } from '@/redux/filters/slice';

import { CatalogyCard } from "../../Catalogy/cardCatalogy/CatalogyCard";
import { Container, Box, Typography, Button, IconButton } from "@mui/material";
import {
	CustomSeparator,
	FilterCatalogy,
	CategoryList,
	Search,
	CommonIcon,
} from "@/components";
import { CommonPagination } from "@/components/ui/CommonPagination/CommonPagination";
import { CommonSectionSelector } from "@/components/ui/CommonSectionSelector/CommonSectionSelector";
import { CategotyTopAndLowType } from "@/types/categoryBreadcrumbType";
import style from "./CatalogyPage.module.scss";

import { EmptyData } from "@/components/Catalogy/EmptyData";

// import { searchGoods } from '@/mock-data/searchGoods';

type createQuerySettingsType = {
	queryString: string;
	queryObj: Object;
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
		lowCategory: null,
	});
	const [page, setPage] = useState<number>(1);
	const [totalAdvert, setTotalAdvert] = useState<number>(0);
	const [totalPages, setTotalPages] = useState<number>(1);

	function isSectionParam(value: unknown): value is "SELL" | "BUY" {
		return value === "SELL" || value === "BUY";
	}

	const sectionFromParams = searchParams.get('section');
	const sectionFromStore = useAppSelector((state) => state.filters.section);
	const sectionParams: "SELL" | "BUY" | null = isSectionParam(sectionFromParams)
		? sectionFromParams
		: isSectionParam(sectionFromStore)
			? sectionFromStore
			: null;
	const [section, setSection] = useState<"SELL" | "BUY">(sectionParams || "SELL");

	const [isLoadingPage, setIsLoadingPage] = useState(
		useAppSelector((state) => state.advertisement.isLoading)
	);

	const makeLinkOpen = (): void => {
		setListOpen((prev) => !prev);
	};

	const {
		categoryId,
		price: { max: maxPrice, min: minPrice },
		limitPrice: { max: maxLimitPrice, min: minLimitPrice },
		sortOrder,
		regionId,
		cityId,
		topSubCategoryId,
		lowSubCategoryId,
		productType,
		keyword,
		// page
	} = useAppSelector((state) => state.filters);

	// const myState = useAppSelector((state) => state.filters);
	// console.log('myState', myState);

	// const minLimitPrice = useAppSelector(state => state.filters.limitPrice.min);
	// const maxLimitPrice = useAppSelector(state => state.filters.limitPrice.max);

	const createQuerySettings = (): createQuerySettingsType => {
		let queryArray: string[] = [];
		if (categoryId !== null) queryArray.push(`categoryId=${categoryId}`);
		if (minPrice !== minLimitPrice) queryArray.push(`minPrice=${minPrice}`);
		if (maxPrice !== maxLimitPrice) queryArray.push(`maxPrice=${maxPrice}`);
		if (sortOrder !== "") queryArray.push(`sortOrder=${sortOrder}`);
		if (regionId !== null) queryArray.push(`regionId=${regionId}`);
		if (cityId !== null) queryArray.push(`cityId=${cityId}`);
		if (topSubCategoryId !== null) queryArray.push(`topSubCategoryId=${topSubCategoryId}`);
		if (lowSubCategoryId !== null) queryArray.push(`lowSubCategoryId=${lowSubCategoryId}`);
		if (productType !== "") queryArray.push(`productType=${productType}`);
		if (keyword !== "") queryArray.push(`keyword=${keyword}`);
		if (section !== "SELL") queryArray.push(`section=${section}`);
		if (page !== 1) queryArray.push(`page=${page}`);

		const queryString: string =
			queryArray.length > 0 ? "?" + queryArray.join("&") : "";
		let queryObj: {} | '' = '';
		if (queryString.length > 0) {
			queryObj = queryArray.reduce((obj, item) => {
				const itemArr = item.split("=");
				const valueNumber = Number.isNaN(Number(itemArr[1]))
					? itemArr[1]
					: Number(itemArr[1]);
				const newQueryObj = {
					[itemArr[0]]: valueNumber,
				};
				return Object.assign(obj, newQueryObj);
			}, {});
		}

		return {
			queryString: queryString,
			queryObj: queryObj,
		};
	};

	const dispatchDataAdvert = (
		str: string,
		obj: {} | "",
		cleanPagination: boolean,
		changePrices?: boolean
	): void => {
		dispatch(getFilteredAdverts(obj))
			.then((data) => {
				const newData: [] | string = data.payload.advertisements;
				// console.log(data);
				if (newData && newData.length > 0) {
					// console.log('newData', newData);
					setDataArray(newData);
					setTotalPages(data.payload.totalPages);
					setTotalAdvert(data.payload.totalAdvertisements);
				} else {
					setDataArray([]);
					setTotalPages(0);
					// console.log('not data');
					// console.log('dataArray', dataArray);
				}
				if (!changePrices) {
					const minP = Math.floor(data.payload.minPrice);
					const maxP = Math.ceil(data.payload.maxPrice);
					dispatch(addLimitPrice({
						min: isNaN(minP) ? 0 : minP,
						max: isNaN(maxP) ? 0 : maxP
					}));
				}
			})
			.catch((error) => console.error("Error: ", error))
			.finally(() => {
				setLoading(true);
				cleanPagination
					? router.push(str, { scroll: false })
					: router.push(str);
				setIsLoadingPage(true);
			});
	};

	const updateDataAdvert = (cleanPagination: boolean, changePrices?: boolean) => {
		setLoading(false);
		cleanPagination && setPage(1);
		const { queryString, queryObj } = createQuerySettings();
		// console.log('queryString', queryString, queryObj);
		if (searchParams.size === 0 && queryString.length === 0) {
			// show all data
			dispatchDataAdvert("", "", cleanPagination);
		} else {
			if (queryString.length > 0) {
				// console.log('query', queryObj);
				if (changePrices) {
					dispatchDataAdvert(queryString, queryObj, cleanPagination, true);
				} else {
					dispatchDataAdvert(queryString, queryObj, cleanPagination);
				}
			} else {
				if (isLoadingPage) {
					// searchParams > 0, query empty
					setTimeout(() => {
						dispatchDataAdvert("", "", cleanPagination);
						router.push(queryString, { scroll: false });
					}, 50);
				}
			}
		}
	};

	useEffect(() => {
		updateDataAdvert(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categoryId, sortOrder, regionId, cityId, topSubCategoryId, lowSubCategoryId, productType, keyword, section]); // filtersSetting: min, max, categoryId, sortOrder, productType, ...

	useEffect(() => {
		updateDataAdvert(true, true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [maxPrice, minPrice]);

	useEffect(() => {
		updateDataAdvert(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	const handlerResetFilters = (
		event?: React.FormEvent<HTMLFormElement> | undefined
	): void => {
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
	const catArr = useAppSelector((state) => state.advertisement.category);
	const catTopArr = useAppSelector(
		(state) => state.advertisement.topSubCategory
	);
	const catLowpArr = useAppSelector(
		(state) => state.advertisement.lowSubCategory
	);

	useEffect(() => {
		try {
			let catName: string, catTopName: string, catLowName: string;

			if (catArr.length > 0 && categoryId && categoryId > 0) {
				catName = catArr.filter((item) => item.id === categoryId)[0].nameUkr;
			} else {
				catName = "";
			}
			if (catTopArr.length > 0 && topSubCategoryId && topSubCategoryId > 0) {
				catTopName = catTopArr.filter((item) => item.id === topSubCategoryId)[0]
					.subCategoryNameUkr;
			} else {
				catTopName = "";
			}
			if (catLowpArr.length > 0 && lowSubCategoryId && lowSubCategoryId > 0) {
				catLowName = catLowpArr.filter(
					(item) => item.id === lowSubCategoryId
				)[0].subCategoryNameUkr;
			} else {
				catLowName = "";
			}

			setBreadcrumbsObj({
				category: categoryId
					? {
						id: categoryId,
						title: catName,
						link: `/catalogy?categoryId=${categoryId}`,
					}
					: null,
				topCategory: topSubCategoryId
					? {
						id: topSubCategoryId,
						title: catTopName,
						link: `/catalogy?categoryId=${categoryId}&topSubCategoryId=${topSubCategoryId}`,
					}
					: null,
				lowCategory: lowSubCategoryId
					? {
						id: lowSubCategoryId,
						title: catLowName,
						link: `/catalogy?categoryId=${categoryId}&topSubCategoryId=${topSubCategoryId}&lowSubCategoryId=${lowSubCategoryId}`,
					}
					: null,
			});
		} catch (e) {
			// console.log('Error categoty id', e);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		categoryId,
		topSubCategoryId,
		lowSubCategoryId,
		catArr,
		catTopArr,
		catLowpArr,
	]);

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
	};

	const handlerPage = (num: number) => {
		if (num > 0) {
			setPage(num);
			// dispatch(addPage(num));
		}
	};

	return (
		<Container sx={{ marginTop: { sm: "1rem" } }}>
			{/* <Box className='custom-separator' maxWidth={'sm'}> */}
			<Box maxWidth={"sm"}>
				<CustomSeparator
					category={breadcrumbsObj.category}
					topSubCategory={breadcrumbsObj.topCategory}
					lowSubCategory={breadcrumbsObj.lowCategory}
				/>
			</Box>
			<Box sx={{ margin: { xs: "1.5em 0 0", sm: "2.5rem 0.5rem 0" } }}>
				<Search hideSuggest={true} />
			</Box>
			{/* <div className={style.wrapperSelectSection}>

			</div> */}
			<div className={style.wrapperFilters}>
				<Box sx={{ margin: "2em 0.1em 0.5em" }}>
					<Typography
						variant="h3"
						sx={{ fontSize: { xs: "1.5em", sm: "2.3em" }, display: "flex" }}
					>
						<span onClick={makeLinkOpen} style={{ cursor: "pointer" }}>
							Фільтри
						</span>
						<Button
							// variant="outlined"
							sx={{
								width: 24,
								height: 24,
								minWidth: 24,
								padding: 0,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								// display: "inline-block",
								marginLeft: { xs: 0.8, sm: 1.5 },
								marginTop: { xs: 0.4, sm: 1.5 },
							}}
							onClick={makeLinkOpen}
						>
							<CommonIcon
								id={isListOpen ? "filter-arrow-down" : "filter-arrow-up"}
								width="20"
								height="10"
							/>
							{/* "Згорнути" : "Розгорнути" */}
						</Button>
					</Typography>
				</Box>
				<Box sx={{ margin: "2em 0.1em 0.5em" }}>
					<CommonSectionSelector section={section} setSection={setSection} />
				</Box>
			</div>
			<div
				className={isListOpen ? style.showListFilters : style.hideListFilters}
			>
				<FilterCatalogy heandlerClick={handlerResetFilters} />
			</div>

			{/* <CategoryList /> */}
			{
				!loading ? (
					<div>Зачекайте ...</div>
				) : typeof dataArray === "string" ? (
					<div style={{ fontSize: "32px" }}>Помилка сервера</div>
				) : Array.isArray(dataArray) && dataArray.length > 0 ? (
					<>
						<Typography
							variant="h3"
							sx={{
								margin: "2rem 0 2.3rem",
								fontSize: { xs: "1.5em", sm: "2.3em" },
								display: { xs: "none", sm: "block" },
							}}
						>
							Ми знайшли {countAdvert(totalAdvert)} оголошень
						</Typography>
						<CatalogyCard item={dataArray} />
						<Box style={{ marginTop: "32px", fontSize: "20px" }}>
							<CommonPagination
								page={page}
								pages={totalPages}
								changePage={(num) => handlerPage(num)}
							/>
						</Box>
					</>
				) : (
					<EmptyData />
				)
			}
		</Container >
	);
};
