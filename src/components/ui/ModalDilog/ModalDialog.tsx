import CommonButton from "../CommonButton/CommonButton";
import style from "./ModalDialog.module.scss";

export const ModalDialog = ({ text, submitOk }: { text: string }) => {
  return (
    <div className={style.box}>
      <button className={style.closeButton} type="button">
        <svg width="17" height="18" viewBox="0 0 17 18" fill="none">
          <line
            y1="-0.5"
            x2="22.6274"
            y2="-0.5"
            transform="matrix(0.707107 0.707107 -0.828445 0.56007 0 1)"
            stroke="black"
          />
          <line
            y1="-0.5"
            x2="22.6274"
            y2="-0.5"
            transform="matrix(0.707107 -0.707107 -0.828445 -0.56007 0 17)"
            stroke="black"
          />
        </svg>
      </button>

      <h3 className={style.text}>{text}</h3>

      <div className={style.buttonWrapper}>
        <CommonButton
          className={style.button}
          type="button"
          title=""
          color="yellow"
        >
          Ні
        </CommonButton>
        <CommonButton
          className={style.button}
          type="button"
          title=""
          color="transparent"
          onClick={submitOk}
        >
          Так
        </CommonButton>
      </div>
    </div>
  );
};
