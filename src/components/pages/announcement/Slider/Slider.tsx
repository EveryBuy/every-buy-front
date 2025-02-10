"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useRef, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { Settings } from "react-slick";
import { nanoid } from "nanoid";
import styles from "./Slider.module.scss";

interface AnnouncementSliderProps {
  images: string[]; 
}

const AnnouncementSlider: React.FC<AnnouncementSliderProps> = ({ images }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);

  const handlePreviewClick = (index: number) => {
    setActiveSlide(index);
    sliderRef.current?.slickGoTo(index);
  };

  const sliderSettings: Settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    infinite: false,
    speed: 500,
    beforeChange: (current, next) => setActiveSlide(next),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className={styles.sliderContainer}>
      {/* Main slider */}
      <div className={styles.mainSlider}>
        <Slider {...sliderSettings} ref={sliderRef}>
          {images.map((imageUrl, index) => (
            <div key={nanoid()} className={styles.mainSlide}>
              <Image
                className={styles.image}
                src={imageUrl}
                alt={`Slide ${index}`}
                width={375}
                height={260}
                priority
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Preview thumbnails */}
      <div className={styles.previewContainer}>
        {images.map((imageUrl, index) => (
          <div
            key={nanoid()}
            className={`${styles.previewItem} ${index === activeSlide ? styles.active : ""
              }`}
            onClick={() => handlePreviewClick(index)}
          >
            <Image
              className={styles.previewImage}
              src={imageUrl}
              alt={`Preview ${index}`}
              width={94}
              height={105}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementSlider;
