"use client";
import { createTheme } from "@mui/material/styles";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["200", "300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: "#E5FF46",
      dark: "#F5FFB6",
      contrastText: "#000000",
    },
    secondary: {
      main: "#F5FFB6",
      light: "#eef7b0",
      contrastText: "#000000",
    },
    info: { main: "#0b152d" },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  spacing: 8,
});

export default theme;
