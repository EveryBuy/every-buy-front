"use client";

import { FC, useEffect, useState } from "react";
import styles from "./MyActiveAds.module.css";
import MyAdvertList from "../MyAdvertList/MyAdvertList";
import { CommonPagination } from "@/components/ui/CommonPagination/CommonPagination";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getUserActiveAdverts } from "@/redux/advertisement/operations";
import { selectUserActiveAdverts } from "@/redux/advertisement/selectors";

// const activeAdsList = [
//   {
//     id: 1,
//     section: "SELL",
//     title: "Example Advertisement",
//     state: "нове",
//     price: 100,
//     userId: 123,
//     mainPhotoUrl: "https://everybuy.s3.eu-north-1.amazonaws.com/",
//     favouriteCount: 10,
//     view: 10,
//   },
// ];

const MyActiveAds: FC = () => {
  const dispatch = useAppDispatch();
  const activeAdsList = useAppSelector(selectUserActiveAdverts);
  const [section, setSection] = useState("SELL");
  const [page, setPage] = useState(1);

  const currentList = activeAdsList
    .filter((elem) => elem.section === section)
    .slice((page - 1) * 8, (page - 1) * 8 + 8);

  useEffect(() => {
    dispatch(getUserActiveAdverts());
  }, []);

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

export default MyActiveAds;
