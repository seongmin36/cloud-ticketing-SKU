import { ClientSecretCredential } from "@azure/identity";
import { ComputeManagementClient } from "@azure/arm-compute";
import { MetricsClient } from "@azure/monitor-query-metrics";
import { serverEnv } from "@/lib/env.server";

export const credential = new ClientSecretCredential(
  serverEnv.AZURE_TENANT_ID,
  serverEnv.AZURE_CLIENT_ID,
  serverEnv.AZURE_CLIENT_SECRET
);

export const computeClient = new ComputeManagementClient(
  credential,
  serverEnv.AZURE_SUBSCRIPTION_ID
);

// VMSS location으로 regional endpoint 만들기 (예: https://japaneast.metrics.monitor.azure.com) :contentReference[oaicite:1]{index=1}
let cachedMetricsClient: MetricsClient | null = null;
let cachedEndpoint: string | null = null;

export async function getMetricsClient() {
  const vmss = await computeClient.virtualMachineScaleSets.get(
    serverEnv.AZURE_RESOURCE_GROUP,
    serverEnv.AZURE_VMSS_NAME
  );

  const location = (vmss.location ?? "").toLowerCase();
  if (!location) throw new Error("VMSS location not found");

  const endpoint = `https://${location}.metrics.monitor.azure.com`;
  if (!cachedMetricsClient || cachedEndpoint !== endpoint) {
    cachedEndpoint = endpoint;
    cachedMetricsClient = new MetricsClient(endpoint, credential);
  }
  return { metricsClient: cachedMetricsClient, location };
}
