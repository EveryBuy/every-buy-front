"use client";

import { AdvertItem } from "@/types/myAdvertisementsTypes";
import MyAdvertItem from "../MyAdvertItem/MyAdvertItem";
import { FC, useEffect, useState } from "react";
import styles from "./MyAdvertList.module.css";
import { usePathname } from "next/navigation";

type AdvertList = {
  advertList: AdvertItem[];
};

export const MyAdvertList: FC<AdvertList> = ({ advertList }) => {
  const [isActivated, setIsActivated] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/user/my-ads/non-active-ads") {
      setIsActivated(false);
    }
  }, [pathname]);

  return (
    <section>
      <ul className={styles.listBox}>
        {advertList.map((elem) => (
          <li key={elem.id}>
            <MyAdvertItem item={elem} isActivated={isActivated} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MyAdvertList;
