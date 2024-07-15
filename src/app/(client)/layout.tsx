import { ReactNode } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/footer/Footer";
import "../globals.scss";

export default async function ClientLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="uk">
      <body>
        <Header />
        {/* <main className="content container ">{children}</main> */}
        <main className="container">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
