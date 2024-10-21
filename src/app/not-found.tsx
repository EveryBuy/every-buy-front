"use client";
import { useRouter } from "next/navigation";
import "./globals.scss";

export default function NotFound() {
  const router = useRouter();
  const changeLanguageHandler = (nextLocal: string) => {
    router.replace(`/${nextLocal}`);
  };

  return (
    <div
      style={{
        // backgroundColor: "#f0f0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        height: "60vh",
      }}
    >
      <div>
        <h1 style={{ fontSize: "6rem", color: "#333" }}>404</h1>
        <p
          className={"notFoundMessage"}
          style={{  }}
        >
          Oops! The page you are looking for does not exist.
        </p>
        <button
          style={{
            backgroundColor: "#333",
            color: "#fff",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "150px",
          }}
          onClick={() => changeLanguageHandler("/")}
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}
