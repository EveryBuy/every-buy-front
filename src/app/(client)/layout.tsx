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
        <div className="container">
          <Header />
          <div className="content">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
