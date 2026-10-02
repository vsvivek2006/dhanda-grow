import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Admin Dashboard | Dhanda Grow",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let userEmail: string | null = "admin@dhandhagrow.com";
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user?.email) {
      userEmail = user.email;
    }
  } catch {
    // Fallback email
  }

  return <AdminShell userEmail={userEmail}>{children}</AdminShell>;
}
