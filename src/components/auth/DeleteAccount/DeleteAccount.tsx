"use client";
import { ModalDialog } from "@/components/ui/ModalDilog/ModalDialog";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch } from "@/redux/store";
import { logout } from "@/redux/auth/operations";
import { useRouter } from "next/navigation";

export const DeleteAccount = ({ children }: {children: string}) => {
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
    // dispatch(delete());
    router.replace("/");
  };

  return (
    <>
      <Button
        color="error"
        onClick={handleOpen}>
        {children}
      </Button>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        {/* <CircularProgress color="inherit" /> */}
        <ModalDialog
          text="Ви дійсно хочете видалити свій обліковий запис?"
          submitOk={onDelete}
        />
      </Backdrop>
    </>
  );
};

export default DeleteAccount;
