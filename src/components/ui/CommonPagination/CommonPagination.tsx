"use client";

import Image from "next/image";
import angleCircle from "@/assets/Svg/angle-circle-right.svg";
import clsx from "clsx";
import styles from "./CommonPagination.module.css";
import { FC, useState } from "react";

type CommonPaginationProps = {
  page: number;
  pages: number;
  changePage: (number: number) => void;
};

export const CommonPagination: FC<CommonPaginationProps> = ({
  page,
  pages,
  changePage,
}) => {
  //   const [activePage, setActivePage] = useState(page);
  const array = Array.from({ length: pages }, (_, index) => index + 1);

  const handleClick = (number: number) => {
    changePage(number);
    // setActivePage(number);
  };

  const handleDecrement = () => {
    if (page > 1) {
      changePage(page - 1);
    }
  };

  const handleIncrement = () => {
    if (page < pages) {
      changePage(page + 1);
    }
  };

  return pages > 1 ? (
    <section className={styles.paginationSection}>
      <button
        className={clsx(styles.angleCircle, styles.angleCircleLeft)}
        onClick={handleDecrement}
      >
        <Image
          src={angleCircle}
          alt="Pagination left button"
          width={24}
          height={24}
        />
      </button>
      <ul className={styles.list}>
        {array.map((elem, idx) => (
          <li key={idx}>
            <button
              className={elem === page ? styles.selectedPage : styles.page}
              onClick={() => {
                handleClick(elem);
              }}
            >
              {elem}
            </button>
          </li>
        ))}
      </ul>
      <button className={styles.angleCircle} onClick={handleIncrement}>
        <Image
          src={angleCircle}
          alt="Pagination left button"
          width={24}
          height={24}
        />
      </button>
    </section>
  ) : null;
};
