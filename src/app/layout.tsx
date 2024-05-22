import RootLayoutPropsType from "../types/rootLayout";
import "./globals.scss";

export default function RootLayout({ children }: RootLayoutPropsType) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
