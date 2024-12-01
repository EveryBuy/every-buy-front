"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import {
  CommonInput,
  CommonModal,
  CommonButton,
  ErrorModal,
} from "@/components";
import { selectError, selectUser } from "@/redux/auth/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import submit from "@/assets/Svg/CheckCircleFilled.svg";
import cancel from "@/assets/Svg/CloseCircleFilled.svg";
import {
  changeUserEmail,
  changeUserName,
  changeUserPhone,
} from "@/redux/auth/operations";

import toast, { Toaster } from "react-hot-toast";
import styles from "./UserDataEdit.module.scss";
import { useSelector } from "react-redux";
import { clearErrors } from "@/redux/auth/slice";

type Props = {
  onEdit: () => void;
};

export const UserDataEdit: FC<Props> = ({ onEdit }: Props) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const [name, setName] = useState(user.fullName || "");
  const [phone, setPhone] = useState("+380" + user.phone || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("");

  const [isOpenPhoneModal, setIsOpenPhoneModal] = useState(false);
  const [isOpenEmailModal, setIsOpenEmailModal] = useState(false);

  const responseError = useSelector(selectError);
  const [isError, setIsError] = useState(false);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    if (responseError) {
      setIsError(true);
      if (responseError.status === 400)
        setMessageText("Невірні дані. Виправте і спробуйте ще раз.");
      if (responseError.status === 500)
        setMessageText("Помилка сервера. Спробуйте пізніше.");
    }
  }, [user, responseError]);

  const handleSubmitName = async () => {
    await dispatch(changeUserName({ fullName: name }));
    // onEdit();
  };

  const handleSubmitPhone = () => {
    if (user.phone === phone) {
      setMessageText("Введіть новий номер телефону!");
      return;
    }
    dispatch(
      changeUserPhone({ password: password, newPhoneNumber: phone.slice(-9) })
    );
    setIsOpenPhoneModal(false);
  };

  const handleSubmitEmail = () => {
    console.log(email);
    if (user.email === email) {
      toast.error("Enter a new email!");
    }
    dispatch(changeUserEmail({ password: password, newEmail: email }));
    setIsOpenEmailModal;
  };

  const handleCancel = () => {
    onEdit();
  };

  const closeModal = () => {
    setMessageText("");
    dispatch(clearErrors());
    console.log(responseError);
  };

  return (
    <div className={styles.listBox}>
      {/* модалка підтвердження зміни номеру телефону */}
      {isOpenPhoneModal && (
        <CommonModal
          contentClassName={styles.content}
          onClose={() => setIsOpenPhoneModal(false)}
        >
          <h3> Введіть пароль для підтвердження зміни номеру телефону</h3>
          <CommonInput setValue={(e) => setPassword(e.target.value)} />
          <CommonButton
            type="button"
            title="Підтвердити"
            color="yellow"
            className={styles.button}
            onClick={handleSubmitPhone}
          />
          <CommonButton
            type="button"
            title="Відмінити"
            color="transparent"
            className={styles.button}
            onClick={() => setIsOpenPhoneModal(false)}
          />
        </CommonModal>
      )}
      {/* модалка підтвердження зміни email */}

      {isOpenEmailModal && (
        <CommonModal
          contentClassName={styles.content}
          onClose={() => setIsOpenEmailModal(false)}
        >
          <h3> Введіть пароль для підтвердження зміни email</h3>
          <CommonInput setValue={(e) => setPassword(e.target.value)} />
          <CommonButton
            type="button"
            title="Підтвердити"
            color="yellow"
            className={styles.button}
            onClick={handleSubmitEmail}
          />
          <CommonButton
            type="button"
            title="Відмінити"
            color="transparent"
            className={styles.button}
            onClick={() => setIsOpenEmailModal(false)}
          />
        </CommonModal>
      )}
      {messageText && (
        <ErrorModal
          onClose={() => closeModal()}
          title={messageText}
          buttonText="Ok"
        />
      )}
      <form>
        <div className={styles.inputWrapper}>
          <CommonInput
            typeInput="text"
            id="name"
            value={name}
            setValue={(e) => setName(e.target.value)}
            required={false}
            placeholder="Введіть своє прізвище та імʼя"
          ></CommonInput>
          <button
            className={styles.inputBtn}
            type="button"
            onClick={handleSubmitName}
          >
            <Image
              className={styles.buttonImg}
              src={submit}
              alt="Submit changes button"
            />
          </button>
          <button
            className={styles.inputBtn}
            type="button"
            onClick={handleCancel}
          >
            <Image
              className={styles.buttonImg}
              src={cancel}
              alt="Cancel changes button"
            />
          </button>
        </div>
        <div className={styles.inputWrapper}>
          <CommonInput
            typeInput="text"
            id="phone"
            value={phone}
            setValue={(e) => setPhone(e.target.value)}
            required={false}
            placeholder="Введіть свій номер телефону"
          ></CommonInput>
          <button
            className={styles.inputBtn}
            type="button"
            onClick={() => setIsOpenPhoneModal(true)}
          >
            <Image
              className={styles.buttonImg}
              src={submit}
              alt="Submit changes button"
            />
          </button>
          <button
            className={styles.inputBtn}
            type="button"
            onClick={handleCancel}
          >
            <Image
              className={styles.buttonImg}
              src={cancel}
              alt="Cancel changes button"
            />
          </button>
        </div>
        <div className={styles.inputWrapper}>
          <CommonInput
            typeInput="text"
            id="email"
            value={email}
            setValue={(e) => setEmail(e.target.value)}
            required={false}
            placeholder="Введіть свій email"
          ></CommonInput>
          <button
            className={styles.inputBtn}
            type="button"
            onClick={() => setIsOpenEmailModal(true)}
          >
            <Image
              className={styles.buttonImg}
              src={submit}
              alt="Submit changes button"
            />
          </button>
          <button
            className={styles.inputBtn}
            type="button"
            onClick={handleCancel}
          >
            <Image
              className={styles.buttonImg}
              src={cancel}
              alt="Cancel changes button"
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserDataEdit;
