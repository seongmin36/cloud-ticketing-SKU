import { z } from "zod";

const AzureEnvSchema = z.object({
  AZURE_TENANT_ID: z.string().min(1),
  AZURE_CLIENT_ID: z.string().min(1),
  AZURE_CLIENT_SECRET: z.string().min(1),

  AZURE_SUBSCRIPTION_ID: z.string().min(1),
  AZURE_RESOURCE_GROUP: z.string().min(1),
  AZURE_VMSS_NAME: z.string().min(1),
});

export function getAzureEnv() {
  return AzureEnvSchema.parse(process.env);
}

type TokenCache = { accessToken: string; expiresAtMs: number };
let tokenCache: TokenCache | null = null;

async function getArmAccessToken() {
  const { AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET } =
    getAzureEnv();

  const now = Date.now();
  if (tokenCache && tokenCache.expiresAtMs - now > 60_000)
    return tokenCache.accessToken;

  const tokenUrl = `https://login.microsoftonline.com/${AZURE_TENANT_ID}/oauth2/v2.0/token`;

  const body = new URLSearchParams();
  body.set("client_id", AZURE_CLIENT_ID);
  body.set("client_secret", AZURE_CLIENT_SECRET);
  body.set("grant_type", "client_credentials");
  body.set("scope", "https://management.azure.com/.default");

  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to get ARM token: ${res.status} ${text}`);
  }

  const json = (await res.json()) as {
    access_token: string;
    expires_in: number;
  };
  tokenCache = {
    accessToken: json.access_token,
    expiresAtMs: now + json.expires_in * 1000,
  };
  return tokenCache.accessToken;
}

function toArmUrl(pathOrUrl: string) {
  if (pathOrUrl.startsWith("https://")) return pathOrUrl;
  // path like "/subscriptions/.."
  return `https://management.azure.com${pathOrUrl}`;
}

export async function armGet<T>(pathOrUrl: string): Promise<T> {
  const token = await getArmAccessToken();
  const url = toArmUrl(pathOrUrl);

  const res = await fetch(url, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`ARM GET failed: ${res.status} ${text}`);
  }
  return (await res.json()) as T;
}
