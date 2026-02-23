"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ImgStub from "@/assets/Svg/imgStub.svg";
import styles from "./AdverPhotoList.module.scss";
import ArrowTurnLeft from "@/assets/Svg/turnLeft.svg";
import ArrowTurnRight from "@/assets/Svg/turnRight.svg";
import Delete from "@/assets/Svg/delete.svg";
import { toast, Zoom, ToastPosition, ToastOptions } from "react-toastify";
import { useFormikContext } from "formik";

const MAX_PHOTOS = 10;
const MAX_FILE_SIZE_MB = 5;

const toastMessage: ToastOptions = {
  position: "top-center" as ToastPosition,
  autoClose: 1500,
  theme: "colored",
  transition: Zoom,
};

export interface AdverPhoto {
  file: File;
  url: string;
  rotation: number;
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
        `Розмір файлу не повинен перевищувати ${MAX_FILE_SIZE_MB} МБ.`,
        toastMessage,
      );

      return false;
    }
    return true;
  };

  const handleAddPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    const files = fileInput.files;

    if (!files || files.length === 0) return;

    const validFiles: AdverPhoto[] = [];

    for (const file of Array.from(files)) {
      if (images.length + validFiles.length >= MAX_PHOTOS) {
        toast.error("Ви не можете додати більше 10 фотографій.", toastMessage);
        break;
      }

      if (!validateFile(file)) continue;

      const url = URL.createObjectURL(file);
      validFiles.push({ file, url, rotation: 0 });
    }

    if (validFiles.length > 0) {
      setImages((prev) => [...prev, ...validFiles]);
      toast.success(
        validFiles.length === 1
          ? "Зображення успішно завантажено!"
          : `Зображення (${validFiles.length}) успішно завантажено!`,
        toastMessage,
      );
    }

    fileInput.value = "";
  };

  const handleRemovePhoto = (index: number) => {
    const removedImage = images[index];
    URL.revokeObjectURL(removedImage.url);
    setImages((prev) => prev.filter((_, i) => i !== index));
    toast.success("Зображення успішно видалено!", toastMessage);
  };

  const handleRotateRight = (index: number) => {
    setImages((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        rotation: (updated[index].rotation + 1) % 4,
      };
      return updated;
    });
  };

  const handleRotateLeft = (index: number) => {
    setImages((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        rotation: (updated[index].rotation + 3) % 4,
      };
      return updated;
    });
  };

  const handleDrag = (
    event: React.DragEvent<HTMLLIElement>,
    sourceIndex: number,
    destinationIndex: number,
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

    if (destinationIndex === 0 && sourceIndex !== 0) {
      toast.success("Фото встановлено як обкладинку!", toastMessage);
    }
  };

  const canAddMore = images.length < MAX_PHOTOS;
  const { setFieldValue, errors, touched, submitCount } = useFormikContext<any>();
  useEffect(() => {
    setFieldValue("images", images);
  }, [images, setFieldValue]);
  const showError = !!(errors.images && (touched.images || submitCount > 0));

  return (
    <section className={styles.adverPhoto}>
      <p
        style={{ fontSize: "20px", fontWeight: "normal", marginBottom: "12px" }}
      >
        Фото<span style={{ color: "#C21919" }}>*</span>
      </p>
      {showError && (
        <span className={styles.errorText}>{errors.images as string}</span>
      )}
      <p>
        Максимально допустимий розмір фотографії
        <span> {MAX_FILE_SIZE_MB} мб.</span> Допустимий формат{" "}
        <span>jpg, jpeg, png.</span>
      </p>
      <ul
        className={styles.adverPhotoList}
        onDragOver={(e) => e.preventDefault()}
      >
        {canAddMore && (
          <li className={styles.adverPhotoItem}>
            <label className={styles.labelAddPhoto}>
              <p className={styles.title}>Додати фото</p>
              <input
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                onChange={handleAddPhoto}
              />
            </label>
          </li>
        )}
        {images.map((img, index) => {
          const rotationDeg = img.rotation * 90;
          return (
            <li
              key={index}
              draggable
              onDragStart={(event) =>
                event.dataTransfer.setData("index", index.toString())
              }
              onDrop={(event) =>
                handleDrag(
                  event,
                  Number(event.dataTransfer.getData("index")),
                  index,
                )
              }
              className={styles.photoItem}
            >
              <div className={styles.photoWrapper}>
                <Image
                  src={img.url}
                  alt={`Photo ${index + 1}`}
                  fill
                  style={{
                    transform: `rotate(${rotationDeg}deg)`,
                    transition: "transform 0.3s ease",
                  }}
                />
                <div className={styles.photoActions}>
                  <button
                    type="button"
                    title="Видалити"
                    onClick={() => handleRemovePhoto(index)}
                  >
                    <Image src={Delete} alt="delete" width={22} height={22} />
                  </button>

                  <div className={styles.rotateButtons}>
                    <button
                      type="button"
                      onClick={() => handleRotateLeft(index)}
                      title="Повернути вліво"
                    >
                      <Image
                        src={ArrowTurnLeft}
                        alt="rotate left"
                        width={22}
                        height={22}
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRotateRight(index)}
                      title="Повернути вправо"
                    >
                      <Image
                        src={ArrowTurnRight}
                        alt="rotate right"
                        width={22}
                        height={22}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
        {Array.from({
          length: MAX_PHOTOS - (images.length + (canAddMore ? 1 : 0)),
        }).map((_, i) => (
          <li key={`stub-${i}`}>
            <Image
              priority
              src={ImgStub}
              alt="placeholder"
              width={58}
              height={46}
            />
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
