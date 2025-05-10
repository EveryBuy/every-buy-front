"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Search, CatalogyCard, CommonSectionSelector, CommonPreloader, CommonPagination } from "@/components";
import { getAdvertsBySellerId } from "@/redux/advertisement/operations";
import { AdvertsBySellerIdType, CategoryForSeller } from "@/redux/advertisement/slice";
import { useAppSelector, useAppDispatch } from "@/redux/store";
// import { MiddleCardType } from "@/types/middleCardType";
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
	const [section, setSection] = useState<string>(
		useAppSelector((state) => state.filters.section)
	);
	const [selectCategoryId, setSelectCategoryId] = useState<number>(0);
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


	useEffect(() => {
		if (!idSeller || idSeller === 0) {
			router.push('/');
		} else {
			setIsFetching(true);
			setPage(1);
			try {
				const query: FilterQueryType = createFilterQuery();
				dispatch(getAdvertsBySellerId(query));
			} catch (error) {
				console.error(error);
			} finally {
				setIsFetching(false);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [idSeller, section, selectCategoryId]);

	useEffect(() => {
		if (page > 0) {
			setIsFetching(true);
			try {
				const query: FilterQueryType = createFilterQuery();
				dispatch(getAdvertsBySellerId({ ...query, page }));
			} catch (error) {
				console.error(error);
			} finally {
				setIsFetching(false);

			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	useEffect(() => {
		setSelectCategoryId(0);
	}, [section]);

	// console.log('data', allDataSeller);

	function categoryList() {

		const newData: CategoryForSeller[] | undefined = allDataSeller?.categories;
		if (newData?.length === 0) return (
			<div>Усі огололення <span>0</span></div>
		);

		return (
			allDataSeller && <>
				<div
					onClick={
						() => {
							setSelectCategoryId(0);
							setPage(1);
						}
					}>
					Усі оголошення
					<span>
						{allDataSeller.categories.reduce((prev, item) => prev + item.count, 0)}
					</span>
				</div>
				{
					Array.isArray(newData) &&
					newData.map(({ categoryId, nameUkr, count }) => {
						return (
							<div key={categoryId}
								onClick={
									() => {
										setSelectCategoryId(categoryId);
										setPage(1);
									}}
								className={categoryId === selectCategoryId ? styles.categorySelect : ""}>
								{nameUkr}
								<span>{count}</span>
							</div>
						);
					})
				}
			</>
		);
	};

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

	// if (isFetching) {
	// 	showPreloader();
	// }

	if (!idSeller || idSeller === null) {
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
			}, 5000);
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
					{isLoading ? showPreloader() : categoryList()}
					{/* <div>Мода та стиль <span>7</span></div>
					<div>Дитячий світ <span>3</span></div> */}
				</div>

				{allDataSeller?.totalFilteredAdvertisements > 0
					? isLoading ? null : <CatalogyCard item={allDataSeller.filteredAds} />
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
