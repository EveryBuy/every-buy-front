"use client";
import React, { useState } from "react";
import Image from "next/image";
import ImgStub from "@/assets/Svg/imgStub.svg";
import styles from "./AdverPhotoList.module.scss";
import { PiBandaidsDuotone } from "react-icons/pi";

import { toast, Zoom, ToastPosition, ToastOptions } from "react-toastify";
// import { toast } from "react-hot-toast";

const MAX_PHOTOS = 9;
const MAX_FILE_SIZE_MB = 5;

const toastMessage: ToastOptions = {
  position: "top-center" as ToastPosition,
  autoClose: 1500,
  theme: "colored",
  transition: Zoom,
};

// const toastSuccess: ToastOptions = {
//   position: "top-center" as ToastPosition,
//   autoClose: 1500,
//   theme: "colored",
//   transition: Zoom,
// };

// const toastError: ToastOptions = {
//   position: "top-center" as ToastPosition,
//   autoClose: 1500,
//   theme: "colored",
//   transition: Zoom,
// };

const AdverPhotoList: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  // const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateFile = (file: File, input: HTMLInputElement): boolean => {
    // Перевіряемо тип файлу
    if (!file.type.startsWith("image/")) {
      toast.error("Невірний формат файлу.", toastMessage);
      return false;
    }
    // Перевіряемо розмір файлу
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      toast.error(
        `Розмір файлу не повинен перевищувати ${MAX_FILE_SIZE_MB}МБ.`,
        toastMessage
      );
      input.value = ""; // Збрасуємо значення input

      return false;
    }
    return true;
  };

  // Обробка загрузки файлу
  const handleAddPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (images.length >= MAX_PHOTOS) {
      toast.error("Вы не можете добавить более 9 фотографий.", toastMessage);
      return;
    }
    const fileInput = event.target; // Сохраняем ссылку на input
    const file = fileInput.files?.[0];
    // const file = event.target.files?.[0];
    if (file) {
      if (!validateFile(file, fileInput)) {
        // validateFile внутри будет использовать toast для вывода ошибок
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setImages((prev) => [...prev, reader.result as string]);
        toast.success("Зображення успішно завантажено!", toastMessage);
        fileInput.value = ""; // Збрасуємо значення input
      };
      reader.readAsDataURL(file);
    } else {
      fileInput.value = ""; // Збрасуємо значення input, якщо файл не вибрано
    }
  };

  // Обробка видалення файлу
  const handleRemovePhoto = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    toast.success("Зображення успішно видалено!", toastMessage);
  };

  // Обробка перетаскування файлу HTMLLIElement HTMLUListElement
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

  return (
    <section className={styles.adventPhoto}>
      <h3>Фото</h3>
      <p>
        Максимально допустимий розмір фотографії
        <span>{MAX_FILE_SIZE_MB}мб</span>
      </p>

      {/* {errorMessage && (
        <p className={styles.errorMessage}>{errorMessage} ошибкаРРРРРРРРР</p>
      )} */}

      <ul
        className={styles.adventPhotoList}
        onDragOver={(e) => e.preventDefault()} // Разрешить перетаскивание
      >
        {/* Перший элемент списку "Додати фото" */}
        <li className={styles.adventPhotoItem}>
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

        {/* Інші 9 елементів списку */}
        {Array.from({ length: MAX_PHOTOS }, (_, index) => (
          <li
            key={index}
            // className={styles.adventPhotoItem}
            draggable={index < images.length} // Перетаскивать только если есть фото
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
                <img
                  src={images[index]}
                  alt={`Photo ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                <button
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

      <p className={styles.adventPhotoListText}>
        Обкладинкою оголошення стане перше фото. Перемістіть его, щоб змінити
        послідовність зображень.
      </p>
    </section>
  );
};

export default AdverPhotoList;

// ==========================================
// import React, { useState } from "react";
// import Image from "next/image";
// import ImgStub from "@/assets/Svg/imgStub.svg";
// import UlComponent from "../../ui/UlComponent/UlComponent";
// import styles from "./AdverPhotoList.module.scss";

// const MAX_FILE_SIZE_MB = 5;

// const AdverPhotoList = () => {
//   const [photos, setPhotos] = useState(Array(9).fill(ImgStub));

//   const handleAddPhotoClick = () => {
//     const input = document.createElement("input");
//     input.type = "file";
//     input.accept = "image/jpeg, image/png, image/webp";

//     input.onchange = (event) => {
//       const file = (event.target as HTMLInputElement).files?.[0];
//       if (file) {
//         if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
//           alert("Размер файла не должен превышать 5МБ!");
//           return;
//         }
//         if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
//           alert("Недопустимый тип файла! Разрешены JPEG, PNG, WEBP.");
//           return;
//         }
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           const newPhotos = [...photos];
//           const emptyIndex = newPhotos.findIndex((photo) => photo === ImgStub);
//           if (emptyIndex !== -1) {
//             newPhotos[emptyIndex] = e.target?.result as string;
//             setPhotos(newPhotos);
//           } else {
//             alert("Вы уже добавили максимальное количество фото.");
//           }
//         };
//         reader.readAsDataURL(file);
//       }
//     };

//     input.click();
//   };

//   const handleDragStart = (e: React.DragEvent, index: number) => {
//     e.dataTransfer.setData("text/plain", index.toString());
//   };

//   const handleDrop = (e: React.DragEvent, index: number) => {
//     e.preventDefault();
//     const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
//     const newPhotos = [...photos];
//     const [draggedPhoto] = newPhotos.splice(draggedIndex, 1);
//     newPhotos.splice(index, 0, draggedPhoto);
//     setPhotos(newPhotos);
//   };

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//   };

//   const items = [
//     {
//       content: (
//         <div className={styles.adventPhotoAdd} onClick={handleAddPhotoClick}>
//           <p>Додати фото</p>
//         </div>
//       ),
//       extraClass: styles.adventPhotoItem,
//     },
//     ...photos.map((photo, index) => ({
//       content: (
//         <div
//           draggable
//           onDragStart={(e) => handleDragStart(e, index)}
//           onDrop={(e) => handleDrop(e, index)}
//           onDragOver={handleDragOver}
//           className={styles.adventPhotoWrapper}
//         >
//           <Image
//             priority
//             src={photo}
//             alt={`Фото ${index + 1}`}
//             width={58}
//             height={46}
//             style={{ objectFit: "cover" }}
//           />
//         </div>
//       ),
//       // extraClass: styles.adventPhotoItem,
//     })),
//   ];

//   return (
//     <section className={styles.adventPhoto}>
//       <h3>Фото</h3>
//       <p>
//         Максимально допустимий розмір фотографії <span>5мб</span>
//       </p>
//       <UlComponent items={items} ulClassName={styles.adventPhotoList} />
//       <p className={styles.adventPhotoListText}>
//         Обкладинкою оголошення стане перше фото. Перемістіть його, щоб змінити
//         послідовність зображень.
//       </p>
//     </section>
//   );
// };

// export default AdverPhotoList;

// ==============================================================
// import { useState } from "react";
// import Image from "next/image";
// import ImgStub from "@/assets/Svg/imgStub.svg";
// import UlComponent from "../../ui/UlComponent/UlComponent";
// import styles from "./AdverPhotoList.module.scss";

// const MAX_FILE_SIZE_MB = 5;

// const AdverPhotoList = () => {
//   const [photos, setPhotos] = useState(Array(10).fill(ImgStub));

//   const handlePhotoClick = (index: number) => {
//     const input = document.createElement("input");
//     input.type = "file";
//     input.accept = "image/jpeg, image/png, image/webp";

//     input.onchange = (event) => {
//       const file = (event.target as HTMLInputElement).files?.[0];
//       if (file) {
//         if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
//           alert("Размер файла не должен превышать 5МБ!");
//           return;
//         }
//         if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
//           alert("Недопустимый тип файла! Разрешены JPEG, PNG, WEBP.");
//           return;
//         }
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           const newPhotos = [...photos];
//           newPhotos[index] = e.target?.result as string;
//           setPhotos(newPhotos);
//         };
//         reader.readAsDataURL(file);
//       }
//     };

//     input.click();
//   };

//   const handleDragStart = (e: React.DragEvent, index: number) => {
//     e.dataTransfer.setData("text/plain", index.toString());
//   };

//   const handleDrop = (e: React.DragEvent, index: number) => {
//     e.preventDefault();
//     const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
//     const newPhotos = [...photos];
//     const [draggedPhoto] = newPhotos.splice(draggedIndex, 1);
//     newPhotos.splice(index, 0, draggedPhoto);
//     setPhotos(newPhotos);
//   };

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//   };

//   const items = photos.map((photo, index) => ({
//     content: (
//       <div
//         draggable
//         onDragStart={(e) => handleDragStart(e, index)}
//         onDrop={(e) => handleDrop(e, index)}
//         onDragOver={handleDragOver}
//         onClick={() => handlePhotoClick(index)}
//         className={styles.adventPhotoWrapper}
//       >
//         <Image
//           priority
//           src={photo}
//           alt={`Фото ${index + 1}`}
//           width={58}
//           height={46}
//           style={{ objectFit: "cover" }}
//         />
//       </div>
//     ),
//     extraClass: styles.adventPhotoItem,
//   }));

//   return (
//     <section className={styles.adventPhoto}>
//       <h3>Фото</h3>
//       <p>
//         Максимально допустимий розмір фотографії <span>5мб</span>
//       </p>
//       <UlComponent items={items} ulClassName={styles.adventPhotoList} />
//       <p className={styles.adventPhotoListText}>
//         Обкладинкою оголошення стане перше фото. Перемістіть його, щоб змінити
//         послідовність зображень.
//       </p>
//     </section>
//   );
// };

// export default AdverPhotoList;

// ==========================================================================
// import Image from "next/image";
// import ImgStub from "@/assets/Svg/imgStub.svg";
// import UlComponent from "../../ui/UlComponent/UlComponent";
// import styles from "./AdverPhotoList.module.scss";

// const AdverPhotoList = () => {
//   const items = [
//     {
//       content: <p>Додати фото</p>,
//       extraClass: styles.adventPhotoItem, // Дополнительный класс для <li> с текстом
//     },
//     ...Array(9).fill({
//       content: (
//         <Image priority src={ImgStub} alt="icon down" width={58} height={46} />
//       ),
//     }),
//   ];

//   // const images = Array(9)
//   //   .fill(null)
//   //   .map((_, index) => ({
//   //     content: <Image src={ImgStub} alt="icon down" width={58} height={46} />, // Компонент Image в каждом <li>
//   //   }));

//   return (
//     <section className={styles.adventPhoto}>
//       <h3>Фото</h3>
//       <p>
//         Максимально допустимий розмір фотографії <span>5мб</span>
//       </p>

//       <UlComponent items={items} ulClassName={styles.adventPhotoList} />

//       {/* <ul className={styles.adventPhotoList}>
//         <li className={styles.adventPhotoItem}>
//           <p>Додати фото</p>
//         </li>
//         {[...Array(9)].map((_, idx) => (
//           <li key={idx}>
//             <Image
//               priority
//               src={ImgStub}
//               alt="icon down"
//               width={58}
//               height={46}
//             />
//           </li>
//         ))}
//       </ul> */}
//       <p className={styles.adventPhotoListText}>
//         Обкладинкою оголошення стане перше фото. Перемістіть його, щоб змінити
//         послідовність зображень.
//       </p>
//     </section>
//   );
// };

// export default AdverPhotoList;

// ===================================================================

// import Image from "next/image";
// import ImgStub from "@/assets/Svg/imgStub.svg";
// import styles from "./AdverPhotoList.module.scss";

// const AdverPhotoList = () => {
//   return (
//     <section className={styles.adventPhoto}>
//       <h3>Фото</h3>
//       <p>
//         Максимально допустимий розмір фотографії <span>5мб</span>
//       </p>
//       <ul className={styles.adventPhotoList}>
//         <li className={styles.adventPhotoItem}>
//           <p>Додати фото</p>
//         </li>
//         {[...Array(9)].map((_, idx) => (
//           <li key={idx}>
//             <Image
//               priority
//               src={ImgStub}
//               alt="icon down"
//               width={58}
//               height={46}
//             />
//           </li>
//         ))}
//       </ul>
//       <p className={styles.adventPhotoListText}>
//         Обкладинкою оголошення стане перше фото. Перемістіть його, щоб змінити
//         послідовність зображень.
//       </p>
//     </section>
//   );
// };

// export default AdverPhotoList;
