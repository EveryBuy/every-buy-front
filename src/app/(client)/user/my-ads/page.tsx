"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MyAdsPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/user/my-ads/active-ads");
  }, [router]);

  return null;
}
