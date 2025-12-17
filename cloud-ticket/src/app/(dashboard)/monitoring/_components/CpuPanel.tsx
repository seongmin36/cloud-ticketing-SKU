"use client";

import { useCpuMetrics } from "@/features/monitoring/hooks/useCpuMetrics";

export function CpuPanel() {
  const { data, isLoading, error } = useCpuMetrics(10);

  if (isLoading) return <div>CPU 로딩중...</div>;
  if (error) return <div>CPU 에러</div>;

  return (
    <pre className="text-xs overflow-auto">{JSON.stringify(data, null, 2)}</pre>
  );
}
