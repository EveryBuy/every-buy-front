"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Search, CatalogyCard, CommonSectionSelector, CommonPreloader, CommonPagination } from "@/components";
import { CategoryList } from "./CategoryList";
import { getAdvertsBySellerId } from "@/redux/advertisement/operations";
import { AdvertsBySellerIdType, CategoryForSeller } from "@/redux/advertisement/slice";
import { addCategory } from '@/redux/filters/slice';
import { useAppSelector, useAppDispatch } from "@/redux/store";
import styles from "./SellerPage.module.scss";
import photoSeller from "@/assets/photo-seller.jpg";
// import { goodsListSell } from "@/mock-data/catalogyCardsData";

type FilterQueryType = {
	userId: number;
	section?: string;
	categoryId?: number;
}

export default function SellerPage() {
	const params = useParams();
	const preId = Number(params.id) as number;
	const idSeller: number = isNaN(preId) ? 0 : preId;

	const dispatch = useAppDispatch();
	const router = useRouter();

	const [isFetching, setIsFetching] = useState<boolean>(true);
	const initialSection = useAppSelector((state) => state.filters.section);
	const [section, setSection] = useState<string>(initialSection);
	const selectCategoryId = useAppSelector((state) => state.filters.categoryId) || 0;
	const [page, setPage] = useState<number>(1);

	const allDataSeller: AdvertsBySellerIdType | null =
		useAppSelector((state) => state.advertisement.advertsBySellerId);
	const isLoading: boolean = useAppSelector((state) => state.advertisement.isLoading);


	function createFilterQuery(): FilterQueryType {
		const filterQuery: FilterQueryType = { userId: idSeller };
		if (section === "BUY") filterQuery.section = section;
		if (selectCategoryId !== 0) filterQuery.categoryId = selectCategoryId;
		return filterQuery;
	}

	function getData(value: string) {
		setIsFetching(true);
		try {
			const query: FilterQueryType = createFilterQuery();
			if (value === "selectCategoryId" || value === "section") {
				dispatch(getAdvertsBySellerId(query));
			}
			if (value === "page") {
				dispatch(getAdvertsBySellerId({ ...query, page }));
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsFetching(false);
		}
	}

	useEffect(() => {
		if (!idSeller || idSeller === 0) {
			router.push('/');
		} else {
			if (page !== 1) setPage(1);
			getData("selectCategoryId");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [idSeller, selectCategoryId]);

	useEffect(() => {
		if (!isFetching) {
			getData("page");
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	useEffect(() => {
		dispatch(addCategory(0));
		if (page !== 1) setPage(1);
		getData("section");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [section]);

	useEffect(() => {
		return () => {
			dispatch(addCategory(0)); // clean redux for categoryId
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// console.log('data', allDataSeller);


	function showPreloader() {
		return (
			<div className={styles.preloaderContainer}>
				<CommonPreloader sx={{ color: "#e5ff46" }} />
			</div>
		);
	}

	const smoothScroll = () => {
		setTimeout(() => {
			const element = document.getElementById('filter');
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		}, 200);
	};


	if (!idSeller || idSeller === null || allDataSeller?.user.fullName === "Unknown User") {
		return (
			<div className={styles.container}>
				Користувача було видалено, або його не існувало.
			</div>
		);
	} else if ((!allDataSeller || !allDataSeller.user)) {
		if (!isLoading) {
			setTimeout(() => {
				return (
					<div className={styles.container}>
						Помилка сервера.
					</div>
				);
			}, 8000);
		}
	} else {

		return (
			<div className={styles.container}>

				<div className={styles.wrapperSearch}>
					<Search />
				</div>

				<div className={styles.wrapperSeller}>
					<div className={styles.wrapperImgSeller}>
						<Image
							src={allDataSeller.user.photoUrl || photoSeller}
							fill
							sizes="100vh"
							alt="photo seller"
						/>
					</div>
					<div>
						<p className={styles.typeSeller}>{section === "SELL" ? "Продавець" : "Покупець"}</p>
						<p className={styles.nameSeller}>{allDataSeller.user.fullName || "Шахрай Зайченя"}</p>
					</div>
				</div>
				<div className={styles.allCountText}>
					кількість знайдених оголошень: {allDataSeller.totalAdvertisements}
				</div>

				<div className={styles.wrapperSection} id="filter">
					<h1 className={styles.title}>Фільтрація по оголошенням</h1>
					<CommonSectionSelector section={section} setSection={setSection} />
				</div>
				<div className={styles.wrapperFilter}>
					{
						isLoading
							? showPreloader()
							: <CategoryList allDataSeller={allDataSeller} category={selectCategoryId} />
					}
				</div>

				{allDataSeller?.totalFilteredAdvertisements > 0
					? <CatalogyCard item={allDataSeller.filteredAds} />
					// <div className={isLoading ? styles.catalogyHide : ""}>
					// 	<CatalogyCard item={allDataSeller.filteredAds} />
					// </div>
					: <div>Оголошення не знайдено</div>
				}
				{
					selectCategoryId === 0 && <div onClick={smoothScroll} className={styles.wrapperPagination}>
						<CommonPagination
							page={page}
							pages={allDataSeller.totalPages || 1}
							changePage={(num) => (num ? setPage(num) : null)}
						/>
					</div>
				}

				{/* <CatalogyCard item={goodsListSell} /> onClick={smoothScroll}*/}
			</div>
		);
	}
}
