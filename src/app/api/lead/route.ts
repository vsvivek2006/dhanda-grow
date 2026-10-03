import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

// In-memory idempotency cache (TTL: 5 minutes) to handle rapid double-clicks and retries
const idempotencyCache = new Map<string, { id: string; timestamp: number }>();

function cleanExpiredIdempotencyKeys() {
  const now = Date.now();
  for (const [key, value] of idempotencyCache.entries()) {
    if (now - value.timestamp > 5 * 60 * 1000) {
      idempotencyCache.delete(key);
    }
  }
}

export async function POST(req: Request) {
  try {
    cleanExpiredIdempotencyKeys();

    const idempotencyKey =
      req.headers.get("Idempotency-Key") ||
      req.headers.get("X-Idempotency-Key");

    // 1. Return cached response if identical idempotency key was submitted within 5 mins
    if (idempotencyKey && idempotencyCache.has(idempotencyKey)) {
      const cached = idempotencyCache.get(idempotencyKey)!;
      return NextResponse.json(
        { success: true, id: cached.id, duplicate: true },
        { status: 200 }
      );
    }

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

    // 2. Natural deduplication window:
    // If the same mobile number was already recorded in the last 60 seconds, return the existing lead
    try {
      const sixtySecondsAgo = new Date(Date.now() - 60 * 1000).toISOString();
      const { data: existingLead } = await supabaseAdmin
        .from("leads")
        .select("id")
        .eq("mobile_number", cleanPhone)
        .gte("created_at", sixtySecondsAgo)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (existingLead?.id) {
        if (idempotencyKey) {
          idempotencyCache.set(idempotencyKey, { id: existingLead.id, timestamp: Date.now() });
        }
        return NextResponse.json(
          { success: true, id: existingLead.id, duplicate: true },
          { status: 200 }
        );
      }
    } catch (checkErr) {
      // Non-blocking fallback if check fails
      console.warn("Notice checking duplicate lead window:", checkErr);
    }

    // 3. Persist lead directly into Supabase
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
      .select("id");

    if (error) {
      console.error("Supabase lead insertion error:", error);
      return NextResponse.json(
        { error: "Failed to store lead. Please try again or reach out directly." },
        { status: 500 }
      );
    }

    const insertedId = data?.[0]?.id;
    if (idempotencyKey && insertedId) {
      idempotencyCache.set(idempotencyKey, { id: insertedId, timestamp: Date.now() });
    }

    console.log("Lead successfully stored in Supabase:", insertedId);

    return NextResponse.json(
      { success: true, id: insertedId },
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
