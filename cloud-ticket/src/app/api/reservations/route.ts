import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/libs/supabase/server";

// 예약 생성
export async function POST(req: NextRequest) {
  try {
    const { name, email, event_id } = await req.json();

    // 입력 검증
    if (!event_id) {
      return NextResponse.json(
        {
          success: false,
          error: "Event ID가 필요합니다.",
        },
        { status: 400 }
      );
    }

    if (!name || !email) {
      return NextResponse.json(
        {
          success: false,
          error: "이름과 이메일이 필요합니다.",
        },
        { status: 400 }
      );
    }

    // 예약 번호 생성
    const order_id = `TK-${Math.floor(1000 + Math.random() * 9000)}`;

    // 예약 정보 저장
    const { data, error } = await supabaseServer
      .from("reservations")
      .insert({
        name,
        email,
        event_id,
        order_id,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          id: data.id,
          order_id: data.order_id,
          event_id: data.event_id,
          name: data.name,
          email: data.email,
          created_at: data.created_at,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "예상치 못한 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// 예약 목록 조회 (선택적으로 event_id로 필터링)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const event_id = searchParams.get("event_id");

    let query = supabaseServer
      .from("reservations")
      .select("*")
      .order("created_at", { ascending: false });

    // event_id가 있으면 필터링
    if (event_id) {
      query = query.eq("event_id", Number(event_id));
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "예상치 못한 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
