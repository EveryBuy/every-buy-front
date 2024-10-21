"use client";

import { FC, useState, useEffect } from "react";
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
import { changeUserPhoto } from "@/redux/auth/operations";

const AboutMe: FC = () => {
  const user = useAppSelector(selectUser);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isOpenChangePass, setIsOpenChangePass] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleClick = () => {
    router.replace("/user/");
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
    event.target.value = '';
  }

  const acceptNewPhoto = async () => {
  if (selectedImage)  {
    try {
  const formData = new FormData();
  formData.append("photo", selectedImage)
  const result = await dispatch(changeUserPhoto(formData)).unwrap();
  console.log("Фото успішно змінено", result);
  setPreviewImage('');
  setSelectedImage(null);
} catch (error) {
  console.log("Не вдалось змінити фото", error);
    }
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
            // додав унікальний параметр для уникнення кешування. Фото завантажується при кожному рендері
            src={`${user.userPhotoUrl || '/images/user.png'}?t=${new Date().getTime()}`}  
            alt="User image"
            width="258"
            height="258"
          />
          <label className={styles.editText}>
            <p className={styles.photoChangeText}>Змінити свою фотографію</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleChangePhoto}
              className={styles.fileInput}
            />
          </label>
          {previewImage && <CommonModal
            contentClassName={styles.changeImgModalContainer}
          onClose={()=>setPreviewImage('')}
          >
            <p className={styles.previewText}>Попередній перегляд</p>
            <Image src={previewImage}
              className={styles.previewImg}
              width={258}
              height={258}
              alt="Image Preview" />
            <CommonButton
              type="button"
              title="Підтвердити"
              color="yellow"
              className={styles.button}
              onClick={acceptNewPhoto}
            />
            <CommonButton
              type="button"
              title="Відмінити"
              color="yellow"
              className={styles.button}
              onClick={()=>setPreviewImage('')}
            />
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
