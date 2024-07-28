import { ReactNode } from "react";
import { Header, Footer } from "../components";
import { AuthProvider } from "@/context/AuthContextType";
import "./globals.scss";

export default async function ClientLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="uk">
      <body>
        <AuthProvider>
          <Header />
          <main className="container">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
