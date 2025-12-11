"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LOADING_DURATION_MS, ROUTES } from "@/lib/constants";
import { simulateDelay } from "@/lib/simulateDelay";

// 대기 게이트 컴포넌트
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
      const order_id = searchParams.get("order_id");
      const event_id = searchParams.get("event_id");

      if (name) params.set("name", name);
      if (email) params.set("email", email);
      if (order_id) params.set("order_id", order_id);
      if (event_id) params.set("event_id", event_id);

      // Success 페이지로 이동
      router.push(`${ROUTES.SUCCESS}?${params.toString()}`);
    };

    redirect();
  }, [router, searchParams]);

  return null;
}
