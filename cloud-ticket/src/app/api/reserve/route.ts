import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/libs/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, event_id } = await req.json();

    if (!event_id) {
      return NextResponse.json(
        { ok: false, error: "Event ID가 필요합니다." },
        { status: 400 }
      );
    }
    // 예약 번호 생성
    const order_id = `TK-${Math.floor(1000 + Math.random() * 9000)}`;

    // 예약 정보 저장
    const { error } = await supabaseServer.from("reservations").insert({
      name,
      email,
      event_id: event_id,
      order_id: order_id,
    });

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json({ ok: true, order_id }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: "예상치 못한 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
