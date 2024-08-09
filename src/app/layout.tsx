import { ReactNode } from "react";
import { Header, Footer } from "../components";
import { AuthProvider } from "@/context/AuthContextType";
import "./globals.scss";
import { Providers } from "../redux/providers";
import AuthUpdater from "./(client)/(auth)/authUpdater";

export default async function ClientLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="uk">
      <body>
        <Providers>
          {/* <AuthUpdater> */}
          <Header />
          <main className="container">{children}</main>
          <Footer />
          {/* </AuthUpdater> */}
        </Providers>
      </body>
    </html>
  );
}
