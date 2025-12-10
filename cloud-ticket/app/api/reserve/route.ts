import { supabaseServer } from "../../../libs/supabase/server";

export async function POST(req: Request) {
  const { name, email, eventId } = await req.json();

  const orderId = `TK-${Math.floor(1000 + Math.random() * 9000)}`;

  await supabaseServer.from("reservations").insert({
    name,
    email,
    event_id: eventId,
    order_id: orderId,
  });

  return Response.json({ ok: true, orderId });
}
