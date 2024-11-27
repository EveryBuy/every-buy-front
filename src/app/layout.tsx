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
import "./globals.scss";

export default async function ClientLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="uk">
      <body>
        <AppRouterCacheProvider>
          <Providers>
            <ThemeProvider theme={theme}>
              {/* <AuthProvider> */}
              <Header />
              <main className="container">{children}</main>
              <Footer />
              {/* </AuthProvider> */}
              {/* <Toaster /> */}
              <ToastContainer />
            </ThemeProvider>
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
