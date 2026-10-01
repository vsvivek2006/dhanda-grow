import Link from "next/link";
import { ShieldCheck, Clock, MessageCircle, FileCheck, CheckCircle2, Star, BadgeCheck, FileText, ArrowRight } from "lucide-react";
import { SERVICE_PRICE, WHATSAPP_LINK, SUPPORT_PHONE } from "@/lib/constants";
import { LeadForm } from "@/components/shared/LeadForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Announcement Bar */}
      <div className="bg-success-green text-white text-sm font-medium py-2 px-4 text-center">
        GST Registration at just {SERVICE_PRICE} — Zero government fee.{" "}
        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="underline hover:text-white/80">
          Chat on WhatsApp
        </a>
      </div>

      {/* 3. Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50/50 to-white py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-sm font-semibold">
              <BadgeCheck className="w-4 h-4" />
              <span>Trusted by [TODO: 5000]+ businesses</span>
            </div>
            
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-navy leading-tight">
              GST Registration Online at a Flat {SERVICE_PRICE} Service Fee
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              The government fee for GST registration is ₹0. You pay a single, flat service fee of {SERVICE_PRICE} — and nothing else. We handle the entire process end-to-end, so getting your GST number online is simple and stress-free.
            </p>

            <ul className="space-y-3">
              {[
                "Zero government fee",
                "Expert document check before submission",
                "Application filed in 24–48 hrs after documents [TODO: confirm]",
                "Full support until your GSTIN is issued"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-foreground font-medium">
                  <CheckCircle2 className="w-6 h-6 text-success-green shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-primary hover:bg-cta-hover text-lg h-14 px-8" asChild>
                <Link href="#apply">Apply Now – {SERVICE_PRICE}</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-success-green text-success-green hover:bg-success-green/10 text-lg h-14 px-8" asChild>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
            
            {/* Trust Chips under buttons */}
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground pt-4">
              <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-brand-blue"/> Secure</span>
              <span className="flex items-center gap-1"><FileCheck className="w-4 h-4 text-brand-blue"/> Expert-handled</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-brand-blue"/> Fast Process</span>
            </div>
          </div>

          {/* Right Side: Lead Form */}
          <div id="apply" className="relative lg:px-8">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* 4. Trust/Stat Strip */}
      <section className="border-y border-border bg-card py-10">
        <div className="container mx-auto max-w-7xl px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-border">
          <div>
            <div className="text-3xl font-heading font-bold text-navy">[TODO: 10,000+]</div>
            <div className="text-sm text-muted-foreground mt-1">GST Registrations Done</div>
          </div>
          <div>
            <div className="text-3xl font-heading font-bold text-navy">28+</div>
            <div className="text-sm text-muted-foreground mt-1">States Served</div>
          </div>
          <div>
            <div className="text-3xl font-heading font-bold text-navy">[TODO: 3-7] Days</div>
            <div className="text-sm text-muted-foreground mt-1">Average Turnaround</div>
          </div>
          <div>
            <div className="text-3xl font-heading font-bold text-navy">9 AM - 7 PM</div>
            <div className="text-sm text-muted-foreground mt-1">Support Hours</div>
          </div>
        </div>
      </section>

      {/* 5. Why GST registration? */}
      <section className="py-20 bg-background">
        <div className="container mx-auto max-w-4xl px-4 text-center space-y-6">
          <h2 className="font-heading text-3xl font-bold text-navy">Who needs GST Registration?</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            In most Indian states, businesses must register for GST if their annual turnover exceeds <strong>₹40 lakh for goods</strong> or <strong>₹20 lakh for services</strong> (thresholds may be lower for special-category states). <br className="hidden md:block"/> However, registration is <strong>mandatory from day one</strong> if you are an inter-state seller, an e-commerce seller (Amazon, Flipkart, Meesho), or required to pay tax under the reverse charge mechanism.
          </p>
          <p className="text-sm text-muted-foreground italic">[TODO: verify thresholds against current rules before publishing]</p>
        </div>
      </section>

      {/* 6. How it works */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy mb-4">How to Get Your GST Number in Simple Steps</h2>
            <p className="text-lg text-muted-foreground">Getting GST registered online doesn't have to be complicated. Here's exactly how we handle it for you.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "Share Your Details", desc: "Send your business information and required documents through our quick form or directly on WhatsApp.", icon: FileText },
              { title: "We Verify", desc: "Our team reviews your documents to ensure everything is correct before we begin.", icon: ShieldCheck },
              { title: "We File Application", desc: "We prepare and submit your GST registration application on the GST portal and share the ARN.", icon: FileCheck },
              { title: "Get Your GSTIN", desc: "Once the application is approved, your GSTIN is issued. We guide you on the next steps.", icon: CheckCircle2 },
            ].map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center p-6 bg-card rounded-2xl shadow-sm border border-border">
                <div className="w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-6 border-4 border-white shadow-sm z-10">
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-xl font-bold text-navy mb-3">Step {idx + 1}: {step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
                {/* Horizontal line for desktop */}
                {idx < 3 && <div className="hidden md:block absolute top-14 left-1/2 w-full h-0.5 bg-brand-blue/20 -z-0"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Pricing */}
      <section className="py-20 bg-background">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="max-w-md mx-auto">
            <Card className="border-2 border-primary/20 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
              <CardContent className="p-8 text-center">
                <h2 className="font-heading text-2xl font-bold text-navy mb-2">GST Registration Fees</h2>
                <div className="my-6">
                  <span className="text-5xl font-heading font-extrabold text-navy">{SERVICE_PRICE}</span>
                </div>
                <div className="bg-success-green/10 text-success-green font-semibold py-2 px-4 rounded-full inline-block mb-8">
                  Government fee ₹0
                </div>
                
                <ul className="space-y-4 text-left mb-8">
                  {[
                    "Document verification",
                    "Application preparation & filing",
                    "ARN Generation & Tracking",
                    "Reply to basic department queries",
                    "WhatsApp support throughout"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-success-green shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-3 opacity-60">
                    <XIcon className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <span className="text-foreground">[TODO: Honest exclusions, e.g. physical verification handling]</span>
                  </li>
                </ul>

                <p className="text-sm font-semibold text-muted-foreground mb-6">No hidden charges.</p>
                <Button size="lg" className="w-full bg-primary hover:bg-cta-hover h-14 text-lg" asChild>
                  <Link href="#apply">Get Started Now</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 8. Documents required */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy mb-4">Documents Required for GST Registration</h2>
            <p className="text-lg text-muted-foreground">Select your business type to see the exact document checklist.</p>
          </div>

          <Tabs defaultValue="proprietorship" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
              <TabsTrigger value="proprietorship" className="py-3">Proprietorship</TabsTrigger>
              <TabsTrigger value="partnership" className="py-3">Partnership</TabsTrigger>
              <TabsTrigger value="llp" className="py-3">LLP</TabsTrigger>
              <TabsTrigger value="company" className="py-3">Company</TabsTrigger>
            </TabsList>
            
            <TabsContent value="proprietorship" className="bg-card p-6 rounded-b-xl border border-border mt-0">
              <ul className="space-y-3">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-brand-blue"/> PAN Card of proprietor</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-brand-blue"/> Aadhaar Card of proprietor</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-brand-blue"/> Passport-size photo</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-brand-blue"/> Business address proof (Electricity bill / Rent agreement + Owner's NOC)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-brand-blue"/> Bank proof (Cancelled cheque or Passbook first page)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-brand-blue"/> Mobile number and Email (for OTP)</li>
              </ul>
            </TabsContent>
            
            <TabsContent value="partnership" className="bg-card p-6 rounded-b-xl border border-border mt-0">
              <ul className="space-y-3">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-brand-blue"/> PAN Card of Partnership Firm</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-brand-blue"/> Partnership Deed</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-brand-blue"/> PAN, Aadhaar & Photos of all partners</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-brand-blue"/> Letter of Authorization for primary signatory</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-brand-blue"/> Business address proof</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-brand-blue"/> Bank proof of firm</li>
              </ul>
            </TabsContent>
            
            {/* TODO: Fill LLP and Company content */}
            <TabsContent value="llp" className="bg-card p-6 rounded-b-xl border border-border mt-0"><p>LLP documents [TODO]</p></TabsContent>
            <TabsContent value="company" className="bg-card p-6 rounded-b-xl border border-border mt-0"><p>Company documents [TODO]</p></TabsContent>
          </Tabs>

          <div className="text-center mt-8">
            <Link href="/gst-registration-documents-required" className="text-brand-blue font-semibold hover:underline inline-flex items-center">
              View full detailed checklist <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Why choose us */}
      <section className="py-20 bg-background">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy mb-12 text-center">Why Business Owners Choose Us</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Expert review", desc: "We catch errors before the government does." },
              { title: "Transparent pricing", desc: `Flat ${SERVICE_PRICE} fee. Zero government fee. No surprises.` },
              { title: "Fast processing", desc: "We keep your application moving at every stage without delays." },
              { title: "WhatsApp support", desc: "Real human help right in your favorite chat app." },
              { title: "Secure handling", desc: "Your sensitive KYC documents are kept strictly confidential." },
              { title: "After-registration guidance", desc: "We guide you on invoicing and returns after you get your GSTIN." },
            ].map((feature, i) => (
              <Card key={i} className="border-border/60 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-4">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-navy mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 12. FAQ Accordion */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy mb-10 text-center">Frequently Asked Questions</h2>
          <Accordion className="w-full bg-card rounded-2xl border border-border px-6">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left font-semibold text-navy">What is the government fee for GST registration online?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                The government fee for GST registration is ₹0. Your only cost is our service fee of {SERVICE_PRICE}, which covers the complete handling of your application.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left font-semibold text-navy">What does the {SERVICE_PRICE} service fee include?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                The fee covers end-to-end handling of your GST registration — document review, preparation and filing of your application, status follow-up, and WhatsApp support. There are no hidden charges.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left font-semibold text-navy">How long does GST registration take?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                After we submit your application, processing time depends on departmental verification on the GST portal. We do our part by ensuring your application is complete and correctly filed from the start, so your registration moves forward without avoidable delays. (Usually takes [TODO: 3-7] working days).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left font-semibold text-navy">Can I register without a shop/office?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes, you can register GST at your residential address if you operate your business or freelance work from home. You will need to provide residential address proof (like an electricity bill) and an NOC from the owner if the property is not in your name.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* 13. Final CTA Band */}
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="container mx-auto max-w-4xl px-4 text-center relative z-10">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to get your GSTIN?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Start today for just {SERVICE_PRICE}. Free document check included.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-cta-hover text-lg h-14 px-8" asChild>
              <Link href="#apply">Apply Now – {SERVICE_PRICE}</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy text-lg h-14 px-8" asChild>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                Ask a Question
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

// Dummy icon to avoid full lucide import for a simple X
function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
