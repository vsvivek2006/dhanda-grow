import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data: leads, error } = await supabaseAdmin
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({ leads: leads || [] });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
