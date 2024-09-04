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
import { ErrorMessage, Field, Form, Formik } from 'formik';

export const ChangePassword = ({ onClose }) => {
  const [open, setOpen] = useState(true);
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
                <Field name="oldPwd" type='password' id='' required />
                <ErrorMessage
                  className={styles.error}
                  name="oldPwd"
                  component="span"
                />
              </div>
              <div>
                <label>Новий пароль</label>
                <Field name="newPwd" type='password' id='' required />
                <ErrorMessage
                  className={styles.error}
                  name="newPwd"
                  component="span"
                />
              </div>
              <div>
                <label>Підтвердити новий пароль</label>
                <Field name="oldPwdConfirm" type='password' id='' required />
                <ErrorMessage
                  className={styles.error}
                  name="oldPwdConfirm"
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
