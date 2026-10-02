"use client";

import Link from "next/link";
import { Phone, MessageCircle, Sparkles } from "lucide-react";
import { SUPPORT_PHONE, WHATSAPP_LINK } from "@/lib/constants";

export function MobileActionBar() {
  return (
    <div className="fixed bottom-0 left-0 z-40 w-full border-t border-white/10 bg-[#07071a]/95 backdrop-blur-xl shadow-2xl md:hidden">
      <div className="grid h-16 grid-cols-3">
        {/* Call Button */}
        <a
          href={`tel:${SUPPORT_PHONE.replace(/\D/g, "")}`}
          className="flex flex-col items-center justify-center gap-1 border-r border-white/10 text-slate-300 hover:text-white transition-colors"
        >
          <Phone className="h-4 w-4 text-purple-400" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Call</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 border-r border-white/10 text-slate-300 hover:text-[#25D366] transition-colors"
        >
          <MessageCircle className="h-4 w-4 text-[#25D366]" />
          <span className="text-[10px] font-bold uppercase tracking-wider">WhatsApp</span>
        </a>

        {/* Get Started Button */}
        <Link
          href="/contact"
          className="flex flex-col items-center justify-center gap-1 bg-gradient-brand text-white shadow-inner font-bold"
        >
          <Sparkles className="h-4 w-4" />
          <span className="text-[10px] font-extrabold uppercase tracking-wider">Start Free</span>
        </Link>
      </div>
    </div>
  );
}
