import { NextResponse } from "next/server";
import { z } from "zod";
import { armGet } from "../../_lib/azureArm";
import { buildVmssVmResourceId } from "../../_lib/vmss";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const QuerySchema = z.object({
  instanceIds: z.string().optional(), // "9,10" (없으면 전부는 프론트에서 /api/vm로 받아서 넣는 걸 권장)
  minutes: z.coerce.number().int().min(1).max(180).default(10),
});

type MetricsResponse = {
  value: Array<{
    name: { value: string; localizedValue: string };
    timeseries: Array<{
      data: Array<{ timeStamp: string; average?: number; total?: number }>;
    }>;
  }>;
};

function isoRange(minutes: number) {
  const end = new Date();
  const start = new Date(end.getTime() - minutes * 60 * 1000);
  return { startIso: start.toISOString(), endIso: end.toISOString() };
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const { instanceIds, minutes } = QuerySchema.parse(
    Object.fromEntries(url.searchParams)
  );

  const ids = (instanceIds ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (ids.length === 0) {
    return NextResponse.json(
      {
        isSuccess: false,
        message: "instanceIds query param required (e.g. ?instanceIds=9,10)",
      },
      { status: 400 }
    );
  }

  const { startIso, endIso } = isoRange(minutes);

  const metricnames = encodeURIComponent("Percentage CPU");
  const timespan = encodeURIComponent(`${startIso}/${endIso}`);

  const items = await Promise.all(
    ids.map(async (instanceId) => {
      const resourceId = buildVmssVmResourceId(instanceId);
      const path =
        `${resourceId}/providers/microsoft.insights/metrics` +
        `?api-version=2018-01-01` +
        `&metricnames=${metricnames}` +
        `&timespan=${timespan}` +
        `&interval=PT1M` +
        `&aggregation=Average`;

      try {
        const data = await armGet<MetricsResponse>(path);
        const series = data.value?.[0]?.timeseries?.[0]?.data ?? [];
        return {
          instanceId,
          resourceId,
          points: series.map((p) => ({ t: p.timeStamp, v: p.average ?? null })),
        };
      } catch (e: unknown) {
        return {
          instanceId,
          resourceId,
          points: [],
          error: (e as Error)?.message ?? "unknown error",
        };
      }
    })
  );

  return NextResponse.json({ isSuccess: true, minutes, items });
}
