import { FC, useEffect, useState } from "react";
import { selectUser } from "@/redux/auth/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import styles from "./UserDataEdit.module.scss";
import CommonInput from "@/components/ui/CommonInput/CommonInput";
import Image from "next/image";
import submit from "@/assets/Svg/CheckCircleFilled.svg";
import cancel from "@/assets/Svg/CloseCircleFilled.svg";
import { changeUserName, changeUserPhone } from "@/redux/auth/operations";
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

  useEffect(()=>{}, [user])

  const handleSubmitName = () => {
    dispatch(changeUserName({ fullName: name }));
    onEdit();
  };

  const handleSubmitPhone = () => {
    console.log(user.phone);
    console.log(phone);
    if (user.phone === phone) {
      toast.error("Enter a new phone number!");
      setIsOpenPhoneModal(false);
      return;
    }
    dispatch(changeUserPhone({ password: password, newPhoneNumber: phone }));
    setIsOpenPhoneModal(false);
  };

  const handleSubmitEmail = () => {
    console.log(email);
  };

  const handleCancel = () => {
    onEdit();
  };

  const handleClosePhoneModal = () => {
    setIsOpenPhoneModal(false);
  }

  return (
    <div className={styles.listBox}>
      {isOpenPhoneModal && <CommonModal
        contentClassName={styles.content}
        onClose={()=>setIsOpenPhoneModal(false)}
      >
        <h3> Введіть пароль для підтвердження зміни номеру телефону</h3>
        <CommonInput
          setValue={(e) => setPassword(e.target.value)}
        />
        <CommonButton
          type="button"
          title="Підтвердити"
          color="yellow"
          className={styles.button}
          // children
          onClick={handleSubmitPhone}
        />
        <CommonButton
          type="button"
          title="Відмінити"
          color="transparent"
          className={styles.button}
          // children
          onClick={handleClosePhoneModal}
        />
      </CommonModal>}
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
          <button type="button" onClick={handleSubmitName}>
            <Image src={submit} alt="Submit changes button" />
          </button>
          <button type="button" onClick={handleCancel}>
            <Image src={cancel} alt="Cancel changes button" />
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
          <button type="button" onClick={()=>setIsOpenPhoneModal(true)}>
            <Image src={submit} alt="Submit changes button" />
          </button>
          <button type="button" onClick={handleCancel}>
            <Image src={cancel} alt="Cancel changes button" />
          </button>
        </div>
        <div className={styles.inputWrapper}>
          <CommonInput
            typeInput="text"
            id="email"
            value={user.email}
            setValue={(e) => setEmail(e.target.value)}
            required={false}
            placeholder="Введіть свій email"
          ></CommonInput>
          <button type="button" onClick={handleSubmitEmail}>
            <Image src={submit} alt="Submit changes button" />
          </button>
          <button type="button" onClick={handleCancel}>
            <Image src={cancel} alt="Cancel changes button" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserDataEdit;
