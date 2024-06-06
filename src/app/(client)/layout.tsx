import { ReactNode } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
