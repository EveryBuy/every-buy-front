"use client";

import { useEffect, useState, useRef } from "react";
import { AdvertsBySellerIdType, CategoryForSeller } from "@/redux/advertisement/slice";
import { addCategory } from '@/redux/filters/slice';
import { useAppSelector, useAppDispatch } from "@/redux/store";
import styles from "./SellerPage.module.scss";

type Props = {
	allDataSeller: AdvertsBySellerIdType | null;
	category: number
}

export function CategoryList({ allDataSeller, category }: Props) {

	const dispatch = useAppDispatch();
	const selectCategoryId = useAppSelector((state) => state.filters.categoryId) || 0;

	const newData: CategoryForSeller[] | undefined = allDataSeller?.categories;
	if (newData?.length === 0) return (
		<div>Усі огололення <span>0</span></div>
	);

	return (
		allDataSeller && <>
			<div
				onClick={() => dispatch(addCategory(0))}>
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
							onClick={() => dispatch(addCategory(categoryId))}
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
