import { NextResponse } from "next/server";
import {
  buildVmssVmListPath,
  getInstanceIdFromResourceId,
  listAllVmssVms,
} from "../_lib/vmss";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const first = buildVmssVmListPath();
  const vms = await listAllVmssVms(first);

  const items = vms
    .map((v) => {
      const instanceId = getInstanceIdFromResourceId(v.id);
      return {
        id: v.id,
        name: v.name,
        instanceId,
        provisioningState: v.properties?.provisioningState ?? null,
      };
    })
    .sort((a, b) => Number(a.instanceId ?? 1e9) - Number(b.instanceId ?? 1e9));

  return NextResponse.json({
    isSuccess: true,
    count: items.length,
    items,
  });
}
