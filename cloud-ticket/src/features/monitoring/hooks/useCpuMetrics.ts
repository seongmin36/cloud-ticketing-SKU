import { useQuery } from "@tanstack/react-query";

const qk = (minutes: number) => ["metrics", "cpu", minutes] as const;

export function useCpuMetrics(minutes = 10) {
  return useQuery({
    queryKey: qk(minutes),
    queryFn: async () => {
      const res = await fetch(`/api/metrics/cpu?minutes=${minutes}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("cpu metrics failed");
      return res.json();
    },
    refetchInterval: 5000,
  });
}
