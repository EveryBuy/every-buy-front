import CommonModal from "@/components/ui/CommonModal/CommonModal";
import { Backdrop } from "@mui/material";
import { useState } from "react";

export const ChangePassSuccess = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    // onClose(false);
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        // onClose={setOpen}
        onClick={handleClose}
      >
        {/* <CircularProgress color="inherit" /> */}
        <CommonModal onClose={handleClose}>
          <h3
          //   className={styles.title}
          >
            Зміна паролю
          </h3>
        </CommonModal>
      </Backdrop>
    </>
  );
};

export default ChangePassSuccess;
