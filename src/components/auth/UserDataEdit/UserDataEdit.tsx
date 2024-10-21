import { FC, useEffect, useState } from "react";
import { selectUser } from "@/redux/auth/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import styles from "./UserDataEdit.module.scss";
import CommonInput from "@/components/ui/CommonInput/CommonInput";
import Image from "next/image";
import submit from "@/assets/Svg/CheckCircleFilled.svg";
import cancel from "@/assets/Svg/CloseCircleFilled.svg";
import { changeUserEmail, changeUserName, changeUserPhone } from "@/redux/auth/operations";
import CommonModal from "@/components/ui/CommonModal/CommonModal";
import CommonButton from "@/components/ui/CommonButton/CommonButton";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  onEdit: () => void;
};

export const UserDataEdit: React.FC<Props> = ({ onEdit }: Props) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const [name, setName] = useState(user.fullName || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("");

  const [isOpenPhoneModal, setIsOpenPhoneModal] = useState(false);
  const [isOpenEmailModal, setIsOpenEmailModal] = useState(false);

  useEffect(() => {}, [user]);

  const handleSubmitName = () => {
    dispatch(changeUserName({ fullName: name }));
    onEdit();
  };

  const handleSubmitPhone = () => {
    if (user.phone === phone) {
      toast.error("Enter a new phone number!");
      return;
    }
    dispatch(changeUserPhone({ password: password, newPhoneNumber: phone }));
    setIsOpenPhoneModal(false);
  };

  const handleSubmitEmail = () => {
    console.log(email);
    if (user.email === email) {
      toast.error("Enter a new email!")
    }
    dispatch(changeUserEmail({ password: password, newEmail: email }))
    setIsOpenEmailModal
  };

  const handleCancel = () => {
    onEdit();
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
            onClick={()=>setIsOpenEmailModal(true)}
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
