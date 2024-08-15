"use client";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Banner from "../Banner/Banner";
import { bannerItems } from "@/mock-data/bannerItems";
import { nanoid } from "nanoid";

const SliderComponent = () => {
  const settings = {
    className: "center",
    dots: true,
    arrows: false,
    centerMode: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 478,
        settings: {
          dots: false,
          centerPadding: "9%",
        },
      },
      {
        breakpoint: 768,
        settings: {
          dots: false,
          centerPadding: "16%",
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
