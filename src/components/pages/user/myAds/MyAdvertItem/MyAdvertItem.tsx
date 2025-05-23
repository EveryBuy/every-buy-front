"use client";

import Image from "next/image";
import { FC, useState } from "react";
import heart from "@/assets/Svg/heart.svg";
import eye from "@/assets/Svg/Eye.svg";
import bin from "@/assets/Svg/bin.svg";
import CommonButton from "@/components/ui/CommonButton/CommonButton";
import { AdvertItem } from "@/types/myAdvertisementsTypes";
import styles from "./MyAdvertItem.module.scss";
import { useAppDispatch } from "@/redux/store";
import {
  changeAdvertisementStatus,
  deleteAdvertisement,
} from "@/redux/advertisement/operations";
import { useRouter } from "next/navigation";
import DeleteAds from "../DeleteAdsModal/DeleteAds";
import ActivateToggle from "../ActivateToggleModal/ActivateToggle";
import EditModal from "../EditModal/EditModal";
import clsx from "clsx";

type MyAdvertItemProps = {
  item: AdvertItem;
  isActivated: boolean;
};

export const MyAdvertItem: FC<MyAdvertItemProps> = ({ item, isActivated }) => {
  const {
    id,
    section,
    title,
    state,
    price,
    userId,
    mainPhotoUrl,
    favouriteCount,
    view,
  } = item;

  const [editIsOpen, setEditIsOpen] = useState(false);
  const [actToggleIsOpen, setActToggleIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const router = useRouter();

  const dispatch = useAppDispatch();

  const handleEdit = () => {
    router.push("");
  };

  const handleDeactivate = () => {
    // dispatch();
  };

  const handleDelete = () => {
    // dispatch(deleteAdvertisement(id));
    setDeleteIsOpen(true);
  };

  return (
    <section className={styles.myAdvertItemContainer}>
      <div className={styles.itemImageBox}>
        <Image
          className={styles.itemImage}
          src={mainPhotoUrl}
          alt="Advert photo"
          width={96}
          height={96}
        />
        <div className={styles.itemTitleBox}>
          <p className={styles.itemTitle}>{title}</p>
          <p className={styles.itemState}>{state}</p>
          <p>{price} грн</p>
        </div>
      </div>
      <div className={styles.itemStatsBox}>
        <div className={styles.itemStats}>
          <Image src={eye} alt="views count" width={32} height={32} />
          <p>{view ? view : 0}</p>
        </div>
        <div className={styles.itemStats}>
          <Image src={heart} alt="favourite count" width={30} height={30} />
          <p>{favouriteCount}</p>
        </div>
      </div>
      <div className={styles.itemButtonBox}>
        <EditModal id={id}>
          <CommonButton
            type="button"
            title="Редагувати"
            className={styles.itemButton}
            onClick={handleEdit}
          ></CommonButton>
        </EditModal>
        <ActivateToggle id={id} isActivated={isActivated}>
          <CommonButton
            type="button"
            title={isActivated ? "Деактивувати" : "Активувати"}
            className={clsx(
              styles.itemButton,
              !isActivated && styles.itemButtonNotActive
            )}
          ></CommonButton>
        </ActivateToggle>
        <DeleteAds id={id}>
          <CommonButton type="button" title="" className={styles.itemDelButton}>
            <Image src={bin} alt="delete icon" width={23} height={23} />
          </CommonButton>
        </DeleteAds>
      </div>
    </section>
  );
};

export default MyAdvertItem;
