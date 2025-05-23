import { ModalDialog } from "@/components/ui/ModalDilog/ModalDialog";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Backdrop } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import style from "./Unsubscribe.module.css";
import { subscribeUser, unsubscribeUser } from "@/redux/auth/operations";
import { selectUser } from "@/redux/auth/selectors";

export const Unsubscribe = ({ children }: { children: string }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { email } = useAppSelector(selectUser) || "";
  //   const router = useRouter();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onUnsubscribe = async () => {
    // dispatch(subscribeUser(email));
    dispatch(unsubscribeUser(email));
    // router.replace("/");
  };

  return (
    <>
      <Link href="#" className={style.logoutBtn} onClick={handleOpen}>
        {children}
      </Link>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        {/* <CircularProgress color="inherit" /> */}
        <ModalDialog
          text="Ви дійсно хочете відписатись від розсилки?"
          submitOk={onUnsubscribe}
        />
      </Backdrop>
    </>
  );
};

export default Unsubscribe;
