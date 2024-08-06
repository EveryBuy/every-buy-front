import { ReactNode } from "react";
import { Header, Footer } from "../components";
import { AuthProvider } from "@/context/AuthContextType";
import "./globals.scss";
import { Providers } from "../redux/provider";

export default async function ClientLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="uk">
      <body>
        <Providers>
        {/* <AuthProvider> */} 
          <Header />
          <main className="container">{children}</main>
          <Footer />
        {/* </AuthProvider> */}

        </Providers>
      </body>
    </html>
  );
}
