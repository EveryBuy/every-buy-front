import { ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

import { Providers } from "../redux/provider";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/mui/theme";

import "./globals.scss";

// import { AuthProvider } from "@/context/AuthContextType";
// import { Header, Footer } from "../components";
import { Container } from "@mui/material";

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
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
