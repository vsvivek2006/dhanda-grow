import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, mobileNumber, email, state, businessType } = body;

    if (!fullName || !mobileNumber || !state || !businessType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Persist lead directly into Supabase
    const { data, error } = await supabaseAdmin
      .from("leads")
      .insert([
        {
          full_name: fullName.trim(),
          mobile_number: mobileNumber.trim(),
          email: email ? email.trim() : null,
          state: state.trim(),
          business_type: businessType.trim(),
        },
      ])
      .select();

    if (error) {
      console.error("Supabase lead insertion error:", error);
    } else {
      console.log("Lead successfully stored in Supabase:", data?.[0]?.id);
    }

    return NextResponse.json(
      { success: true, id: data?.[0]?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing lead:", error);
    return NextResponse.json(
      { error: "Failed to process lead" },
      { status: 500 }
    );
  }
}
