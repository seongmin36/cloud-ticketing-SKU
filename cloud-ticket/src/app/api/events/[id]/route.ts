import { NextResponse } from "next/server";
import { supabaseServer } from "@/libs/supabase/server";

// 단일 이벤트 조회
export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const eventId = Number(params.id);

    if (isNaN(eventId) || eventId <= 0) {
      return NextResponse.json(
        { success: false, error: "유효하지 않은 이벤트 ID입니다." },
        { status: 400 }
      );
    }

    // 이벤트 조회 쿼리
    const { data, error } = await supabaseServer
      .from("events")
      .select("*")
      .eq("id", eventId)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { success: false, error: "이벤트를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}
