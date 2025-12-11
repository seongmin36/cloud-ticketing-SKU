import { NextResponse } from "next/server";
import { supabaseServer } from "@/libs/supabase/server";

// 이벤트 목록 조회
export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("events")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
