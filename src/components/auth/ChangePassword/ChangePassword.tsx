"use client";

import React, { use, useId, useState } from "react";
import { useAppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { CommonModal } from "@/components";
import CommonButton from "@/components/ui/CommonButton/CommonButton";
import styles from "@/components/auth/ChangePassword/ChangePassword.module.scss";
import { Field, Form, Formik, FormikHelpers } from "formik";
import Image from "next/image";
import EyeFilled from "@/assets/Svg/EyeFilled.svg";
import EyeInvisibleFilled from "@/assets/Svg/EyeInvisibleFilled.svg";
import { validatePassword } from "@/utils/validate";
// import { initialValues } from "@/hooks/useMatchMedia";
import { changePassword } from "@/redux/auth/operations";

type Props = {
  onClose: (props: boolean) => void;
};

type InitialValues = {
  oldPwd: string | undefined;
  newPwd: string | undefined;
  newPwdConfirm: string | undefined;
};

export const ChangePassword: React.FC<Props> = ({ onClose }: Props) => {
  const [open, setOpen] = useState(true);
  const [showNewPwd, setShowPassword] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const oldPwdId = useId();
  const newPwdId = useId();
  const newPwdConfirmId = useId();

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

  const validate = (values: InitialValues) => {
    const { oldPwd, newPwd, newPwdConfirm } = values;
    const errors: Partial<InitialValues> = {};
    if (!oldPwd) errors.oldPwd = "старий пароль є обовʼязковим";
    if (!newPwd) errors.newPwd = "новий пароль є обовʼязковим";
    else if (!validatePassword(newPwd))
      errors.newPwd =
        "Пароль повинен містити 8 символів, велику і маленьку літери, цифру і символ";
    if (!newPwdConfirm) errors.newPwdConfirm = "підтвердження є обовʼязковим";
    else if (newPwdConfirm !== newPwd)
      errors.newPwdConfirm = "Паролі повинні співпадати";

    return errors;
  };

  const handleSubmit = (
    initialValues: InitialValues,
    actions: FormikHelpers<InitialValues>
  ) => {
    dispatch(
      changePassword({
        oldPassword: initialValues.oldPwd,
        newPassword: initialValues.newPwd,
      })
    );
    // router.replace("/");
    actions.resetForm();
  };

  return (
    <>
      <CommonModal onClose={handleClose}>
        <h3 className={styles.title}>Зміна паролю</h3>
        <Formik
          initialValues={{
            oldPwd: "",
            newPwd: "",
            newPwdConfirm: "",
          }}
          onSubmit={handleSubmit}
          validate={validate}
        >
          {({ errors, touched, values }) => (
            <Form className={styles.form}>
              <div>
                <label id={oldPwdId}>
                  Старий пароль<span className={styles.requiredMark}> *</span>
                </label>
                <div className={styles.inputWrapper}>
                  <Field
                    name="oldPwd"
                    type="text"
                    id={oldPwdId}
                    placeholder={
                      errors.oldPwd && touched.oldPwd
                        ? errors.oldPwd
                        : "введіть свій пароль"
                    }
                    className={`${styles.input} ${
                      errors.oldPwd && touched.oldPwd
                        ? styles.errorPlaceholder
                        : ""
                    } `}
                    required
                  ></Field>
                </div>
              </div>

              <div>
                <label
                  id={newPwdId}
                  className={`${
                    errors.newPwd && values.newPwd ? styles.errorLabel : ""
                  }`}
                >
                  {errors.newPwd && values.newPwd ? (
                    errors.newPwd
                  ) : (
                    <>
                      Новий пароль
                      <span className={styles.requiredMark}> *</span>
                    </>
                  )}
                </label>
                <div className={styles.inputWrapper}>
                  <Field
                    name="newPwd"
                    type={showNewPwd ? "text" : "password"}
                    id={newPwdId}
                    placeholder={
                      errors.newPwd && touched.newPwd
                        ? errors.newPwd
                        : "введіть новий пароль"
                    }
                    className={`${styles.input} ${
                      errors.newPwd && touched.newPwd
                        ? styles.errorPlaceholder
                        : ""
                    }`}
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
              </div>

              <div>
                <label
                  id={newPwdConfirmId}
                  className={`${
                    errors.newPwdConfirm && values.newPwdConfirm
                      ? styles.errorLabel
                      : ""
                  }`}
                >
                  {errors.newPwdConfirm && values.newPwdConfirm ? (
                    errors.newPwdConfirm
                  ) : (
                    <>
                      Підтвердити новий пароль
                      <span className={styles.requiredMark}> *</span>
                    </>
                  )}
                </label>
                <div className={styles.inputWrapper}>
                  <Field
                    name="newPwdConfirm"
                    type={showConfirmPwd ? "text" : "password"}
                    id={newPwdConfirmId}
                    placeholder={
                      errors.newPwdConfirm && touched.newPwdConfirm
                        ? errors.newPwdConfirm
                        : "підтвердіть новий пароль"
                    }
                    className={`${styles.input} ${
                      errors.newPwdConfirm && touched.newPwdConfirm
                        ? styles.errorPlaceholder
                        : ""
                    }`}
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
              </div>
              <CommonButton
                type="submit"
                title="Зберегти пароль"
                color="yellow"
                className={styles.submitBtn}
              />
            </Form>
          )}
        </Formik>
      </CommonModal>
    </>
  );
};

export default ChangePassword;
