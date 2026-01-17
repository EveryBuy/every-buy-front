import React from "react";
import Image from "next/image";
import styles from "./AdverPreviewModal.module.scss";
import type { FormValues } from "@/types/adverFormType";
import { Backdrop } from "@mui/material";
import AdverPreviewSlider from "../AdverPreviewSlider/AdverPreviewSlider";
import { useAppSelector } from "@/redux/store";
import { selectUser } from "@/redux/auth/selectorsAuth";
import Close from "@/assets/Svg/xClose.svg";
import DeliveryMethodsPreview from "../DeliveryMethodsPreview/DeliveryMethodsPreview";
import PreviewHeader from "../PreviewHeader/PreviewHeader";
import LocationPreview from "../LocationPreview/LocationPreview";
import SellerPreview from "../SellerPreview/SellerPreview";
import PreviewActions from "../PreviewActions/PreviewActions";
import DescriptionPreview from "../DescriptionPreview/DescriptionPreview";
import PreviewPrice from "../PreviewPrice/PreviewPrice";

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

  console.log("user", user);
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
        >
          <Image src={Close} alt="close page" width={18} height={18} />
        </button>
        <div className={styles.container}>
          <div className={styles.grid}>
            <AdverPreviewSlider images={images} />

            <div className={styles.info}>
              <div className={styles.pubDate}>
                Опубліковано {new Date().toLocaleDateString("uk-UA")}
              </div>

              <PreviewHeader title={values.title} section={values.section} productType={values.productType}/>

              <PreviewPrice
                price={values.price}
                isNegotiable={values.isNegotiable}
                priceType={values.priceType}
              />

              <DeliveryMethodsPreview methods={values.deliveryMethods} />

              <LocationPreview location={values.location} />

              <SellerPreview
                avatar={userPictureUrl}
                name={user?.fullName || ""}
              />

              <PreviewActions onClose={onClose} onPublish={onPublish} />
            </div>
          </div>
        </div>
        <DescriptionPreview description={values.description} />
      </div>
    </Backdrop>
  );
};

export default AdverPreviewModal;
