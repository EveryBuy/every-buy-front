"use client";

import { FC, useState } from "react";
import { RootState, useAppSelector } from "@/redux/store";
import { CommonButton, ComplaintModal } from "@/components";
import styles from "./Complaint.module.scss";

const Complaint: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const advertisementById = useAppSelector(
    (state: RootState) => state.advertisement.activeAdvertisement
  );

  const handleOpenModal = () => {
    setIsModalOpen(true);
    resetModalState();
  };

  const resetModalState = () => {
    setSelectedReason(null);
    setIsSubmitting(false);
    setSubmitted(false);
  };

  if (!advertisementById) return null;

  return (
    <div>
      <div className={styles.reportButton}>
        <CommonButton
          className={styles.reportBtn}
          title="Поскаржитись"
          onClick={handleOpenModal}
          type="button"
        />
      </div>

      {isModalOpen && (
        <ComplaintModal
          selectedReason={selectedReason}
          isSubmitting={isSubmitting}
          submitted={submitted}
          setSelectedReason={setSelectedReason}
          setIsSubmitting={setIsSubmitting}
          setSubmitted={setSubmitted}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default Complaint;
