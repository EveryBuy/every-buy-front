import { ReactNode } from "react";
import { ProfileMenu } from "@/components";
import '@/app/globals.scss'

export default async function UserLayout({
  children,
}: {
  children: ReactNode;
  }) {
  return (
    <>
      <div className="title">
        <h1 className="mobileHidden">Профіль користувача</h1>
      </div>
      <div style={{ display: "flex", width: "100%"}}>
        <ProfileMenu />
        <section className="profileSectionWrapper">{children}</section>
      </div>
    </>
  );
}
