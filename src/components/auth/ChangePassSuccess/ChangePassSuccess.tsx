import CommonModal from "@/components/ui/CommonModal/CommonModal";
import { Backdrop } from "@mui/material";
import { useState } from "react";

export const ChangePassSuccess = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        {/* <CircularProgress color="inherit" /> */}
        <CommonModal onClose={handleClose}>
          <h3>Зміна паролю</h3>
        </CommonModal>
      </Backdrop>
    </>
  );
};

export default ChangePassSuccess;
