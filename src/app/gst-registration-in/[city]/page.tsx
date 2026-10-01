import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICE_PRICE } from "@/lib/constants";
import { LeadForm } from "@/components/shared/LeadForm";
import { CheckCircle2 } from "lucide-react";

// In a real app, this might come from a DB or be pre-generated.
const VALID_CITIES = ["mumbai", "delhi", "bangalore", "hyderabad", "chennai", "kolkata", "pune", "ahmedabad", "jaipur", "surat"];

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const city = resolvedParams.city.replace(/-/g, " ");
  const CityName = city.charAt(0).toUpperCase() + city.slice(1);

  return {
    title: `GST Registration in ${CityName} | Flat ₹499 Fee | GetGSTFast`,
    description: `Looking for GST registration in ${CityName}? Get your GSTIN quickly with our expert online service. Zero government fees, just our flat ₹499 service fee.`,
  };
}

export default async function CityGstRegistrationPage({ params }: { params: Promise<{ city: string }> }) {
  const resolvedParams = await params;
  const cityRaw = resolvedParams.city.toLowerCase();
  
  // Basic validation (optional: remove if you want it to work for any slug)
  if (!VALID_CITIES.includes(cityRaw)) {
    // notFound(); // Uncomment to restrict to specific cities
  }

  const city = cityRaw.replace(/-/g, " ");
  const CityName = city.charAt(0).toUpperCase() + city.slice(1);

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50/50 to-white py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block bg-brand-blue/10 text-brand-blue font-semibold px-3 py-1 rounded-full text-sm">
              Local Online Service for {CityName}
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-navy">
              GST Registration in {CityName}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Starting a business in {CityName}? Get your GST registration online quickly and securely. Skip the local CA visits—we handle the entire process end-to-end for a flat fee of {SERVICE_PRICE}.
            </p>
            
            <ul className="space-y-3 mt-6">
              {[
                "Zero government fee",
                `100% online process for ${CityName} businesses`,
                "Application filed accurately on GST Portal",
                "Dedicated WhatsApp support"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-success-green shrink-0" />
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

      {/* Trust Content */}
      <section className="py-20 bg-slate-50 border-y border-border">
        <div className="container mx-auto max-w-4xl px-4 text-center space-y-6">
          <h2 className="text-3xl font-heading font-bold text-navy">Why Choose Us for GST Registration in {CityName}?</h2>
          <p className="text-lg text-muted-foreground">
            Whether you're running a shop in the local markets of {CityName} or operating an online business from home, our expert team ensures your application is filed without errors. You don't need to visit any government office; just upload your documents and we'll take care of the rest.
          </p>
        </div>
      </section>
    </div>
  );
}
