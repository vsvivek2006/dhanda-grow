"use client";

import { useState } from "react";
import {
  Users,
  Search,
  Download,
  Phone,
  MessageCircle,
  Calendar,
  Building,
  MapPin,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface Lead {
  id: string;
  full_name: string;
  mobile_number: string;
  email: string | null;
  state: string;
  business_type: string;
  created_at: string;
}

export function LeadsClient({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Compute metrics
  const totalLeads = leads.length;
  const todayDate = new Date().toISOString().split("T")[0];
  const todayLeads = leads.filter((l) => l.created_at.startsWith(todayDate)).length;

  const categories = Array.from(
    new Set(leads.map((l) => l.business_type).filter(Boolean))
  );

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.mobile_number.includes(searchTerm) ||
      (lead.email && lead.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      lead.state.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || lead.business_type === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const exportCSV = () => {
    if (leads.length === 0) {
      alert("No leads to export.");
      return;
    }

    const headers = ["ID", "Full Name", "Mobile Number", "Email", "State", "Business Type", "Date"];
    const rows = filteredLeads.map((l) => [
      l.id,
      `"${l.full_name}"`,
      `"${l.mobile_number}"`,
      `"${l.email || ""}"`,
      `"${l.state}"`,
      `"${l.business_type}"`,
      `"${new Date(l.created_at).toLocaleString("en-IN")}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `dhanda-grow-leads-${todayDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/admin/leads");
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
      }
    } catch (err) {
      console.error("Refresh failed:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-extrabold text-white">
            Customer Leads Dashboard
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Real-time inquiries and demo requests captured in Supabase.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleRefresh}
            variant="outline"
            size="sm"
            disabled={isRefreshing}
            className="border-white/10 bg-white/5 hover:bg-white/10 text-slate-300"
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>

          <Button
            onClick={exportCSV}
            size="sm"
            className="bg-gradient-brand text-white font-semibold shadow-md shadow-purple-600/30"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-white/10 bg-[#09091f]">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Total Captured Leads</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">
            {totalLeads}
          </div>
          <p className="text-xs text-slate-400 mt-2">
            All-time demo & consultation requests
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-white/10 bg-[#09091f]">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Today's New Inquiries</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono">
            {todayLeads}
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Captured in the last 24 hours
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-white/10 bg-[#09091f]">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Active Categories</span>
            <Building className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-purple-300 font-mono">
            {categories.length}
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Diverse local business industries
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-[#09091f] p-4 rounded-2xl border border-white/10">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search by name, phone, email, or state..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500 h-10"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="all" className="bg-[#09091f] text-white">
            All Categories ({totalLeads})
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat} className="bg-[#09091f] text-white">
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Leads Table */}
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden shadow-xl bg-[#09091f]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-white/5 border-b border-white/10 text-xs font-semibold uppercase text-slate-400">
              <tr>
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6">Phone & Channels</th>
                <th className="py-4 px-6">Location</th>
                <th className="py-4 px-6">Business Category</th>
                <th className="py-4 px-6">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLeads.map((lead) => {
                const cleanPhone = lead.mobile_number.replace(/\D/g, "");
                const waLink = `https://wa.me/91${cleanPhone}?text=Hi%20${encodeURIComponent(
                  lead.full_name
                )},%20thank%20you%20for%20contacting%20Dhanda%20Grow!`;

                return (
                  <tr
                    key={lead.id}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="py-4 px-6">
                      <div className="font-semibold text-white">
                        {lead.full_name}
                      </div>
                      {lead.email && (
                        <div className="text-xs text-slate-400">
                          {lead.email}
                        </div>
                      )}
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-slate-200">
                          {lead.mobile_number}
                        </span>
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-[#25d366]/20 text-[#25d366] hover:bg-[#25d366]/30 transition-colors"
                          title="WhatsApp Direct"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={`tel:${lead.mobile_number}`}
                          className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors"
                          title="Direct Call"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{lead.state}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/25">
                        {lead.business_type}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-xs text-slate-400">
                      {new Date(lead.created_at).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                );
              })}

              {filteredLeads.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-12 text-center text-slate-400 text-sm"
                  >
                    No customer leads match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
