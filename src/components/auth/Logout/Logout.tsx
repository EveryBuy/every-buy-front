"use client";
import { ModalDialog } from "@/components/ui/ModalDilog/ModalDialog";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import style from './Logout.module.scss'
import { useAppDispatch } from "@/redux/store";
import { logout } from "@/redux/auth/operations";
import { Router, useRouter } from "next/router";

export const Logout: React.FC = ( {children} ) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  // const router = useRouter();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onLogout = () => {
    dispatch(logout());
    router.push("/");
  }
  return (
    <>
      <Button
        className={style.logoutBtn}
        onClick={handleOpen}
        
      >{children}</Button>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
        <ModalDialog
          text="Ви дійсно хочете вийти зі свого аккаунта?"
        submitOk={onLogout}/>
      </Backdrop>
    </>
  );
};

export default Logout;
