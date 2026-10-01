"use client";

import Link from "next/link";
import { Phone, MessageCircle, FileText } from "lucide-react";
import { SUPPORT_PHONE, WHATSAPP_LINK } from "@/lib/constants";

export function MobileActionBar() {
  return (
    <div className="fixed bottom-0 left-0 z-40 w-full border-t border-border bg-background shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:hidden">
      <div className="grid h-16 grid-cols-3">
        {/* Call Button */}
        <a
          href={`tel:${SUPPORT_PHONE.replace(/\D/g, "")}`}
          className="flex flex-col items-center justify-center gap-1 border-r border-border text-navy hover:bg-muted"
        >
          <Phone className="h-5 w-5 text-brand-blue" />
          <span className="text-[10px] font-semibold uppercase tracking-wider">Call</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 border-r border-border text-navy hover:bg-muted"
        >
          <MessageCircle className="h-5 w-5 text-[#25D366]" />
          <span className="text-[10px] font-semibold uppercase tracking-wider">WhatsApp</span>
        </a>

        {/* Apply Now Button */}
        <Link
          href="/gst-registration"
          className="flex flex-col items-center justify-center gap-1 bg-primary text-primary-foreground hover:bg-cta-hover"
        >
          <FileText className="h-5 w-5" />
          <span className="text-[10px] font-semibold uppercase tracking-wider">Apply Now</span>
        </Link>
      </div>
    </div>
  );
}
