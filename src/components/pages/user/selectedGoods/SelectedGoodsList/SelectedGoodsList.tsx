"use client";

import { FC, useEffect, useState } from "react";
import { SelectedGoodsItem } from "@/components";
import { useAppDispatch } from "@/redux/store";
import {
  getAllFavouriteAdvert,
  removeAdvertFromFavourite,
} from "@/redux/advertisement/operations";
import { selectFavouriteAdvertisements } from "@/redux/advertisement/selectors";
import { useSelector } from "react-redux";
import styles from "./SelectedGoodsList.module.scss";

export const SelectedGoodsList: FC<{ categoryFilter: number }> = ({
  categoryFilter,
}) => {
  const categoryId = categoryFilter ? categoryFilter : null;
  const items = useSelector(selectFavouriteAdvertisements);
  const dispatch = useAppDispatch();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    dispatch(getAllFavouriteAdvert({ categoryId }));
    setIsClient(true);
  }, [dispatch, categoryId]);

  const handleRemove = async (advertisementId: number) => {
    await dispatch(removeAdvertFromFavourite(advertisementId));
  };

  if (!items || !isClient) {
    return <div>...Loading</div>;
  }

  return (
    <div className={styles.containerSelectedGoodsList}>
      <ul className={styles.selectedGoodsList}>
        {items.map((elem: any) => {
          return (
            <li key={elem.advertisementId}>
              <SelectedGoodsItem item={elem} onRemove={handleRemove} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SelectedGoodsList;
