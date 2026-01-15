"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./AdverPreviewSlider.module.scss";

type GalleryImage = {
  file: File;
  url: string;
  rotation?: 0 | 1 | 2 | 3;
};

type Props = {
  images: GalleryImage[];
};

const VISIBLE_THUMBS = 4;
const SWIPE_THRESHOLD = 50;

const AdverPreviewSlider: React.FC<Props> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number | null>(null);

  /* ---------- auto scroll thumbs ---------- */
  useEffect(() => {
    if (!images.length) return;

    const thumbs = thumbsRef.current;
    if (!thumbs) return;

    const activeThumb = thumbs.children[activeIndex] as HTMLElement | undefined;
    activeThumb?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeIndex, images.length]);

  /* ---------- helpers ---------- */
  const rotationStyle = (rotation = 0) => ({
    transform: `rotate(${rotation * 90}deg)`,
  });

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  /* ---------- swipe main image ---------- */
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;

    const deltaX = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      deltaX > 0 ? prevImage() : nextImage();
    }

    startX.current = null;
  };

  if (!images.length) {
    return <div className={styles.mainImgEmpty}>Фото не додано</div>;
  }

  return (
    <div className={styles.slider}>
      {/* MAIN IMAGE */}
      <div
        className={styles.mainImgWrapper}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <Image
          src={images[activeIndex].url}
          alt="active photo"
          width={648}
          height={440}
          className={styles.mainImg}
          style={rotationStyle(images[activeIndex].rotation)}
          priority
        />
      </div>

      {/* THUMBS + ARROWS */}
      <div className={styles.thumbsContainer}>
        <button
          type="button"
          className={styles.thumbArrow}
          onClick={prevImage}
        >
          ‹
        </button>

        <div className={styles.thumbs} ref={thumbsRef}>
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              className={`${styles.thumbWrapper} ${
                i === activeIndex ? styles.active : ""
              }`}
              onClick={() => setActiveIndex(i)}
            >
              <Image
                src={img.url}
                alt={`thumb-${i}`}
                width={132}
                height={132}
                className={styles.thumb}
                style={rotationStyle(img.rotation)}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          className={styles.thumbArrow}
          onClick={nextImage}
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default AdverPreviewSlider;
