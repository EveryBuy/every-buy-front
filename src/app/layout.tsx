"use client";

import { ReactNode } from "react";
import { Providers } from "../redux/provider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
// import { ToastContainer } from "react-toastify";
// import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import theme from "../styles/mui/theme";
import "./globals.scss";
import AuthUpdater from "./(client)/(auth)/authUpdater";
// import dynamic from "next/dynamic";
import RehydrationGate from "@/components/auth/RehydrationGate/RehydrationGate";
import { Footer, Header } from "@/components";
import Message from "@/components/ui/Message/Message";

// const Header = dynamic(() => import("../components/header/Header"), {
//   ssr: false,
// });

// const Footer = dynamic(() => import("@/components/footer/Footer"), {
//   ssr: false,
// });

// const Message = dynamic(() => import("@/components/ui/Message/Message"), {
//   ssr: false,
// });

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk">
      {/* <body className={myFont.className}> */}
      <body>
        <AppRouterCacheProvider>
          <Providers>
            <ThemeProvider theme={theme}>
              <Header />
              <RehydrationGate>
                <AuthUpdater>
                  {/* <AuthProvider> */}
                  <main className="container">{children}</main>
                </AuthUpdater>
              </RehydrationGate>
              <Footer />
              <Message />
              {/* </AuthProvider> */}
            </ThemeProvider>
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
