"use client";

/**
 * WaitingGate - Suspense Gate 컴포넌트
 * 15초 지연 후 /success로 리다이렉트
 */

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LOADING_DURATION_MS, ROUTES } from "@/lib/constants";
import { simulateDelay } from "@/lib/simulateDelay";

export default function WaitingGate() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const redirect = async () => {
      // 15초 지연
      await simulateDelay(LOADING_DURATION_MS);

      // URL 파라미터 전달
      const params = new URLSearchParams();
      const name = searchParams.get("name");
      const email = searchParams.get("email");
      const orderId = searchParams.get("orderId");

      if (name) params.set("name", name);
      if (email) params.set("email", email);
      if (orderId) params.set("orderId", orderId);

      // Success 페이지로 이동
      router.push(`${ROUTES.SUCCESS}?${params.toString()}`);
    };

    redirect();
  }, [router, searchParams]);

  return null;
}
