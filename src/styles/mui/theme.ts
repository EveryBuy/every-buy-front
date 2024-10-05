"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    // as an example
    primary: {
      main: "#00b1d0",
      dark: "#00869b",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#184d92",
      light: "#337fdd",
      contrastText: "#FFFFFF",
    },
  },
  // typography: {
  //   h1: {
  //     fontSize: 20,
  //     color: "#184d93",
  //     fontWeight: 700,
  //   },
  // },
});

export default theme;
