"use client";
import { Backdrop, Button } from "@mui/material";
import React, { useState } from "react";
import style from "./ChangePassword.module.scss";
import { useAppDispatch } from "@/redux/store";
// import { logout } from "@/redux/auth/operations";
import { useRouter } from "next/navigation";
import CommonModal from "@/components/ui/CommonModal/CommonModal";
import CommonButton from "@/components/ui/CommonButton/CommonButton";
import styles from "@/components/auth/ChangePassword/ChangePassword.module.scss";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import EyeFilled from "@/assets/Svg/EyeFilled.svg";
import EyeInvisibleFilled from "@/assets/Svg/EyeInvisibleFilled.svg";

export const ChangePassword: React.FC = ({ onClose }) => {
  const [open, setOpen] = useState(true);
  const [showNewPwd, setShowPassword] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    onClose(false);
  };

  const handleChangePwd = () => {
    // dispatch(changePassword);
    router.replace("/");
  };

  const toggleShowNewPwd = () => {
    setShowPassword(!showNewPwd);
  };
  const toggleShowConfirmPwd = () => {
    setShowConfirmPwd(!showConfirmPwd);
  };

  return (
    <>
      {/* <Button className={style.logoutBtn} onClick={handleOpen}>
        {text}
      </Button> */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClose={setOpen}
      >
        {/* <CircularProgress color="inherit" /> */}
        <CommonModal onClose={handleClose}>
          <h3>Зміна паролю</h3>
          <Formik>
            <Form className={styles.form}>
              <div>
                <label>Старий пароль</label>
                <div className={styles.inputWrapper}>
                  <Field
                    name="oldPwd"
                    type="password"
                    id=""
                    placeholder="введіть свій пароль"
                    required
                  ></Field>
                  {/* <Image
                    className={styles.EyePassword}
                    src={showPassword ? EyeInvisibleFilled : EyeFilled}
                    alt="showPassword"
                    width={24}
                    height={24}
                    onClick={toggleShowPassword}
                  /> */}
                </div>
                <ErrorMessage
                  className={styles.error}
                  name="oldPwd"
                  component="span"
                />
              </div>

              <div>
                <label>Новий пароль</label>
                <div className={styles.inputWrapper}>
                  <Field
                    name="oldPwd"
                    type={showNewPwd ? "text" : "password"}
                    id=""
                    required
                  ></Field>
                  <Image
                    className={styles.EyePassword}
                    src={showNewPwd ? EyeInvisibleFilled : EyeFilled}
                    alt="showPassword"
                    width={24}
                    height={24}
                    onClick={toggleShowNewPwd}
                  />
                </div>
                <ErrorMessage
                  className={styles.error}
                  name="oldPwd"
                  component="span"
                />
              </div>

              <div>
                <label>Підтвердити новий пароль</label>
                <div className={styles.inputWrapper}>
                  <Field className={styles.input}
                    name="oldPwd"
                    type={showConfirmPwd ? "text" : "password"}
                    id=""
                    required
                  ></Field>
                  <Image
                    className={styles.EyePassword}
                    src={showConfirmPwd ? EyeInvisibleFilled : EyeFilled}
                    alt="showPassword"
                    width={24}
                    height={24}
                    onClick={toggleShowConfirmPwd}
                  />
                </div>
                <ErrorMessage
                  className={styles.error}
                  name="oldPwd"
                  component="span"
                />
              </div>
              <CommonButton
                type="button"
                title="Зберегти пароль"
                color="yellow"
                className={styles.submitBtn}
                onClick={handleChangePwd}
              />
            </Form>
          </Formik>
        </CommonModal>
      </Backdrop>
    </>
  );
};

export default ChangePassword;
