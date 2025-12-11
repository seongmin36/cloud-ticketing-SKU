import { NextResponse } from "next/server";
import { supabaseServer } from "@/libs/supabase/server";

// 단일 예약 조회
export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const reservationId = Number(params.id);

    if (isNaN(reservationId) || reservationId <= 0) {
      return NextResponse.json(
        { success: false, error: "유효하지 않은 예약 ID입니다." },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseServer
      .from("reservations")
      .select("*")
      .eq("id", reservationId)
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
