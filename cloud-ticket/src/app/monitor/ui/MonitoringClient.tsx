"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

type VmRes = {
  items: Array<{
    id: string;
    name: string;
    instanceId: string | null;
    provisioningState: string | null;
  }>;
};

type CpuRes = {
  minutes: number;
  items: Array<{
    instanceId: string;
    points: Array<{ t: string; v: number | null }>;
    error?: string;
  }>;
};

type NetRes = {
  minutes: number;
  items: Array<{
    instanceId: string;
    netIn: Array<{ t: string; v: number | null }>;
    netOut: Array<{ t: string; v: number | null }>;
    error?: string;
  }>;
};

function toHHmm(iso: string) {
  const d = new Date(iso);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

function mergeSeries(
  series: Record<string, Array<{ t: string; v: number | null }>>
) {
  const allTs = new Set<string>();
  Object.values(series).forEach((arr) => arr.forEach((p) => allTs.add(p.t)));
  const tsSorted = Array.from(allTs).sort();

  return tsSorted.map((t) => {
    const row: Record<string, string | number | null> = { t, label: toHHmm(t) };
    for (const [key, arr] of Object.entries(series)) {
      row[key] = arr.find((p) => p.t === t)?.v ?? null;
    }
    return row;
  });
}
export default function MonitoringClient() {
  const router = useRouter();
  const [minutes, setMinutes] = useState(10);

  const vmQ = useQuery({
    queryKey: ["vmss", "vm"],
    queryFn: async (): Promise<VmRes> => {
      const r = await fetch("/api/vm", { cache: "no-store" });
      if (!r.ok) throw new Error("VM 목록 로드 실패");
      return r.json();
    },
    refetchOnWindowFocus: false,
  });

  const instanceIds = useMemo(
    () =>
      (vmQ.data?.items ?? [])
        .map((x) => x.instanceId)
        .filter(Boolean) as string[],
    [vmQ.data]
  );
  const instanceIdParam = instanceIds.join(",");

  const cpuQ = useQuery({
    queryKey: ["metrics", "cpu", instanceIdParam, minutes],
    enabled: instanceIds.length > 0,
    queryFn: async (): Promise<CpuRes> => {
      const r = await fetch(
        `/api/metrics/cpu?instanceIds=${encodeURIComponent(
          instanceIdParam
        )}&minutes=${minutes}`,
        {
          cache: "no-store",
        }
      );
      if (!r.ok) throw new Error("CPU 메트릭 로드 실패");
      return r.json();
    },
    refetchInterval: 5000,
    refetchOnWindowFocus: false,
  });

  const netQ = useQuery({
    queryKey: ["metrics", "network", instanceIdParam, minutes],
    enabled: instanceIds.length > 0,
    queryFn: async (): Promise<NetRes> => {
      const r = await fetch(
        `/api/metrics/network?instanceIds=${encodeURIComponent(
          instanceIdParam
        )}&minutes=${minutes}`,
        { cache: "no-store" }
      );
      if (!r.ok) throw new Error("Network 메트릭 로드 실패");
      return r.json();
    },
    refetchInterval: 5000,
    refetchOnWindowFocus: false,
  });

  const cpuChart = useMemo(() => {
    const byId: Record<string, Array<{ t: string; v: number | null }>> = {};
    (cpuQ.data?.items ?? []).forEach((it) => (byId[it.instanceId] = it.points));
    return mergeSeries(byId);
  }, [cpuQ.data]);

  const netInChart = useMemo(() => {
    const byId: Record<string, Array<{ t: string; v: number | null }>> = {};
    (netQ.data?.items ?? []).forEach((it) => (byId[it.instanceId] = it.netIn));
    return mergeSeries(byId);
  }, [netQ.data]);

  const netOutChart = useMemo(() => {
    const byId: Record<string, Array<{ t: string; v: number | null }>> = {};
    (netQ.data?.items ?? []).forEach((it) => (byId[it.instanceId] = it.netOut));
    return mergeSeries(byId);
  }, [netQ.data]);

  if (vmQ.isLoading) return <div>VM 목록 불러오는 중…</div>;
  if (vmQ.isError)
    return <div>VM 목록 로드 실패: {(vmQ.error as Error)?.message}</div>;

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold">VMSS 모니터링</h1>
          <p className="text-sm text-neutral-500">
            5초마다 갱신 / 최근 {minutes}분
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            className="border rounded-md px-2 py-1 text-sm"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
          >
            {[5, 10, 30, 60].map((m) => (
              <option key={m} value={m}>
                {m}분
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => router.back()}
            className="h-9 px-3 rounded-lg border border-black/10 bg-white text-sm font-medium text-[#171717] hover:bg-gray-50 active:bg-gray-100 transition-all"
          >
            이전 화면으로
          </button>
        </div>
      </header>

      <section className="rounded-xl border p-4">
        <h2 className="font-medium mb-3">CPU (%)</h2>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={cpuChart}>
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              {instanceIds.map((id) => (
                <Line key={id} type="monotone" dataKey={id} dot={false} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="rounded-xl border p-4">
        <h2 className="font-medium mb-3">Network In (bytes/min)</h2>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={netInChart}>
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              {instanceIds.map((id) => (
                <Line key={id} type="monotone" dataKey={id} dot={false} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="rounded-xl border p-4">
        <h2 className="font-medium mb-3">Network Out (bytes/min)</h2>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={netOutChart}>
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              {instanceIds.map((id) => (
                <Line key={id} type="monotone" dataKey={id} dot={false} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
