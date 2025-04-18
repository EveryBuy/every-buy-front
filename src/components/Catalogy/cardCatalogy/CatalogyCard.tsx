"use client"
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from "@/redux/store";
import styles from "./CatalogyCard.module.scss";
import MiddleCard from "./MiddleCard/MiddleCard";
import { goodsListSell } from "@/mock-data/catalogyCardsData";
import { MiddleCardType } from "@/types/middleCardType";
import { getAllFavouriteAdvert } from "@/redux/advertisement/operations";
import { FavouriteAdvertisement } from '@/redux/advertisement/slice';

type ElemCard = MiddleCardType & {
	[key: string]: any;
};

type ItemProps = {
	item: ElemCard[];
};

export const CatalogyCard = (props: ItemProps) => {
	const items: ElemCard[] | null = props.item?.length > 0 ? props.item : null;

	const dispatch = useAppDispatch();
	const section = useAppSelector(state => state.filters.section);

	useEffect(() => {
		dispatch(getAllFavouriteAdvert({ section }));
	}, [dispatch, section]);

	const favourites: FavouriteAdvertisement[] = useAppSelector(state => state.advertisement.favouriteAdvertisements);
	const favListId: number[] = favourites.map(item => item.advertisementId);
	// console.log(favourites);
	// console.log("favListId", favListId);

	return (
		<div className={styles.containerMiddleCardsList}>
			<ul className={styles.middleCardsList}>
				{items && items.length > 0 && Array.isArray(items)
					? items.map((elem) => {
						return (
							<li
								key={elem.advertisementId}
								className={styles.middleCardsItem}
							>
								<MiddleCard
									item={elem}
									favourite={favListId ? favListId.includes(elem.advertisementId) : false} />
							</li>
						);
					})
					: null}
			</ul>
		</div>
	);
};

export default CatalogyCard;
