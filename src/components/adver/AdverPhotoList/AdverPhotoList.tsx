"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ImgStub from "@/assets/Svg/imgStub.svg";
import styles from "./AdverPhotoList.module.scss";
import { PiBandaidsDuotone } from "react-icons/pi";
import { toast, Zoom, ToastPosition, ToastOptions } from "react-toastify";

const MAX_PHOTOS = 9;
const MAX_FILE_SIZE_MB = 5;

const toastMessage: ToastOptions = {
  position: "top-center" as ToastPosition,
  autoClose: 1500,
  theme: "colored",
  transition: Zoom,
};

interface AdverPhoto {
  file: File;
  url: string;
}
interface AdverPhotoListProps {
  images: AdverPhoto[];
  setImages: React.Dispatch<React.SetStateAction<AdverPhoto[]>>;
}

const AdverPhotoList: React.FC<AdverPhotoListProps> = ({
  images,
  setImages,
}) => {
  const validateFile = (file: File): boolean => {
    if (!file.type.startsWith("image/")) {
      toast.error("Невірний формат файлу.", toastMessage);
      return false;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      toast.error(
        `Розмір файлу не повинен перевищувати ${MAX_FILE_SIZE_MB}МБ.`,
        toastMessage
      );
      return false;
    }
    return true;
  };

  const handleAddPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (images.length >= MAX_PHOTOS) {
      console.log('too mach');
      
      toast.error("Ви не можете додати більше 9 фотографій.", toastMessage);
      return;
    }

    const fileInput = event.target;
    const file = fileInput.files?.[0];
    if (file) {
      if (!validateFile(file)) {
        return;
      }

      const url = URL.createObjectURL(file);
      setImages((prev) => [...prev, { file, url }]);
      toast.success("Зображення успішно завантажено!", toastMessage);
    }
    fileInput.value = "";
  };

  const handleRemovePhoto = (index: number) => {
    const removedImage = images[index];
    URL.revokeObjectURL(removedImage.url);
    setImages((prev) => prev.filter((_, i) => i !== index));
    toast.success("Зображення успішно видалено!", toastMessage);
  };

  const handleDrag = (
    event: React.DragEvent<HTMLLIElement>,
    sourceIndex: number,
    destinationIndex: number
  ) => {
    event.preventDefault();
    if (
      destinationIndex < 0 ||
      destinationIndex >= images.length ||
      sourceIndex === destinationIndex
    )
      return;

    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(sourceIndex, 1);
    updatedImages.splice(destinationIndex, 0, movedImage);
    setImages(updatedImages);
  };
  console.log(images);
  return (
    <section className={styles.adverPhoto}>
      <h3>Фото</h3>
      <p>
        Максимально допустимий розмір фотографії
        <span>{" "} {MAX_FILE_SIZE_MB} мб</span>
      </p>

      <ul
        className={styles.adverPhotoList}
        onDragOver={(e) => e.preventDefault()}
      >
        <li className={styles.adverPhotoItem}>
          <label>
            <p>Додати фото</p>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAddPhoto}
            />
          </label>
        </li>

        {Array.from({ length: MAX_PHOTOS }, (_, index) => (
          <li
            key={index}
            draggable={index < images.length}
            onDragStart={(event) =>
              event.dataTransfer.setData("index", index.toString())
            }
            onDrop={(event) =>
              handleDrag(
                event,
                Number(event.dataTransfer.getData("index")),
                index
              )
            }
          >
            {index < images.length ? (
              <>
                <Image
                  src={images[index].url}
                  alt={`Photo ${index + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => handleRemovePhoto(index)}
                >
                  <PiBandaidsDuotone className={styles.removeButtonIcon} />
                  <span className={styles.tooltipText}>Видалити</span>
                </button>
              </>
            ) : (
              <Image
                priority
                src={ImgStub}
                alt="placeholder"
                width={58}
                height={46}
              />
            )}
          </li>
        ))}
      </ul>

      <p className={styles.adverPhotoListText}>
        Обкладинкою оголошення стане перше фото. Перемістіть його, щоб змінити
        послідовність зображень.
      </p>
    </section>
  );
};

export default AdverPhotoList;
