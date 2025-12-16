import os from "node:os";

export const runtime = "nodejs"; // edge 말고 node
export async function GET() {
  return new Response(`OK ${os.hostname()}`, { status: 200 });
}
