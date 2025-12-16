"use client";

import { useQuery } from "@tanstack/react-query";

export default function MonitorPage() {
  const q = useQuery({
    queryKey: ["vm-metrics", "cpu"],
    queryFn: async () => {
      const res = await fetch("/api/metrics/vm");
      if (!res.ok) throw new Error("metrics fetch failed");
      return res.json() as Promise<{
        metrics: { timeStamp: string; average: number | null }[];
      }>;
    },
    refetchInterval: 10_000,
  });

  if (q.isLoading) return <div>loading...</div>;
  if (q.isError) return <div>error</div>;

  return (
    <div>
      <h1>VM CPU (avg)</h1>
      <ul>
        {q.data?.metrics.slice(-10).map((p) => (
          <li key={p.timeStamp}>
            {p.timeStamp} : {p.average ?? "null"}
          </li>
        ))}
      </ul>
    </div>
  );
}
