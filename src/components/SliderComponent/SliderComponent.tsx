"use client";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "./SliderComponent.module.scss";
import { useRef } from "react";
import Banner from "../Banner/Banner";
import { bannerItems } from "@/mock-data/bannerItems";
import { nanoid } from "nanoid";

const SliderComponent = () => {
  // const slider = useRef(null); ref={slider}
  const settings = {
    className: "center",
    dots: true,
    centerMode: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: false,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {bannerItems.map((item) => (
        <div className={styles.bannerContainer} key={nanoid()}>
          <Banner item={item} />
        </div>
      ))}
    </Slider>
  );
};

export default SliderComponent;
