"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getActiveAdvertisement } from "@/redux/advertisement/operations";
import { RootState, useAppSelector, useAppDispatch } from "@/redux/store";
import { Advertisement } from '@/redux/advertisement/slice';
import { Contacts, Info, Seller, AnnouncementSlider, CommonPreloader } from "@/components";
import styles from "./Announcement.module.scss";
import { setHeaderAuthToken } from "@/utils/axios";

export default function Announcement() {
	const dispatch = useAppDispatch();
	const searchParams = useSearchParams();
	const id = searchParams.get("id");

	const [isFetching, setIsFetching] = useState(true);

	const advertisementById: Advertisement | null = useAppSelector((state: RootState) => state.advertisement.activeAdvertisement);
	const loading = useAppSelector((state: RootState) => state.advertisement.isLoading);
	// console.log(advertisementById, loading);
	// console.log(localStorage.getItem("persist:root"));

	const fetchData = async () => {
		setIsFetching(true);
		const persistData = localStorage.getItem("persist:root");
		if (persistData) {
			const parsedPersistData = JSON.parse(persistData);
			const authToken = JSON.parse(parsedPersistData.token);

			if (authToken) {
				setHeaderAuthToken(authToken);
			}
		} else {
			console.error("No persist data found in localStorage");
		}

		try {
			await dispatch(getActiveAdvertisement(Number(id))).unwrap();
		} catch (error) {
			console.error("Error during fetching:", error);
		} finally {
			setIsFetching(false);
		}
	};

	useEffect(() => {
		if (!id) return;
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, id]);

	if (isFetching || loading) {
		return (
			<div className={styles.preloaderContainer}>
				<CommonPreloader sx={{ color: "#e5ff46" }} />
			</div>
		);
	}

	if (!advertisementById) {
		return <div className={styles.container}>Оголошення було видалено, або його не існувало.</div>;
	} else {
		const creationDate = new Date(advertisementById.data.creationDate);
		const formattedDate = new Intl.DateTimeFormat("uk-UA", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		}).format(creationDate);

		return (
			<div className={styles.container}>
				<AnnouncementSlider images={advertisementById?.data?.photoUrls || []} />
				<Contacts
					contactsInfo={{
						publicDate: formattedDate,
						cost: advertisementById.data.price,
						delivery: advertisementById.data.deliveryMethods,
						title: advertisementById.data.title,
						section: advertisementById.data.section,
					}}
				/>
				<Info
					articleInfo={{
						description: advertisementById.data.description,
						location: {
							city: advertisementById.data.city.cityName,
							region: advertisementById.data.city.region.regionName,
						},
						delivery: advertisementById.data.deliveryMethods,
					}}
				/>
				<Seller
					sellerInfo={{
						imageUrl: advertisementById.data.userDto.photoUrl,
						nameUkr: advertisementById.data.userDto.fullName,
						online: advertisementById.data.isEnabled,
						linkToAllAdvert: `/seller/${advertisementById.data.userId}`,
					}}
				/>
			</div>
		);
	}
}
