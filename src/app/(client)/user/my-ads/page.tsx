"use client";

import { useRouter } from "next/navigation";

export default function MyAdsPage() {
  const router = useRouter();

  router.push("/user/my-ads/active-ads");

  return;
}
