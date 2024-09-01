import { ReactNode } from "react";
import { ProfileMenu } from "@/components";
import '@/app/globals.scss'
import { useAppSelector } from "@/redux/store";
import { isActiveProfileMenu } from "@/redux/ui/selectors";
import { selectIsLoggedIn } from "@/redux/auth/selectors";

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
