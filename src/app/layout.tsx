"use client";

import { ReactNode } from "react";
import { Header, Footer } from "../components";
// import { AuthProvider } from "@/context/AuthContextType";
import { Providers } from "../redux/provider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
// import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import theme from "../styles/mui/theme";
import Message from "@/components/ui/Message/Message";
import "./globals.scss";
import AuthUpdater from "./(client)/(auth)/authUpdater";
import { useAppSelector } from "@/redux/store";
import { selectRehydrated } from "@/redux/auth/selectorsAuth";
import RehydrationGate from "@/components/auth/RehydrationGate/RehydrationGate";

export default function ClientLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="uk">
      {/* <body className={myFont.className}> */}
      <body>
        <AppRouterCacheProvider>
          <Providers>
            <RehydrationGate>
            <AuthUpdater>
              <ThemeProvider theme={theme}>
                {/* <AuthProvider> */}
                <Header />
                <main className="container">{children}</main>
                <Footer />
                <Message />
                {/* </AuthProvider> */}
              </ThemeProvider>
            </AuthUpdater>
            </RehydrationGate>
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
