import { armGet, getAzureEnv } from "./azureArm";

export type VmssVmList = {
  value: Array<{
    id: string;
    name: string;
    properties?: { provisioningState?: string };
  }>;
  nextLink?: string;
};

export async function listAllVmssVms(firstPath: string) {
  const out: VmssVmList["value"] = [];
  let next: string | undefined = firstPath;

  while (next) {
    const data = (await armGet<VmssVmList>(next)) as VmssVmList;
    out.push(...(data.value ?? []));
    next = data.nextLink;
  }
  return out;
}

export function buildVmssVmListPath() {
  const { AZURE_SUBSCRIPTION_ID, AZURE_RESOURCE_GROUP, AZURE_VMSS_NAME } =
    getAzureEnv();

  // 네가 쓰던 버전 유지. 만약 InvalidApiVersion 나오면 provider show로 교체하면 됨.
  const apiVersion = "2025-04-01";

  return (
    `/subscriptions/${AZURE_SUBSCRIPTION_ID}` +
    `/resourceGroups/${AZURE_RESOURCE_GROUP}` +
    `/providers/Microsoft.Compute/virtualMachineScaleSets/${AZURE_VMSS_NAME}` +
    `/virtualMachines?api-version=${apiVersion}`
  );
}

/** resourceId: .../virtualMachines/{instanceId} */
export function getInstanceIdFromResourceId(resourceId: string) {
  const parts = resourceId.split("/virtualMachines/");
  return parts.length === 2 ? parts[1] : resourceId.split("/").pop() ?? null;
}

export function buildVmssVmResourceId(instanceId: string) {
  const { AZURE_SUBSCRIPTION_ID, AZURE_RESOURCE_GROUP, AZURE_VMSS_NAME } =
    getAzureEnv();
  return (
    `/subscriptions/${AZURE_SUBSCRIPTION_ID}` +
    `/resourceGroups/${AZURE_RESOURCE_GROUP}` +
    `/providers/Microsoft.Compute/virtualMachineScaleSets/${AZURE_VMSS_NAME}` +
    `/virtualMachines/${instanceId}`
  );
}
