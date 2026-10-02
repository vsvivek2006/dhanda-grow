import Link from "next/link";
import { SUPPORT_EMAIL, SUPPORT_PHONE, WHATSAPP_LINK } from "@/lib/constants";
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { DhandaLogo } from "@/components/ui/DhandaLogo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#02020a] text-slate-300 pt-20 pb-12 relative overflow-hidden border-t border-white/10">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="space-y-5">
            <Link href="/" className="inline-block">
              <DhandaLogo size="md" />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              AI-powered digital marketing for local businesses. Dominate Google Maps rankings, automate daily social media postings, and turn satisfied customers into 5★ Google reviews.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#25d366]/15 hover:bg-[#25d366]/25 border border-[#25d366]/30 flex items-center justify-center text-[#25d366] transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href={`tel:${SUPPORT_PHONE.replace(/\D/g, '')}`}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">Platform</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services & Capabilities</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">Frequently Asked Questions</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Growth Guides & Blog</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Book Free Demo</Link></li>
            </ul>
          </div>

          {/* Capabilities */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">Capabilities</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link href="/services" className="hover:text-white transition-colors">Google Maps Optimization</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Automated Social Posters</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">WhatsApp Review Booster</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">24/7 AI Review Replies</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Festival & Promo Campaigns</Link></li>
            </ul>
          </div>

          {/* Office & Contact */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">Office & Support</h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-1" />
                <address className="not-italic leading-relaxed">
                  Ezo Technologies Pvt Ltd<br />
                  Millennium Business Park, Mahape<br />
                  Navi Mumbai, Maharashtra — 400710
                </address>
              </div>
              <div className="pt-1">
                <div>Support: <a href={`tel:${SUPPORT_PHONE.replace(/\D/g, '')}`} className="text-white hover:underline">{SUPPORT_PHONE}</a></div>
                <div>Email: <a href={`mailto:${SUPPORT_EMAIL}`} className="text-white hover:underline">{SUPPORT_EMAIL}</a></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            &copy; {currentYear} Ezo Technologies Pvt Ltd. All rights reserved. Built with AI for India's local businesses.
          </div>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-slate-300 transition-colors">Terms of Use</Link>
            <Link href="/refund-policy" className="hover:text-slate-300 transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
