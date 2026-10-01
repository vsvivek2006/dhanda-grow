import type { Metadata } from "next";
import { CheckCircle2, FileText, CheckCircle, UploadCloud, ShieldCheck } from "lucide-react";
import { LeadForm } from "@/components/shared/LeadForm";
import { SERVICE_PRICE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "GST Registration Online – Get Your GSTIN in Simple Steps",
  description: "Registering for GST online is simple with our flat ₹499 service. Zero government fees. We handle the entire process from form preparation to final submission.",
};

export default function GstRegistrationServicePage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-navy py-16 md:py-24 text-white">
        <div className="container mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              GST Registration Online – Get Your GSTIN in a Few Simple Steps
            </h1>
            <p className="text-lg text-blue-100 leading-relaxed max-w-xl">
              Registering for GST is a mandatory requirement for many businesses in India. Whether you are a freelancer, e-commerce seller, consultant, or a growing small business, obtaining a valid GST identification number (GSTIN) is the first step toward tax compliance and smoother business operations.
            </p>
            <div className="bg-white/10 p-4 rounded-xl border border-white/20 inline-block">
              <p className="font-semibold text-lg text-white mb-2">
                Flat Fee: {SERVICE_PRICE}
              </p>
              <p className="text-sm text-blue-200">
                Government Fee: ₹0 | No hidden charges
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-2xl p-2 shadow-2xl relative z-10">
              <LeadForm />
            </div>
            {/* Decoration */}
            <div className="absolute -inset-4 bg-brand-blue/20 blur-3xl -z-10 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-4 space-y-16">
          
          <div className="prose prose-lg text-muted-foreground max-w-none">
            <h2 className="text-3xl font-heading font-bold text-navy mb-6">What Is GST Registration?</h2>
            <p>
              Goods and Services Tax (GST) is a unified indirect tax levied on the supply of goods and services across India. GST registration is the process by which a business obtains a unique 15-digit GSTIN from the tax authorities. Once registered, the business can:
            </p>
            <ul className="list-none space-y-3 mt-6">
              {[
                "Legally collect GST from customers",
                "Claim input tax credit on purchases",
                "File GST returns as required by law",
                "Operate across state borders without separate permits"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-blue shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center bg-slate-50 p-8 rounded-3xl border border-border">
            <div>
              <h2 className="text-3xl font-heading font-bold text-navy mb-6">Who Needs GST Registration?</h2>
              <p className="text-muted-foreground mb-6">Under the GST law, registration is compulsory in the following cases:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-cta-orange mt-2 shrink-0"></div><span className="text-muted-foreground">Businesses with annual aggregate turnover exceeding ₹40 lakh (₹20 lakh for service providers)</span></li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-cta-orange mt-2 shrink-0"></div><span className="text-muted-foreground">Businesses involved in inter-state supply of goods or services</span></li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-cta-orange mt-2 shrink-0"></div><span className="text-muted-foreground">E-commerce sellers and aggregators</span></li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-cta-orange mt-2 shrink-0"></div><span className="text-muted-foreground">Casual taxable persons and non-resident taxable persons</span></li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-cta-orange mt-2 shrink-0"></div><span className="text-muted-foreground">Businesses required to pay tax under reverse charge</span></li>
              </ul>
              <p className="text-muted-foreground mt-6 text-sm italic">
                Even if your turnover is below the threshold, voluntary registration can be beneficial — it allows you to claim input tax credit and appear more credible to corporate clients.
              </p>
            </div>
            <div>
               <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800" alt="Small business owner reviewing documents" className="rounded-2xl shadow-lg border border-border" />
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-heading font-bold text-navy mb-6 text-center">How Our Online GST Registration Process Works</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { title: "Share Details", desc: "Fill out a simple form with basic info.", icon: FileText },
                { title: "Submit Docs", desc: "Upload docs. We contact you if corrections are needed.", icon: UploadCloud },
                { title: "Preparation", desc: "We prepare and validate your application.", icon: FileText },
                { title: "Verification", desc: "We submit and handle OTP/Biometric steps.", icon: ShieldCheck },
                { title: "Get GSTIN", desc: "Receive your certificate via email.", icon: CheckCircle },
              ].map((step, i) => (
                <div key={i} className="text-center p-4 border border-border rounded-xl bg-card">
                  <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue mx-auto mb-4">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-navy mb-2">Step {i+1}: {step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-brand-blue text-white p-8 md:p-12 rounded-3xl shadow-xl text-center">
            <h2 className="text-3xl font-heading font-bold mb-6">What Does the ₹499 Fee Cover?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
              There are no upsells, no hidden fees, and no mandatory add-ons. The government fee for GST registration is ₹0, so the total cost to you is exactly ₹499 — nothing more.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
              {[
                "Complete application preparation and filing",
                "Document review and verification",
                "Communication with the tax department",
                "Guidance on required corrections",
                "Delivery of your final GST registration certificate"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
             <h2 className="text-3xl font-heading font-bold text-navy mb-8 text-center">Frequently Asked Questions</h2>
             <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left font-semibold text-navy">How long does GST registration take?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Once your application is submitted with all valid documents, the tax authorities typically process it within 3–7 working days. Delays usually occur only when documents are incomplete or need clarification.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left font-semibold text-navy">Is there any government fee for GST registration?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    No. The GST registration fee charged by the government is ₹0. Our service fee of ₹499 is the only charge you pay.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left font-semibold text-navy">Can I register for GST if my turnover is below the threshold?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes. Voluntary registration is allowed and can be beneficial if you want to claim input tax credit or work with clients who prefer dealing with GST-registered vendors.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left font-semibold text-navy">What happens if my application is rejected?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    If your application is rejected, our team reviews the reason, helps you correct the issue, and re-files the application. The ₹499 fee is charged per successful submission.
                  </AccordionContent>
                </AccordionItem>
             </Accordion>
          </div>
        </div>
      </section>
      
      {/* Footer CTA */}
      <section className="bg-slate-50 py-16 border-t border-border">
        <div className="container mx-auto text-center max-w-2xl px-4">
           <h2 className="text-3xl font-heading font-bold text-navy mb-6">Get Started with GST Registration Online Today</h2>
           <p className="text-lg text-muted-foreground mb-8">Skip the confusion of the GST portal. Let us handle the paperwork while you focus on your business.</p>
           <Button size="lg" className="w-full sm:w-auto h-14 px-10 text-lg bg-primary hover:bg-cta-hover" asChild>
             <Link href="#apply">Start Your Registration for {SERVICE_PRICE}</Link>
           </Button>
        </div>
      </section>
    </div>
  );
}
