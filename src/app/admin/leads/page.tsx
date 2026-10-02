import { supabaseAdmin } from "@/lib/supabase/server";
import { LeadsClient, Lead } from "./LeadsClient";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const { data: leads, error } = await supabaseAdmin
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch leads:", error);
  }

  return <LeadsClient initialLeads={(leads as Lead[]) || []} />;
}
