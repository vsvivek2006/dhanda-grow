"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  CheckCircle2,
  Users,
  FileText,
  Sparkles,
  ExternalLink,
  CheckCheck,
  ChevronRight,
  Loader2,
} from "lucide-react";

export interface AdminNotification {
  id: string;
  type: "lead" | "post" | "system";
  title: string;
  message: string;
  timestamp: string;
  href: string;
}

export function AdminNotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Load notifications from API or recent events
  const loadNotifications = useCallback(async () => {
    setIsLoading(true);
    try {
      // Fetch latest leads to generate notifications
      const res = await fetch("/api/admin/leads");
      if (res.ok) {
        const data = await res.json();
        const leads = data.leads || [];
        const leadNotifs: AdminNotification[] = leads.slice(0, 5).map((lead: any) => ({
          id: `lead-${lead.id}`,
          type: "lead",
          title: "New Customer Inquiry",
          message: `${lead.name} (${lead.phone}) inquired about ${lead.service || "Growth Service"}`,
          timestamp: lead.created_at,
          href: "/admin/leads",
        }));

        setNotifications(leadNotifs);
      }
    } catch {
      // Fallback notifications if fetch fails
      setNotifications([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 60000);
    return () => clearInterval(interval);
  }, [loadNotifications]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const markAllAsRead = () => {
    setReadIds(new Set(notifications.map((n) => n.id)));
  };

  const handleItemClick = (item: AdminNotification) => {
    setReadIds((prev) => new Set([...prev, item.id]));
    setIsOpen(false);
    router.push(item.href);
  };

  const unreadCount = notifications.filter((n) => !readIds.has(n.id)).length;

  const getIcon = (type: string) => {
    switch (type) {
      case "lead":
        return (
          <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 shrink-0">
            <Users className="w-4 h-4" />
          </div>
        );
      case "post":
        return (
          <div className="w-8 h-8 rounded-lg bg-purple-950/80 border border-purple-800/60 flex items-center justify-center text-purple-400 shrink-0">
            <FileText className="w-4 h-4" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-800/60 flex items-center justify-center text-yellow-400 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <div className="relative inline-block" ref={containerRef}>
      {/* Bell Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2 rounded-xl transition-all cursor-pointer ${
          isOpen
            ? "bg-purple-600/20 text-white border border-purple-500/40"
            : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
        }`}
        aria-label="Admin Notifications"
        title="Admin Notifications"
      >
        <Bell className="w-4 h-4" />

        {/* Dynamic Pulsing Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 min-w-4 px-1 items-center justify-center bg-gradient-to-r from-pink-500 to-purple-600 text-[9px] font-bold text-white shadow-xs font-mono">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          </span>
        )}
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-80 max-w-sm rounded-2xl border border-white/10 bg-[#0a0a20] shadow-2xl shadow-purple-950/70 backdrop-blur-xl z-50 overflow-hidden text-xs">
          {/* Header */}
          <div className="p-3.5 border-b border-white/10 bg-[#0d0d26] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white tracking-wide">Notifications</h3>
              {unreadCount > 0 ? (
                <span className="rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 px-2 py-0.5 text-[10px] font-bold font-mono">
                  {unreadCount} unread
                </span>
              ) : (
                <span className="rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-semibold">
                  All read
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="flex items-center gap-1 text-[11px] font-medium text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          {/* List of Notifications */}
          <div className="max-h-[300px] overflow-y-auto divide-y divide-white/5">
            {isLoading && notifications.length === 0 ? (
              <div className="p-8 text-center text-slate-400">
                <Loader2 className="w-5 h-5 animate-spin mx-auto text-purple-400 mb-2" />
                <p className="text-xs">Loading alerts...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400 mb-2.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <p className="font-semibold text-white text-xs">All Caught Up!</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  No new leads or pending alerts.
                </p>
              </div>
            ) : (
              notifications.map((item) => {
                const isRead = readIds.has(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleItemClick(item)}
                    className={`w-full p-3 text-left transition-colors flex items-start gap-3 cursor-pointer group ${
                      isRead
                        ? "bg-transparent hover:bg-white/5 opacity-70 hover:opacity-100"
                        : "bg-purple-950/20 hover:bg-purple-950/40 border-l-2 border-purple-500"
                    }`}
                  >
                    {getIcon(item.type)}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className={`font-semibold truncate text-xs ${isRead ? "text-slate-300" : "text-white"}`}>
                          {item.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {item.message}
                      </p>
                    </div>

                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-purple-400 transition-colors shrink-0 mt-2" />
                  </button>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="p-2.5 border-t border-white/10 bg-[#0d0d26] flex items-center justify-between text-[11px] text-slate-400 px-3">
            <span>Dhanda Grow Platform</span>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                router.push("/admin/leads");
              }}
              className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View Leads</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
