import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title is too long"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase alphanumeric with hyphens"),
  content: z.string().min(1, "Content is required"),
  meta_description: z.string().max(300, "Meta description is too long"),
  cover_image_url: z.string(),
  author: z.string().min(1, "Author is required"),
  tags: z.array(z.string()),
  status: z.enum(["draft", "published"]),
  source: z.enum(["manual", "ai", "ai-edited"]),
});

export type PostInput = z.infer<typeof postSchema>;

export interface PostRecord extends PostInput {
  id: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export type PostSummary = Omit<PostRecord, "content">;
