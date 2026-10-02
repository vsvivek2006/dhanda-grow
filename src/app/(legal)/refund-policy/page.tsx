import type { Metadata } from "next";
import { BRAND_NAME, SUPPORT_EMAIL } from "@/lib/constants";
import { BreadcrumbSchema } from "@/components/seo/JsonLdSchemas";

export const metadata: Metadata = {
  title: `Refund Policy | ${BRAND_NAME}`,
  description: `Refund Policy for ${BRAND_NAME}. Clear details on our trial terms, cancellation procedures, and refund processing.`,
  alternates: {
    canonical: "https://dhandhagrow.com/refund-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RefundPolicyPage() {
  return (
    <div className="py-20 bg-background">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Refund Policy", url: "/refund-policy" },
        ]}
      />
      <div className="container mx-auto max-w-3xl px-4 prose prose-slate dark:prose-invert">
        <h1 className="font-heading text-4xl font-bold text-foreground mb-8">Refund Policy</h1>
        
        <p className="text-muted-foreground mb-8">Last Updated: January 15, 2025</p>

        <h2>1. Free Trial & Subscriptions</h2>
        <p>
          {BRAND_NAME} offers free demo access and trial capabilities to allow local businesses to evaluate our marketing automation features before committing to paid tiers.
        </p>

        <h2>2. Subscription Cancellations</h2>
        <p>
          You may cancel your monthly or annual subscription at any time via your account dashboard or by contacting our support team. Upon cancellation, your access remains active until the end of your current billing period.
        </p>

        <h2>3. Refund Requests</h2>
        <p>
          If you encounter technical issues that prevent you from utilizing our software, and our support team is unable to resolve them within 7 business days, you may request a pro-rated refund for the affected billing period.
        </p>

        <h2>4. Processing Time</h2>
        <p>
          Approved refunds will be processed back to your original payment method within 5-7 business days.
        </p>

        <h2>5. How to Contact Support</h2>
        <p>
          To discuss billing or request assistance, please email us at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        </p>
      </div>
    </div>
  );
}
