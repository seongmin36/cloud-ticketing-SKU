import { NextResponse } from "next/server";
import { z } from "zod";
import { DefaultAzureCredential } from "@azure/identity";

const MetricPointScehma = z.object({
  timeStamp: z.string(),
  average: z.number().nullable().optional(),
});

const MetricResponseSchema = z.object({
  value: z.array(
    z.object({
      timeseries: z.array(
        z.object({
          data: z.array(MetricPointScehma),
        })
      ),
    })
  ),
});

export async function GET() {
  const vmResourceId = process.env.VM_RESOURCE_ID;
  if (!vmResourceId) {
    return NextResponse.json(
      { error: "VM_RESOURCE_ID is not set" },
      { status: 500 }
    );
  }

  const credential = new DefaultAzureCredential();
  const token = await credential.getToken(
    "https://management.azure.com/.default"
  );
  if (!token.token) {
    return NextResponse.json({ error: "Failed to get token" }, { status: 500 });
  }

  const end = new Date();
  const start = new Date(end.getTime() - 20 * 60 * 1000);
  const timespan = `${start.toISOString()}/${end.toISOString()}`;

  const url =
    `https://management.azure.com${vmResourceId}` +
    `/providers/Microsoft.Insights/metics` +
    `?api-version=2023-10-01` +
    `$metricnames=${encodeURIComponent("Percentage CPU")}` +
    `$timespan=${encodeURIComponent(timespan)}` +
    `$interval=PT1M` +
    `$aggregation=Average`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token.token}` },
    cache: "no-store",
  });

  const json = await res.json();
  const parsed = MetricResponseSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid metrics payload", detail: parsed.error.flatten() },
      { status: 500 }
    );
  }

  const metrics = parsed.data.value[0].timeseries[0].data ?? [];
  const simplified = metrics.map((p) => ({
    timeStamp: p.timeStamp,
    average: p.average ?? null,
  }));

  return NextResponse.json({ metrics: simplified });
}
