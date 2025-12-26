import React from "react";
import Image from "next/image";
import styles from "./AdverPreviewModal.module.scss";
import type { FormValues } from "@/types/adverFormType";
import { Backdrop } from "@mui/material";
import AdverPreviewSlider from "../AdverPreviewSlider/AdverPreviewSlider";
import { useAppSelector } from "@/redux/store";
import { selectUser } from "@/redux/auth/selectorsAuth";

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
  const user = useAppSelector(selectUser);
  const userPictureUrl = user?.userPhotoUrl || "/images/user.png";
  const sectionLabelMap: Record<string, string> = {
    SELL: "Продаж",
    BUY: "Купівля",
  };

  console.log("values", values);
  if (!open) return null;
  return (
    <Backdrop
      open={open}
      onClick={onClose}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: "rgba(0,0,0,0.14)",
        width: "100%",
      }}
    >
      <div
        className={styles.previewModal}
        style={{
          maxWidth: "1600px",
          width: "96vw",
          height: "94vh",
          maxHeight: "96vh",
          borderRadius: "22px",
          background: "#fff",
          boxShadow: "0 8px 44px #0002",
          display: "flex",
          flexDirection: "column",
          padding: "36px 40px 24px 40px",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
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
            cursor: "pointer",
          }}
        >
          <svg width={22} height={22} viewBox="0 0 22 22">
            <line x1="5" y1="5" x2="17" y2="17" stroke="#333" strokeWidth={2} />
            <line x1="17" y1="5" x2="5" y2="17" stroke="#333" strokeWidth={2} />
          </svg>
        </button>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* Left: Images */}
            <AdverPreviewSlider images={images} />

            {/* Right: Info */}
            <div className={styles.info}>
              <div className={styles.pubDate}>
                Опубліковано {new Date().toLocaleDateString("uk-UA")}
              </div>

              <div className={styles.wrapper}>
                <h3 className={styles.title}>{values.title || values.title}</h3>
                <div>
                  <h4 className={styles.label}>{sectionLabelMap[values.section] || ""}</h4>
                </div>
              </div>
              <div className={styles.price}>
                {values.price ? `${values.price} грн` : "Договірна"}
              </div>
              <div className={styles.deliveryBlock}>
                <div className={styles.deliveryTitle}>Спосіб доставки</div>
                <div className={styles.deliveryVal}>
                  {(values.deliveryMethods || [])
                    .map((d) => deliveryNameMap[d] || d)
                    .join(", ")}
                </div>
              </div>

              <div className={styles.descBlock}>
                <div className={styles.cityBlock}>
                  <span>Місцезнаходження</span>
                  <span>
                    {/*  svg-іконку location*/}
                    {values.location}
                  </span>
                </div>
              </div>
              <div className={styles.sellerBlock}>
                <div className={styles.sellerTitle}>Продавець</div>
                {/* Тестовий продавець, можна винести у пропси */}
                <div className={styles.sellerInfo}>
                  <Image
                    src={userPictureUrl}
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
        </div>
        <div className={styles.descriptionWrapper}>
          <p className={styles.descriptionTitle}>Опис</p>
          <textarea
            className={styles.descriptionReadonly}
            value={values.description || ""}
            readOnly
          />
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
