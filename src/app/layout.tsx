import { ReactNode } from "react";
import { Header, Footer } from "../components";
// import { AuthProvider } from "@/context/AuthContextType";
import { Providers } from "../redux/provider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
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
            </ThemeProvider>
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
