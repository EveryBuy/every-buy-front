"use client";

import { FC, useState } from "react";
import { CommonButton } from "@/components";
import Image from "next/image";
import { Backdrop } from "@mui/material";
import xClose from "@/assets/Svg/xClose.svg";
import styles from "./ComplaintModal.module.scss";
// import { selectAdvertisementById } from "@/redux/advertisement/selectors";
import { RootState, useAppSelector, useAppDispatch } from "@/redux/store";

const ComplaintModal: FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedReason, setSelectedReason] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const advertisementById = useAppSelector((state: RootState) => state.advertisement.activeAdvertisement);

	const reasons = [
		"Спам",
		"Фейковий акаунт",
		"Насильство",
		"Порнографія",
		"Порушення авторського права",
		"Інше",
	];

	const handleOpenModal = () => {
		setIsModalOpen(true);
		resetModalState();
	};

	const resetModalState = () => {
		setSelectedReason(null);
		setIsSubmitting(false);
		setSubmitted(false);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const selectReason = (reason: string) => {
		setSelectedReason((prev) => (prev === reason ? null : reason));
	};

	const handleSubmit = () => {
		setIsSubmitting(true);
	};

	const handleConfirmSubmit = () => {
		setSubmitted(true);
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
				<Backdrop
					component="div"
					sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
					open={isModalOpen}
					onClick={handleCloseModal}
				>
					<div className={styles.box} onClick={(evt) => evt.stopPropagation()}>
						<button
							className={styles.closeButton}
							type="button"
							onClick={handleCloseModal}
						>
							<Image src={xClose} alt="close" width={18} height={18} />
						</button>
						<div className={styles.contentWrapper}>
							{submitted ? (
								<div>
									<h2 className={styles.confirmationTitle}>
										Дякуємо за звернення!
									</h2>
									<p className={styles.submissionText}>
										Ми проведемо перевірку та залежно від її результатів:
									</p>
									<ul>
										<li className={styles.submissionPoints}>
											Вилучимо контент, якщо він порушує правила.
										</li>
										<li className={styles.submissionPoints}>
											Встановимо обмеження, якщо контент не відповідає деяким
											правилам.
										</li>
										<li className={styles.submissionPoints}>
											Залишимо контент на Everybuy, якщо він не порушує правила.
										</li>
									</ul>
								</div>
							) : isSubmitting ? (
								<div className={styles.confirmation}>
									<h2 className={styles.confirmationTitle}>
										Ви впевнені, що хочете відправити скаргу?
									</h2>
									<p className={styles.confirmationContent}>Зміст скарги:</p>
									<ul>
										{selectedReason && (
											<li className={styles.confirmReasons}>
												{selectedReason}
											</li>
										)}
										<li className={styles.confirmReasons}>
											{`Предмет скарги: Оголошення "${advertisementById.title}" від
                      продавця ${advertisementById.userDto.fullName}.`}
										</li>
									</ul>
									<div className={styles.buttonContainer}>
										<CommonButton
											title="Ні, не відправляти"
											onClick={handleCloseModal}
											type="button"
											color="white"
											className={styles.modalButtonDecline}
										/>
										<CommonButton
											type="button"
											color="yellow"
											className={styles.modalButtonConfirm}
											title="Так, відправити"
											onClick={handleConfirmSubmit}
										/>
									</div>
								</div>
							) : (
								<div className={styles.reportReasons}>
									<h2 className={styles.modalTitle}>Вкажіть причину скарги</h2>
									<ul className={styles.modalReasons}>
										{reasons.map((reason, index) => (
											<li key={index} className={styles.reasonItem}>
												<label>
													<input
														type="radio"
														name="complaintReason"
														checked={selectedReason === reason}
														onChange={() => selectReason(reason)}
													/>
													{reason}
												</label>
											</li>
										))}
									</ul>
									<CommonButton
										type="button"
										title="Відправити скаргу"
										color="yellow"
										className={styles.modalButton}
										onClick={handleSubmit}
										disabled={!selectedReason}
									/>
								</div>
							)}
						</div>
					</div>
				</Backdrop>
			)}
		</div>
	);
};

export default ComplaintModal;
