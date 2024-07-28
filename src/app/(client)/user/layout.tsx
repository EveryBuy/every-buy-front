import { ReactNode } from "react";
import { Menu } from "@/components";
export default async function UserLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <div style={{ padding: "10px 30px" }}>
        <h1>Профіль користувача</h1>
      </div>
      <div style={{ display: "flex" }}>
        {/* <div
          style={{
            width: "20%",
            borderRight: "1px solid #ccc",
            padding: "1rem",
          }}
        > */}
        <Menu />
        {children}
        {/* </div> */}
        {/* <div style={{ width: "80%", padding: "1rem" }}>{children}</div> */}
      </div>
    </>
  );
}

// export default UserLayout;
