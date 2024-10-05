import { FC, useState } from "react";
import { selectUser } from "@/redux/auth/selectors";
import { useAppSelector } from "@/redux/store";
import styles from "./UserDataEdit.module.scss";
import CommonInput from "@/components/ui/CommonInput/CommonInput";
import Image from "next/image";
import submit from "@/assets/Svg/CheckCircleFilled.svg";
import cancel from "@/assets/Svg/CloseCircleFilled.svg";

type Props = {
    onEdit: () => void
}

export const UserDataEdit: React.FC<Props> = ({onEdit}: Props) => {
  const user = useAppSelector(selectUser);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
      console.log({name, phone, email});
  };

    const handleCancel = () => {
        onEdit();
  };

  return (
    <div className={styles.listBox}>
      <div className={styles.inputWrapper}>
        <CommonInput
          typeInput="text"
          id="name"
          value={user.name}
          setValue={(e) => setName(e.target.value)}
          required={false}
          placeholder="Введіть своє прізвище та імʼя"
        ></CommonInput>
        <button
          type="button"
          onClick={handleSubmit}
        >
          <Image src={submit} alt="Submit changes button" />
        </button>
        <button
          type="button"
          onClick={handleCancel}
        >
          <Image src={cancel} alt="Cancel changes button" />
        </button>
          </div>
          
          <div className={styles.inputWrapper}>
        <CommonInput
          typeInput="text"
          id="name"
          value={user.name}
          setValue={(e) => setName(e.target.value)}
          required={false}
          placeholder="Введіть свій номер телефону"
        ></CommonInput>
        <button
          type="button"
          onClick={handleSubmit}
        >
          <Image src={submit} alt="Submit changes button" />
        </button>
        <button
          type="button"
          onClick={handleCancel}
        >
          <Image src={cancel} alt="Cancel changes button" />
        </button>
          </div>
          
          <div className={styles.inputWrapper}>
        <CommonInput
          typeInput="text"
          id="name"
          value={user.name}
          setValue={(e) => setName(e.target.value)}
          required={false}
          placeholder="Введіть свій email"
        ></CommonInput>
        <button
          type="button"
          onClick={handleSubmit}
        >
          <Image src={submit} alt="Submit changes button" />
        </button>
        <button
          type="button"
          onClick={handleCancel}
        >
          <Image src={cancel} alt="Cancel changes button" />
        </button>
      </div>
    </div>
  );
};

export default UserDataEdit;
