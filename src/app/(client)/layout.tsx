import { ReactNode } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/footer/Footer";
import { AuthProvider } from "@/context/AuthContextType";
import "../globals.scss";

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
          {/* <main className="container content">{children}</main> */}
          <main className="container">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
