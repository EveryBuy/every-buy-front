"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Search, CatalogyCard, CommonSectionSelector, CommonPreloader } from "@/components";
import { getAdvertsBySellerId } from "@/redux/advertisement/operations";
import { AdvertsBySellerIdType, CategoryForSeller } from "@/redux/advertisement/slice";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { MiddleCardType } from "@/types/middleCardType";
import styles from "./SellerPage.module.scss";
import photoSeller from "@/assets/photo-seller.jpg";
import { goodsListSell } from "@/mock-data/catalogyCardsData";

// type CategoriesType = {
// 	categoryId: number,
// 	nameUkr: string,
// 	count: number,
// }

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

	const allDataSeller: AdvertsBySellerIdType | null =
		useAppSelector((state) => state.advertisement.advertsBySellerId);


	useEffect(() => {
		if (!idSeller || idSeller === 0) {
			router.push('/');
		} else {
			setIsFetching(true);
			try {
				if (section === 'SELL') {
					dispatch(getAdvertsBySellerId({ userId: idSeller }));
				} else {
					dispatch(getAdvertsBySellerId({ userId: idSeller, section: section }));
				}
			} catch (error) {
				console.error(error);
			} finally {
				setIsFetching(false);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [idSeller, section]);

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
				<div onClick={() => setSelectCategoryId(0)}>
					Усі огололення <span>{allDataSeller.totalFilteredAdvertisements}</span>
				</div>
				{
					Array.isArray(newData) &&
					newData.map(({ categoryId, nameUkr, count }) => {
						return (
							<div key={categoryId} onClick={() => setSelectCategoryId(categoryId)}>
								{nameUkr}
								<span>{count}</span>
							</div>
						);
					})
				}
			</>
		);
	};

	if (isFetching) {
		return (
			<div className={styles.preloaderContainer}>
				<CommonPreloader sx={{ color: "#e5ff46" }} />
			</div>
		);
	}

	if (!idSeller || idSeller === null) {
		return (
			<div className={styles.container}>
				Користувача було видалено, або його не існувало.
			</div>
		);
	} else if (!allDataSeller || !allDataSeller.user) {
		return (
			<div className={styles.container}>
				Помилка сервера.
			</div>
		);
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
				<div className={styles.allCountText}>кількість знайдених оголошень: {allDataSeller.totalAdvertisements}</div>

				<div className={styles.wrapperSection}>
					<h1 className={styles.title}>Фільтрація по оголошенням</h1>
					<CommonSectionSelector section={section} setSection={setSection} />
				</div>
				<div className={styles.wrapperFilter}>
					{categoryList()}
					{/* <div>Мода та стиль <span>7</span></div>
					<div>Дитячий світ <span>3</span></div> */}
				</div>

				{allDataSeller?.totalFilteredAdvertisements > 0
					? <CatalogyCard item={
						selectCategoryId
							? allDataSeller.filteredAds.length > 0
								? allDataSeller.filteredAds.filter(item => item.category.id === selectCategoryId)
								: null
							: allDataSeller.filteredAds

					} />
					: <div>Оголошення не знайдено</div>
				}
				{/* <CatalogyCard item={goodsListSell} /> */}
			</div>
		);
	}
}
