"use client";

import { FC, useEffect, useState } from "react";
import styles from "./MyActiveAds.module.css";
import MyAdvertList from "../MyAdvertList/MyAdvertList";
import { CommonPagination } from "@/components/ui/CommonPagination/CommonPagination";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  getUserActiveAdverts,
  getUserInactiveAdverts,
} from "@/redux/advertisement/operations";
import {
  selectUserActiveAdverts,
  selectUserInactiveAdverts,
} from "@/redux/advertisement/selectors";
import CommonSectionSelector from "@/components/ui/CommonSectionSelector/CommonSectionSelector";

type Props = {
  active: boolean;
};

const MyActiveAds: FC<Props> = ({ active }) => {
  const dispatch = useAppDispatch();
  const activeAdsList = useAppSelector(selectUserActiveAdverts);
  const inactiveAdsList = useAppSelector(selectUserInactiveAdverts);
  const [section, setSection] = useState<"SELL" | "BUY">("SELL");
  const [page, setPage] = useState(1);

  console.log("activeAdsList", activeAdsList);
  console.log("inactiveAdsList", inactiveAdsList);

  const listToFilter = active ? activeAdsList ?? [] : inactiveAdsList ?? [];

  if (active) {
  }

  const filteredList = listToFilter.filter((elem) => elem.section === section);
  const currentList = filteredList.slice((page - 1) * 8, (page - 1) * 8 + 8);

  useEffect(() => {
    if (active) {
      dispatch(getUserActiveAdverts());
    } else {
      dispatch(getUserInactiveAdverts());
    }
  }, [dispatch, active]);

  return (
    <section className={styles.myActiveAdsContainer}>
      <CommonSectionSelector section={section} setSection={setSection} />
      <MyAdvertList advertList={currentList} />
      <CommonPagination
        page={page}
        pages={Math.ceil(filteredList.length / 8)}
        changePage={setPage}
      />
    </section>
  );
};

export default MyActiveAds;
