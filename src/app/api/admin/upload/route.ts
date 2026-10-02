import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { createSupabaseServerClient, supabaseAdmin } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized: Admin authentication required" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files (PNG, JPG, WebP, GIF) are allowed" },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size exceeds 5MB limit" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const extension = file.name.split(".").pop() || "png";
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${extension}`;

    // Attempt Supabase storage first
    try {
      const filePath = `covers/${fileName}`;
      const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
        .from("blog-images")
        .upload(filePath, buffer, {
          contentType: file.type,
          upsert: true,
        });

      if (!uploadError && uploadData) {
        const { data: publicUrlData } = supabaseAdmin.storage
          .from("blog-images")
          .getPublicUrl(filePath);

        if (publicUrlData?.publicUrl) {
          return NextResponse.json({ url: publicUrlData.publicUrl });
        }
      }
    } catch {
      // Supabase storage bucket not configured, fall back to local public upload
    }

    // Local file fallback in public/uploads/
    const uploadsDir = path.resolve(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const localFilePath = path.resolve(uploadsDir, fileName);
    fs.writeFileSync(localFilePath, buffer);

    return NextResponse.json({
      url: `/uploads/${fileName}`,
      size: buffer.length,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to upload image";
    console.error("[uploadRoute] Error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
