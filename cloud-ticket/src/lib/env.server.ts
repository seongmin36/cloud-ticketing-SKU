import { z } from "zod";

export const serverEnv = z
  .object({
    AZURE_TENANT_ID: z.string().min(1),
    AZURE_CLIENT_ID: z.string().min(1),
    AZURE_CLIENT_SECRET: z.string().min(1),
    AZURE_SUBSCRIPTION_ID: z.string().min(1),

    AZURE_RESOURCE_GROUP: z.string().min(1),
    AZURE_VMSS_NAME: z.string().min(1),
  })
  .parse(process.env);
