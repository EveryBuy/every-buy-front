"use client";

import { FC, useState, useEffect, useCallback } from "react";
import { selectUser } from "@/redux/auth/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import styles from "./AboutMe.module.scss";
import CommonButton from "@/components/ui/CommonButton/CommonButton";
import Image from "next/image";
import ArrowBack from "@/assets/Svg/arrowBack.svg";
import separeteLine from "@/assets/Svg/separeteLine.svg";

import { useRouter } from "next/navigation";
import { DeleteAccount } from "@/components/auth/DeleteAccount/DeleteAccount";
import { ChangePassword } from "@/components/auth/ChangePassword/ChangePassword";
import UserData from "@/components/auth/UserData/UserData";
import UserDataEdit from "@/components/auth/UserDataEdit/UserDataEdit";
import CommonModal from "@/components/ui/CommonModal/CommonModal";

const AboutMe: FC = () => {
  const user = useAppSelector(selectUser);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isOpenChangePass, setIsOpenChangePass] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("images/user.png");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleClick = () => {
    router.replace("/user/");
    // dispatch(toggleProfileMenu(false));
  };

  const handleChangePass = () => {
    setIsOpenChangePass(true);
  };

  const handleEdit = () => {
    setIsEdit(!isEdit);
  }

  const handleChangePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        setSelectedImage(file);
        setPreviewImage(URL.createObjectURL(file));
      }
    }
  
    
    if (!user || !isClient) {
      return <p>Завантаження...</p>;
  }

  return (
    <div className={styles.box}>
      <button
        className={styles.arrowBackBtn}
        type="button"
        onClick={handleClick}
      >
        <Image
          className={styles.arrowBack}
          src={ArrowBack}
          alt="back"
          width={40}
          height={40}
        />
      </button>
      <h3 className={styles.headline}>Контактна інформація</h3>
      <div className={styles.wrapper}>
        <div className={styles.userImageBox}>
          <Image
            className={styles.userImage}
            src="/images/user.png"
            alt="User image"
            width="142"
            height="142"
          />
          {/* <p className={styles.editText}>Редагувати фото</p> */}
          <label className={styles.editText}>
            Редагувати фото
            <input
              type="file"
              accept="image/*"
              onChange={handleChangePhoto}
              className={styles.fileInput}
            />
            
          </label>
          {previewImage && <CommonModal
          onClose={()=>setPreviewImage(null)}
          >
            <img src={previewImage}
              alt="Image Preview" />
          </CommonModal>}
        </div>

        <div className={styles.listBox}>
          <div className={styles.userData}>
            {!isEdit && <UserData onEdit={handleEdit} />}
            {isEdit && <UserDataEdit onEdit={handleEdit} />}
          </div>
            <CommonButton
              type="button"
              title="Змінити пароль"
              color="transparent"
              className={styles.changePassBtn}
              onClick={handleChangePass}
            />
            {isOpenChangePass && (
              <ChangePassword onClose={setIsOpenChangePass} />
            )}

          <div className={styles.deleteBox}>
            <p className={styles.dangerZone}>Небезпечна зона</p>
            <p>Ваш профіль на EveryBuy буде видалено назавжди.</p>
            <div className={styles.devider}></div>
            <DeleteAccount>Видалити мій акаунт</DeleteAccount>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
