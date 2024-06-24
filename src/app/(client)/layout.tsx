"use client";

import { ReactNode } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/footer/Footer";
import { AuthProvider } from "../Lofin-Register-feature/AuthContextType";
import "../globals.scss";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk">
      <body>
        <AuthProvider>
        <div className="container">
          <Header />
          <div className="content">{children}</div>
          <Footer />
        </div>
        </AuthProvider>
      </body>
    </html>
  );
}
