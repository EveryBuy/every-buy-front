"use client";
import { ModalDialog } from "@/components/ui/ModalDilog/ModalDialog";
import { Backdrop, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./ActivateToggle.module.css";
import { changeAdvertisementStatus } from "@/redux/advertisement/operations";

export const ActivateToggle = ({
  children,
  id,
  isActivated,
}: {
  children: React.ReactNode;
  id: number;
  isActivated: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onPermit = () => {
    dispatch(changeAdvertisementStatus(id));
  };

  return (
    <>
      <Link href="#" className={styles.link} onClick={handleOpen}>
        {children}
      </Link>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        {/* <CircularProgress color="inherit" /> */}
        <ModalDialog
          text={`Ви дійсно хочете ${
            isActivated ? "деактивувати" : "активувати"
          } оголошення?`}
          submitOk={onPermit}
        />
      </Backdrop>
    </>
  );
};

export default ActivateToggle;
