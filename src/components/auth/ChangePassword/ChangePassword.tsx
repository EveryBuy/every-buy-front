"use client";
// import { Backdrop } from "@mui/material";
// import { logout } from "@/redux/auth/operations";
import React, { use, useId, useState } from "react";
import { useAppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import CommonModal from "@/components/ui/CommonModal/CommonModal";
import CommonButton from "@/components/ui/CommonButton/CommonButton";
import styles from "@/components/auth/ChangePassword/ChangePassword.module.scss";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import Image from "next/image";
import EyeFilled from "@/assets/Svg/EyeFilled.svg";
import EyeInvisibleFilled from "@/assets/Svg/EyeInvisibleFilled.svg";

type Props = {
  onClose: (props: boolean)=> void,
}

type InitialValues = {
              oldPwd: string,
              newPwd: string,
              newPwdConfirm: string,
            }

export const ChangePassword: React.FC<Props> = ({ onClose }: Props) => {
  const [open, setOpen] = useState(true);
  const [showNewPwd, setShowPassword] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const oldPwdId = useId();
  const newPwdId = useId();
  const newPwdConfirmId = useId();

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
    onClose(false);
  };

  const toggleShowNewPwd = () => {
    setShowPassword(!showNewPwd);
  };

  const toggleShowConfirmPwd = () => {
    setShowConfirmPwd(!showConfirmPwd);
  };

  const handleSubmit = (initialValues: InitialValues, actions: FormikHelpers<InitialValues>) => {
    // console.log(initialValues);
    // dispatch(changePassword);
    router.replace("/");
    actions.resetForm();
}

  return (
    <>
        <CommonModal onClose={handleClose}>
          <h3 className={styles.title}>Зміна паролю</h3>
          <Formik
            initialValues={{
              oldPwd: '',
              newPwd: '',
              newPwdConfirm: ''
            }}
          onSubmit={handleSubmit}>
            <Form className={styles.form}>
              <div>
                <label id={oldPwdId}>Старий пароль<span className={styles.requiredMark}> *</span></label>
                <div className={styles.inputWrapper}>
                  <Field
                    name="oldPwd"
                    type="text"
                    id={oldPwdId}
                    placeholder="введіть свій пароль"
                    required></Field>
                </div>
                <ErrorMessage
                  className={styles.error}
                  name="oldPwd"
                  component="span"
                />
              </div>

              <div>
                <label id={newPwdId}>Новий пароль<span className={styles.requiredMark}> *</span></label>
                <div className={styles.inputWrapper}>
                  <Field
                    name="newPwd"
                    type={showNewPwd ? "text" : "password"}
                    id={newPwdId}
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
                  name="newPwd"
                  component="span"
                />
              </div>

              <div>
                <label id={newPwdConfirmId}>Підтвердити новий пароль<span className={styles.requiredMark}> *</span></label>
                <div className={styles.inputWrapper}>
                  <Field className={styles.input}
                    name="newPwdConfirm"
                    type={showConfirmPwd ? "text" : "password"}
                    id={newPwdConfirmId}
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
                  name="newPwdConfirm"
                  component="span"
                />
              </div>
              <CommonButton
                type="submit"
                title="Зберегти пароль"
                color="yellow"
                className={styles.submitBtn}
                // onClick={handleChangePwd}
              />
            </Form>
          </Formik>
        </CommonModal>
    </>
  );
};

export default ChangePassword;
