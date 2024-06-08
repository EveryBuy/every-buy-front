"use client";
import Slider from "react-slick";
import styles from "./SliderComponent.module.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import Banner from "../Banner/Banner";
import { bannerItems } from "@/mock-data/bannerItems";
import { nanoid } from "nanoid";

const SliderComponent = () => {
  // const slider = useRef(null); ref={slider}
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {bannerItems.map((item) => (
        <Banner item={item} key={nanoid()} />
      ))}
    </Slider>
  );
};

export default SliderComponent;
