"use server";

import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";
import { createSupabaseServerClient, supabaseAdmin } from "@/lib/supabase/server";
import { postSchema, type PostInput } from "@/lib/validations/post";
import { ZodError } from "zod";

const BLOG_DIR = path.resolve(process.cwd(), "content/blog");

async function verifyAdminAuth() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized: Admin authentication required");
  }
  return user;
}

function syncMarkdownFile(slug: string, title: string, excerpt: string, content: string) {
  try {
    if (!fs.existsSync(BLOG_DIR)) {
      fs.mkdirSync(BLOG_DIR, { recursive: true });
    }

    const filePath = path.resolve(BLOG_DIR, `${slug}.md`);
    if (!filePath.startsWith(BLOG_DIR)) return;

    const today = new Date().toISOString().split("T")[0];
    const cleanExcerpt = (excerpt || title).replace(/"/g, '\\"');
    const cleanTitle = title.replace(/"/g, '\\"');

    const fileContent = `---
title: "${cleanTitle}"
date: "${today}"
excerpt: "${cleanExcerpt}"
---

${content}
`;

    fs.writeFileSync(filePath, fileContent, "utf8");
  } catch (err) {
    console.error("Failed to sync markdown file:", err);
  }
}

export async function createPostAction(input: PostInput) {
  try {
    await verifyAdminAuth();

    const normalizedInput = {
      ...input,
      meta_description: input.meta_description ?? "",
      cover_image_url: input.cover_image_url ?? "",
    };
    const validated = postSchema.parse(normalizedInput);

    // 1. Sync markdown file on disk
    syncMarkdownFile(
      validated.slug,
      validated.title,
      validated.meta_description || validated.title,
      validated.content
    );

    // 2. Persist in Supabase blog_posts table
    const { data, error } = await supabaseAdmin
      .from("blog_posts")
      .upsert(
        {
          slug: validated.slug,
          title: validated.title,
          excerpt: validated.meta_description || validated.title,
          content: validated.content,
          tags: validated.tags || [],
          updated_at: new Date().toISOString(),
        },
        { onConflict: "slug" }
      )
      .select()
      .single();

    if (error) {
      console.warn("Supabase upsert warning:", error.message);
    }

    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    revalidatePath(`/blog/${validated.slug}`);
    revalidatePath("/sitemap.xml");

    return { success: true, data: data || { id: validated.slug, ...validated } };
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      return { success: false, error: err.issues[0]?.message || "Invalid post data." };
    }
    const message = err instanceof Error ? err.message : "Failed to create post.";
    console.error("[createPostAction] Error:", err);
    return { success: false, error: message };
  }
}

export async function updatePostAction(id: string, input: PostInput) {
  try {
    await verifyAdminAuth();

    const normalizedInput = {
      ...input,
      meta_description: input.meta_description ?? "",
      cover_image_url: input.cover_image_url ?? "",
    };
    const validated = postSchema.parse(normalizedInput);

    // 1. Sync markdown file on disk
    syncMarkdownFile(
      validated.slug,
      validated.title,
      validated.meta_description || validated.title,
      validated.content
    );

    // 2. Update Supabase blog_posts table
    const { data, error } = await supabaseAdmin
      .from("blog_posts")
      .update({
        slug: validated.slug,
        title: validated.title,
        excerpt: validated.meta_description || validated.title,
        content: validated.content,
        tags: validated.tags || [],
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      // If updating by ID didn't match, attempt update by slug
      await supabaseAdmin
        .from("blog_posts")
        .update({
          title: validated.title,
          excerpt: validated.meta_description || validated.title,
          content: validated.content,
          tags: validated.tags || [],
          updated_at: new Date().toISOString(),
        })
        .eq("slug", validated.slug);
    }

    revalidatePath("/admin/blog");
    revalidatePath(`/admin/blog/${id}/edit`);
    revalidatePath("/blog");
    revalidatePath(`/blog/${validated.slug}`);
    revalidatePath("/sitemap.xml");

    return { success: true, data: data || { id, ...validated } };
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      return { success: false, error: err.issues[0]?.message || "Invalid post data." };
    }
    const message = err instanceof Error ? err.message : "Failed to update post.";
    console.error("[updatePostAction] Error:", err);
    return { success: false, error: message };
  }
}

export async function deletePostAction(id: string) {
  try {
    await verifyAdminAuth();

    // Find slug first
    const { data: post } = await supabaseAdmin
      .from("blog_posts")
      .select("slug")
      .eq("id", id)
      .single();

    const postSlug = post?.slug || id;

    // 1. Delete from Supabase
    await supabaseAdmin.from("blog_posts").delete().eq("id", id);
    if (postSlug) {
      await supabaseAdmin.from("blog_posts").delete().eq("slug", postSlug);
    }

    // 2. Remove markdown file from disk
    if (postSlug) {
      const filePath = path.resolve(BLOG_DIR, `${postSlug}.md`);
      if (filePath.startsWith(BLOG_DIR) && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    if (postSlug) {
      revalidatePath(`/blog/${postSlug}`);
    }
    revalidatePath("/sitemap.xml");

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete post.";
    console.error("[deletePostAction] Error:", err);
    return { success: false, error: message };
  }
}
