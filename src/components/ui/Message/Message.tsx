import { Toaster } from "react-hot-toast";

export const Message = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: "",
        duration: 5000,
        style: {
          maxWidth: "600px",
          background: "#363636",
          color: "#fff",
        },

        // Default options for specific types
        success: {
          duration: 3000,
          style: {
            background: "green",
            color: "black",
          },
        },
      }}
    />
  );
};

export default Message;
