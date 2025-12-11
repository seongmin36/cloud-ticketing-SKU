import { NextResponse } from "next/server";
import { supabaseServer } from "@/libs/supabase/server";

// 주문번호로 예약 조회
export async function GET(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const { orderId } = params;

    if (!orderId || !orderId.startsWith("TK-")) {
      return NextResponse.json(
        { success: false, error: "유효하지 않은 주문번호입니다." },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseServer
      .from("reservations")
      .select("*")
      .eq("order_id", orderId)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { success: false, error: "예약을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch reservation" },
      { status: 500 }
    );
  }
}
