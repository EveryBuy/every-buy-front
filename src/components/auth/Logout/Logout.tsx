"use client";
import { ModalDialog } from "@/components/ui/ModalDilog/ModalDialog";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import style from "./Logout.module.scss";
import { useAppDispatch } from "@/redux/store";
import { logout } from "@/redux/auth/operations";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const Logout = ({ children }: {children: string}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onLogout = () => {
    dispatch(logout());
    router.replace("/");
  };

  return (
    <>
      <Link href='#' className={style.logoutBtn} onClick={handleOpen}>
        {children}
      </Link>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        {/* <CircularProgress color="inherit" /> */}
        <ModalDialog
          text="Ви дійсно хочете вийти зі свого облікового запису?"
          submitOk={onLogout}
        />
      </Backdrop>
    </>
  );
};

export default Logout;
