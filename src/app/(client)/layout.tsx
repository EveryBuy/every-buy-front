import { Container } from "@mui/material";
import { Header } from "@/components/shared/header";

import LayoutProps from "@/types/layoutProp";

export default function RootLayout({ children }: LayoutProps) {
  return (
    <Container id="root" disableGutters maxWidth={false}>
      <Header />
      <main>{children}</main>
    </Container>
  );
}
