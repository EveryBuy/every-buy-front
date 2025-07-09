"use client";

import { useEffect } from "react";

const PingBackend = () => {
  useEffect(() => {
    fetch("https://api-everybuy.onrender.com").catch((e) =>
      console.error("Keep-alive failed:", e)
    );
  }, []);

  return null;
};

export default PingBackend;
