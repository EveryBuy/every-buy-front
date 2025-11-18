"use client";

import CommonButton from "@/components/ui/CommonButton/CommonButton";
import { CommonModal } from "@/components";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "./SuccessCreateModal.module.scss";
import Done from "@/assets/Svg/done-ring.svg";
import Logo from "@/assets/logo-header-black.svg";
import Image from "next/image";

const SuccessCreateModal: React.FC = () => {
  const router = useRouter();

  const handleClose = () => router.push("/");

  return (
    <CommonModal onClose={handleClose} contentClassName={styles.modalWrapper}>
      <div className={styles.boxLogo}>
        <Image src={Logo} alt="done" width={66} height={38} />
        <Image src={Done} alt="done" width={42} height={42} />
      </div>
      <div>
        <h4 className={styles.registerModalTitle}>
          Ваше оголошення успішно опубліковано!
        </h4>
        <p className={styles.registerModalText}>
          Оголошення додане та доступне для перегляду
        </p>
      </div>
      <div className= {styles.boxBtn}>
        <CommonButton
          type="button"
          title="На головну сторінку"
          color="yellow"
          className={styles.primaryButton}
          onClick={handleClose}
        />
        <CommonButton
          type="button"
          title="До своїх оголошень"
          className={styles.secondaryButton}
          onClick={() => router.push("/user/my-ads/active-ads")}
        />{" "}
      </div>
    </CommonModal>
  );
};

export default SuccessCreateModal;
