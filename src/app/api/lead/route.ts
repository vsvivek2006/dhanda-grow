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

    // Input bounds validation (OWASP input validation standard)
    const cleanName = String(fullName).trim().slice(0, 100);
    const cleanPhone = String(mobileNumber).trim().replace(/[^\d+ -]/g, "").slice(0, 20);
    const cleanEmail = email ? String(email).trim().slice(0, 100) : null;
    const cleanState = String(state).trim().slice(0, 60);
    const cleanBusiness = String(businessType).trim().slice(0, 60);

    if (cleanPhone.replace(/\D/g, "").length < 10) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit mobile number" },
        { status: 400 }
      );
    }

    // Persist lead directly into Supabase
    const { data, error } = await supabaseAdmin
      .from("leads")
      .insert([
        {
          full_name: cleanName,
          mobile_number: cleanPhone,
          email: cleanEmail,
          state: cleanState,
          business_type: cleanBusiness,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase lead insertion error:", error);
      return NextResponse.json(
        { error: "Failed to store lead. Please try again or reach out directly." },
        { status: 500 }
      );
    }

    console.log("Lead successfully stored in Supabase:", data?.[0]?.id);

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
