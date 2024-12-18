"use client";
import { ModalDialog } from "@/components/ui/ModalDilog/ModalDialog";
import { Backdrop, CircularProgress } from "@mui/material";
import React, { FC, useState } from "react";
import { useAppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./DeleteAds.module.css";
import { deleteAdvertisement } from "@/redux/advertisement/operations";

export const DeleteAds = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: number;
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

  const onDelete = () => {
    dispatch(deleteAdvertisement(id));
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
          text="Ви дійсно хочете видалити оголошення?"
          submitOk={onDelete}
        />
      </Backdrop>
    </>
  );
};

export default DeleteAds;
