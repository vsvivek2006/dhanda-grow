import Link from "next/link";
import { BRAND_NAME, SUPPORT_EMAIL, SUPPORT_PHONE } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white pt-16 pb-8">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <h3 className="font-heading text-2xl font-bold">{BRAND_NAME}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Fast, hassle-free online GST registration for Indian businesses. Expert handled from start to finish with zero hidden charges.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/gst-registration" className="hover:text-white transition-colors">New GST Registration</Link></li>
              <li><Link href="/gst-registration-documents-required" className="hover:text-white transition-colors">Documents Required</Link></li>
              {/* TODO: Add other services here later */}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold">Contact & Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Phone: <a href={`tel:${SUPPORT_PHONE.replace(/\D/g, '')}`} className="hover:text-white">{SUPPORT_PHONE}</a></li>
              <li>Email: <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-white">{SUPPORT_EMAIL}</a></li>
              <li className="pt-2"><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-800 pt-8 mt-8 text-xs text-gray-500 leading-relaxed text-center">
          <p className="mb-2">
            <strong>Disclaimer:</strong> {BRAND_NAME} is a private professional service provider and is not affiliated with, endorsed by, or part of the Government of India, the GST Council, or the GST Network (GSTN). The official government portal for GST is gst.gov.in.
          </p>
          <p>© {currentYear} [TODO: Business Legal Name]. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
