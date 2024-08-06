import { AuthButtons } from "@/components";
import LayoutProps from "@/types/layoutProp";
import AuthUpdater from "./authUpdater";

export default function RootLayout({ children }: LayoutProps) {
  return (
    <>
      <AuthButtons />
      {children}
    </>
  );
}
