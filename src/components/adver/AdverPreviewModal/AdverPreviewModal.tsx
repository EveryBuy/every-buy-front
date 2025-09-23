import React from "react";
import Image from "next/image";
import styles from "./AdverPreviewModal.module.scss";
import type { FormValues } from "@/types/adverFormType"; // або твій шлях
import { Backdrop } from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  values: FormValues;
  images: { file: File; url: string }[];
  onPublish?: () => void;
};

const AdverPreviewModal: React.FC<Props> = ({
  open,
  onClose,
  values,
  images,
  onPublish,
}) => {

  if (!open) return null;
  return (
     <Backdrop
      open={open}
      onClick={onClose}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: "rgba(0,0,0,0.14)"
      }}
    >
      <div
        className={styles.previewModal}
        style={{
          maxWidth: "1080px",
          width: "98vw",
          maxHeight: "96vh",
          minHeight: "360px",
          borderRadius: "22px",
          background: "#fff",
          boxShadow: "0 8px 44px #0002",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          padding: "36px 40px 24px 40px",
          position: "relative",
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          className={styles.closeButton}
          type="button"
          onClick={onClose}
          style={{
            position: "absolute",
            top: 19,
            right: 22,
            zIndex: 2,
            background: "transparent",
            border: "none",
            cursor: "pointer"
          }}
        >
          <svg width={22} height={22} viewBox="0 0 22 22">
            <line x1="5" y1="5" x2="17" y2="17" stroke="#333" strokeWidth={2}/>
            <line x1="17" y1="5" x2="5" y2="17" stroke="#333" strokeWidth={2}/>
          </svg>
        </button>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left: Images */}
          <div className={styles.gallery}>
            {/* Main image */}
            {images.length > 0 ? (
              <div className={styles.mainImg}>
                <Image
                  src={images[0].url}
                  alt="main photo"
                  width={540}
                  height={470}
                />
              </div>
            ) : (
              <div className={styles.mainImgEmpty}>Фото не додано</div>
            )}
            {/* Small images */}
            <div className={styles.thumbs}>
              {images.map((img, i) => (
                <Image
                  src={img.url}
                  width={123}
                  height={132}
                  alt={`photo${i}`}
                  key={i}
                  className={styles.thumb}
                  style={i === 0 ? { border: "2px solid #B6D8FF" } : {}}
                />
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className={styles.info}>
            <div className={styles.pubDate}>
              Опубліковано {new Date().toLocaleDateString("uk-UA")}
            </div>
            <h2 className={styles.title}>{values.title || values.product}</h2>
            <div className={styles.price}>
              Вартість
              <br />
              <span>{values.price ? `${values.price} грн` : "Договірна"}</span>
            </div>
            <div className={styles.deliveryBlock}>
              <div className={styles.deliveryTitle}>Спосіб доставки</div>
              <div className={styles.deliveryVal}>
                {(values.deliveryMethods || [])
                  .map((d) => deliveryNameMap[d] || d)
                  .join(", ")}
              </div>
            </div>
            <div className={styles.btns}>
              <button className={styles.msgBtn}>Надіслати повідомлення</button>
              <button className={styles.telBtn}>Показати телефон</button>
            </div>
            <div className={styles.descBlock}>
              <div className={styles.descLabel}>Опис</div>
              <div className={styles.desc}>{values.description}</div>
              <div className={styles.cityBlock}>
                <span>Місцезнаходження</span>
                <div>
                  {/* можеш вставити svg-іконку location тут */}
                  {values.location}
                </div>
              </div>
            </div>
            <div className={styles.sellerBlock}>
              <div className={styles.sellerTitle}>Продавець</div>
              {/* Тестовий продавець, можна винести у пропси */}
              <div className={styles.sellerInfo}>
                <Image
                  src="/avatar.jpg"
                  width={48}
                  height={48}
                  alt="seller"
                  className={styles.sellerImg}
                />
                <div>
                  <div className={styles.sellerName}>Вікторія</div>
                  <div className={styles.sellerStatus}>
                    <span className={styles.greenDot} /> Зараз онлайн
                  </div>
                </div>
              </div>
              <button className={styles.allSellerAdBtn}>
                Усі оголошення автора
              </button>
            </div>
          </div>
        </div>
        <div className={styles.modalActions}>
          <button
            className={styles.editBtn}
            type="button"
            onClick={onClose}
          >
            Редагувати
          </button>
          <button
            className={styles.publishBtn}
            type="submit"
            onClick={onPublish}
          >
            Опублікувати
          </button>
        </div>
        </div>
      </div>
    </Backdrop>
  );
};

// Мапінг коду доставки у назву
const deliveryNameMap: Record<string, string> = {
  NOVA_POST: "Нова пошта",
  UKR_POST: "Укрпошта",
  Meest_Express: "Meest Express",
  Other: "Інше",
};

export default AdverPreviewModal;
