import type { Metadata } from "next";
import { SERVICE_PRICE } from "@/lib/constants";
import { LeadForm } from "@/components/shared/LeadForm";
import { CheckCircle2 } from "lucide-react";

export async function generateMetadata({ params }: { params: { type: string } }): Promise<Metadata> {
  const type = params.type.replace(/-/g, " ");
  const TypeName = type.charAt(0).toUpperCase() + type.slice(1);

  return {
    title: `GST Registration for ${TypeName} | Flat ₹499 Fee | GetGSTFast`,
    description: `Complete guide and online service for GST registration for ${TypeName}. Zero government fees, just our flat ₹499 service fee.`,
  };
}

export default function TypeGstRegistrationPage({ params }: { params: { type: string } }) {
  const type = params.type.replace(/-/g, " ");
  const TypeName = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div className="bg-background">
      <section className="bg-gradient-to-b from-slate-50 to-white py-16 md:py-24 border-b border-border">
        <div className="container mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-navy">
              GST Registration for {TypeName}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Are you setting up a {TypeName}? Stay compliant and scale your business with our hassle-free online GST registration service. We handle the paperwork, you focus on growth.
            </p>
            
            <ul className="space-y-3 mt-6">
              {[
                `Expert application preparation for ${TypeName}`,
                "Fast, 100% online processing",
                `Flat ${SERVICE_PRICE} fee with zero government fees`,
                "Dedicated WhatsApp support"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-blue shrink-0" />
                  <span className="text-foreground font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative lg:px-8">
            <LeadForm />
          </div>
        </div>
      </section>
    </div>
  );
}
