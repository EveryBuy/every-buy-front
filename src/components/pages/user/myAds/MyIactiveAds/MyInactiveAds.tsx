"use client";

import { FC, useEffect, useState } from "react";
import styles from "./MyInactiveAds.module.css";
import MyAdvertList from "../MyAdvertList/MyAdvertList";
import { CommonPagination } from "@/components/ui/CommonPagination/CommonPagination";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getUserInactiveAdverts } from "@/redux/advertisement/operations";
import { selectUserInactiveAdverts } from "@/redux/advertisement/selectors";

export const MyInactiveAds: FC = () => {
  const dispatch = useAppDispatch();
  const activeAdsList = useAppSelector(selectUserInactiveAdverts);
  const [section, setSection] = useState("SELL");
  const [page, setPage] = useState(1);

  const currentList = activeAdsList
    .filter((elem) => elem.section === section)
    .slice((page - 1) * 8, (page - 1) * 8 + 8);

  useEffect(() => {
    dispatch(getUserInactiveAdverts());
  }, [dispatch]);

  const handleBuy = () => {
    setSection("BUY");
  };

  const handleSell = () => {
    setSection("SELL");
  };

  return (
    <section className={styles.myActiveAdsContainer}>
      <ul className={styles.buttonList}>
        <li>
          <button onClick={handleBuy}>Куплю</button>
          {section === "BUY" && <div className={styles.toggle}></div>}
        </li>
        <li>
          <button onClick={handleSell}>Продам</button>
          {section === "SELL" && <div className={styles.toggle}></div>}
        </li>
      </ul>
      <MyAdvertList advertList={currentList} />
      <CommonPagination
        page={page}
        pages={Math.ceil(activeAdsList.length / 8)}
        changePage={setPage}
      />
    </section>
  );
};

export default MyInactiveAds;
