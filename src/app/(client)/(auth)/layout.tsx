import { AuthButtons } from "@/components";
import LayoutProps from "@/types/layoutProp";

export default function RootLayout({ children }: LayoutProps) {
  return (
    <>
      <AuthButtons />
      {children}
    </>
  );
}
