"use client";

import Slider from "react-slick";
import styles from "./slider.module.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useRef, useState } from "react";
import { bannerItems } from "@/mock-data/bannerItems";
import { nanoid } from "nanoid";

const AnnouncementSlider = () => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [activeSlide, setActiveSlide] = useState(1);

  const sliderRef1 = useRef(null);
  const sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1.current);
    setNav2(sliderRef2.current);
  }, []);

  const downSettings = {
    arrows: false,
    centerPadding: "0px",
    centerMode: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: true,
    initialSlide: 1,
    beforeChange: (oldIndex, newIndex) => {
      setActiveSlide(newIndex);
    },
  };

  const handleSlideClick = (index) => {
    setActiveSlide(index);
    sliderRef1.current.slickGoTo(index);
    sliderRef2.current.slickGoTo(index);
  };

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.upSlider}>
        <Slider
          asNavFor={nav2}
          ref={sliderRef1}
          slidesToShow={1}
          swipeToSlide={true}
          focusOnSelect={false}
          initialSlide={activeSlide}
          centerMode={true}
          centerPadding="0px"
        >
          {bannerItems.map(({ backgroundImages }, index) => (
            <div className={styles.item} key={nanoid()}>
              <img
                className={styles.image}
                src={`${backgroundImages.laptop2x}`}
                alt={`Slide ${index}`}
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className={styles.downSlider}>
        <Slider
          {...downSettings}
          asNavFor={nav1}
          ref={sliderRef2}
          swipeToSlide={true}
          initialSlide={activeSlide}
          beforeChange={(oldIndex, newIndex) => {
            handleSlideClick(newIndex);
          }}
        >
          {bannerItems.map(({ backgroundImages }, index) => (
            <div
              className={styles.item}
              key={nanoid()}
              onClick={() => handleSlideClick(index)}
            >
              <img
                className={styles.image}
                src={`${backgroundImages.laptop2x}`}
                alt={`Slide ${index}`}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default AnnouncementSlider;
