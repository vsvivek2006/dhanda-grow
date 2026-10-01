import type { Metadata } from "next";
import { BRAND_NAME, SUPPORT_PHONE, WHATSAPP_LINK } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | GetGSTFast",
  description: "Learn about GetGSTFast, a private consultancy firm dedicated to making GST registration simple, fast, and transparent for Indian businesses.",
};

export default function AboutPage() {
  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-navy mb-8 text-center">
          About {BRAND_NAME}
        </h1>
        
        <div className="prose prose-lg text-muted-foreground mx-auto">
          <p className="lead text-xl text-navy font-medium text-center mb-12">
            We believe that starting a business in India should be exciting, not bogged down by confusing paperwork and hidden fees.
          </p>

          <div className="bg-slate-50 border border-border rounded-3xl p-8 mb-12">
            <h2 className="font-heading text-2xl font-bold text-navy mb-4">Our Mission</h2>
            <p className="mb-0">
              Our mission is to simplify GST registration for small business owners, freelancers, and startups across India. We aim to remove the stress of tax compliance by offering a fast, fully transparent, and affordable service.
            </p>
          </div>

          <h2 className="font-heading text-2xl font-bold text-navy mb-4">Why We Started</h2>
          <p>
            The GST portal is powerful but often overwhelming for first-time business owners. Many consultants take advantage of this complexity by charging hidden fees, making false promises, or quoting high prices while keeping the actual government fee (which is ₹0) a secret.
          </p>
          <p>
            We started {BRAND_NAME} to change that. We offer a single, flat-fee service of ₹499. You know exactly what you're paying for—our time, expertise, and support—and nothing else.
          </p>

          <h2 className="font-heading text-2xl font-bold text-navy mt-12 mb-6">Our Promise to You</h2>
          <ul className="space-y-4 list-none pl-0">
            {[
              "100% Transparent Pricing: We will never surprise you with hidden charges.",
              "Honest Timelines: We process applications within 24-48 hours. Government approval times are beyond our control, but we will always tell you the truth about delays.",
              "Human Support: You won't be stuck talking to a bot. Our team is available on WhatsApp and Phone to answer your actual questions.",
              "Privacy & Security: Your PAN, Aadhaar, and bank details are handled with strict confidentiality and are only used for your registration."
            ].map((item, i) => {
              const [title, desc] = item.split(": ");
              return (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-blue shrink-0 mt-1" />
                  <div>
                    <strong className="text-navy">{title}:</strong> {desc}
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-16 p-6 border-l-4 border-cta-orange bg-orange-50 rounded-r-xl">
            <h3 className="font-heading text-lg font-bold text-navy mb-2">Important Disclaimer</h3>
            <p className="text-sm">
              {BRAND_NAME} is a private professional consultancy firm. We are <strong>not</strong> a government agency, nor are we affiliated with the GST Council, GSTN, or the Government of India. The official portal for GST is gst.gov.in. We charge a service fee for our professional assistance in preparing and filing your application on your behalf.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center space-x-4">
          <Button size="lg" className="bg-primary hover:bg-cta-hover h-14 px-8 text-lg" asChild>
            <Link href="/gst-registration">Get Started Now</Link>
          </Button>
          <Button size="lg" variant="outline" className="h-14 px-8 text-lg" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
