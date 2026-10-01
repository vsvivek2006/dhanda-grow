import { NextResponse } from "next/server";

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

    // [TODO: Save to Google Sheets / Supabase / Firebase]
    // Example: await saveToGoogleSheets({ fullName, mobileNumber, email, state, businessType });

    // [TODO: Send email notification to Admin]
    // Example: await sendEmailNotification({ fullName, mobileNumber });

    console.log("New Lead Received:", { fullName, mobileNumber, email, state, businessType });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing lead:", error);
    return NextResponse.json(
      { error: "Failed to process lead" },
      { status: 500 }
    );
  }
}
