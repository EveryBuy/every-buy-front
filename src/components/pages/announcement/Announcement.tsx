"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getActiveAdvertisement } from "@/redux/advertisement/operations";
import { RootState, useAppSelector, useAppDispatch } from "@/redux/store";
import { Advertisement } from "@/redux/advertisement/slice";
import {
	Contacts,
	Info,
	Seller,
	AnnouncementSlider,
	CommonPreloader,
	CustomSeparator,
} from "@/components";
import styles from "./Announcement.module.scss";
import { getAllFavouriteAdvert } from '@/redux/advertisement/operations';
import { selectIsLoggedIn } from "@/redux/auth/selectors";
import { setHeaderAuthToken } from "@/utils/axios";

export default function Announcement() {
	const dispatch = useAppDispatch();
	const searchParams = useSearchParams();
	const preId: number = Number(searchParams.get("id")) || 0;
	const id: number = isNaN(preId) ? 0 : preId;
	const router = useRouter();

	const [isFetching, setIsFetching] = useState(true);

	const advertisementById: Advertisement | null = useAppSelector(
		(state: RootState) => state.advertisement.activeAdvertisement
	);
	const advertisementId: number = advertisementById?.id || 0;
	const loading = useAppSelector(
		(state: RootState) => state.advertisement.isLoading
	);

	const fetchData = async () => {
		setIsFetching(true);
		// const persistData = localStorage.getItem("persist:root");
		// if (persistData) {
		// 	const parsedPersistData = JSON.parse(persistData);
		// 	const authToken = JSON.parse(parsedPersistData.token);

		// 	if (authToken) {
		// 		setHeaderAuthToken(authToken);
		// 	}
		// } else {
		// 	console.error("No persist data found in localStorage");
		// }

		try {
			await dispatch(getActiveAdvertisement(id)).unwrap();
		} catch (error) {
			console.error("Error during fetching:", error);
		} finally {
			setIsFetching(false);
		}
	};

	useEffect(() => {
		if (!id || id === 0) {
			router.push('/');
		} else {
			fetchData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const isLoggedIn = useAppSelector(selectIsLoggedIn);
	useEffect(() => {
		if (isLoggedIn && advertisementById) {
			const section = advertisementById.section;
			section ? dispatch(getAllFavouriteAdvert({ section })) : null;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [advertisementById?.section]);


	if (isFetching || loading) {
		return (
			<div className={styles.preloaderContainer}>
				<CommonPreloader sx={{ color: "#e5ff46" }} />
			</div>
		);
	}


	if (!advertisementById || advertisementId === null) {
		return (
			<div className={styles.container}>
				Оголошення було видалено, або його не існувало.
			</div>
		);
	} else {
		const creationDate = new Date(advertisementById.creationDate);
		const formattedDate = new Intl.DateTimeFormat("uk-UA", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		}).format(creationDate);

		return (
			<>
				<div className={styles.breadcrumbsContainer}>
					<CustomSeparator
						category={{
							id: advertisementById.category.id,
							title: advertisementById.category.nameUkr,
							link: `/catalogy?categoryId=${advertisementById.category.id}`,
						}}
						topSubCategory={
							advertisementById.topSubCategory
								? {
									id: advertisementById.topSubCategory.id,
									title: advertisementById.topSubCategory.subCategoryNameUkr,
									link: `/catalogy?categoryId=${advertisementById.category.id}&topSubCategoryId=${advertisementById.topSubCategory.id}`,
								}
								: null
						}
						lowSubCategory={
							advertisementById.lowSubCategory
								? {
									id: advertisementById.lowSubCategory.id,
									title: advertisementById.lowSubCategory.subCategoryNameUkr,
									link: `/catalogy?categoryId=${advertisementById.category.id}&topSubCategoryId=${advertisementById.topSubCategory.id}&lowSubCategoryId=${advertisementById.lowSubCategory.id}`,
								}
								: null
						}
					/>
				</div>

				<div className={styles.container}>
					<AnnouncementSlider images={advertisementById?.photoUrls || []} />
					<Contacts
						contactsInfo={{
							publicDate: formattedDate,
							cost: advertisementById.price,
							delivery: advertisementById.deliveryMethods,
							title: advertisementById.title,
							section: advertisementById.section,
							userId: advertisementById.userId
						}}
						advertisementId={advertisementId}
					/>
					<Info
						articleInfo={{
							description: advertisementById.description,
							location: {
								city: advertisementById.city.cityName,
								region: advertisementById.city.region.regionName,
							},
							delivery: advertisementById.deliveryMethods,
						}}
					/>
					<Seller
						sellerInfo={{
							imageUrl: advertisementById.userDto.photoUrl,
							nameUkr: advertisementById.userDto.fullName,
							online: advertisementById.isEnabled,
							linkToAllAdvert: `/seller/${advertisementById.userId}`,
							section: advertisementById.section,
						}}
					/>
				</div>
			</>
		);
	}
}
