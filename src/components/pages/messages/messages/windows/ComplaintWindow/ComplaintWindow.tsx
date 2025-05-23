"use client";
import { FC, useState } from "react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { CommonModal, CommonButton } from "@/components";
import styles from "../../../../announcement/ComplaintModal/Complaint.module.scss";
import { Box, Typography } from "@mui/material";

type ComplaintWindowProps = {
  setBlockWindowVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  complaintWindowHandle: () => void;
};
const reasons = [
  "Спам",
  "Фейковий акаунт",
  "Насильство",
  "Порнографія",
  "Порушення авторського права",
  "Інше",
];

export const ComplaintWindow: FC<ComplaintWindowProps> = ({
  setBlockWindowVisible,
  complaintWindowHandle,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const lastMessageForComplaining = useSelector((state: RootState) => {
    const messages = state.messages.chat?.chatMessages;
    return messages?.[messages.length - 1]?.text;
  });
  const companionName = useSelector((state: RootState) =>
    state.messages?.chat ? state.messages.chat.userData?.fullName : null
  );

  const handleCloseModal = () => {
    setBlockWindowVisible?.((prev) => !prev);
  };
  const handleConfirmSubmit = () => {
    setSubmitted(true);
  };
  const selectReason = (reason: string) => {
    setSelectedReason(selectedReason === reason ? null : reason);
  };
  const handleSubmit = () => {
    setIsSubmitting(true);
  };
  return (
    <CommonModal onClose={complaintWindowHandle}>
      {/* <h3 className={styles.text}>
        Ви впевнені, що хочете заблокувати користувача?
      </h3>

      <div className={styles.buttonWrapper}>
        <CommonButton
          className={styles.button}
          type="button"
          title=""
          color="yellow"
          onClick={windowHandle}
        >
          Ні, не блокувати
        </CommonButton>
        <CommonButton
          className={styles.button}
          type="button"
          title=""
          color="transparent"
          // @ts-ignore
          onClick={(e) => blockUserHandler(companionId as number, e)}
        >
          Так, заблокувати
        </CommonButton>
      </div> */}

      <Box
        component={"div"}
        sx={{
          border: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "0px",
        }}
        className={styles.box}
        onClick={(evt: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          evt.stopPropagation()
        }
      >
        <div>
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
              <Typography
                component={"h2"}
                className={styles.confirmationTitle}
                sx={{
                  mt: "59px",
                  fontSize: "32px",
                }}
              >
                Ви впевнені, що хочете відправити скаргу?
              </Typography>
              <Typography
                component={"p"}
                className={styles.confirmationContent}
                sx={{
                  m: "59px 0px 0px",
                  fontSize: "24px",
                  marginBottom: "26px",
                }}
              >
                Зміст скарги:
              </Typography>
              <ul>
                {selectedReason && (
                  <li
                    style={{ marginLeft: "25px" }}
                    className={styles.confirmReasons}
                  >
                    {selectedReason}
                  </li>
                )}
                <li
                  className={styles.confirmReasons}
                  style={{ marginLeft: "25px" }}
                >
                  {`Предмет скарги: Оголошення "${lastMessageForComplaining}" від продавця ${companionName}.`}
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
            <Box className={styles.reportReasons} sx={{ marginLeft: "0px" }}>
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
            </Box>
          )}
        </div>
      </Box>
    </CommonModal>
  );
};

export default ComplaintWindow;
