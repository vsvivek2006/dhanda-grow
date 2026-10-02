import type { Metadata } from "next";
import { BRAND_NAME, SUPPORT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Refund Policy | ${BRAND_NAME}`,
  description: `Refund Policy for ${BRAND_NAME}.`,
};

export default function RefundPolicyPage() {
  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto max-w-3xl px-4 prose prose-slate dark:prose-invert">
        <h1 className="font-heading text-4xl font-bold text-foreground mb-8">Refund Policy</h1>
        
        <p className="text-muted-foreground mb-8">Last Updated: {new Date().toLocaleDateString('en-IN')}</p>

        <h3>1. Free Trial & Subscriptions</h3>
        <p>
          {BRAND_NAME} offers free demo access and trial capabilities to allow local businesses to evaluate our marketing automation features before committing to paid tiers.
        </p>

        <h3>2. Subscription Cancellations</h3>
        <p>
          You may cancel your monthly or annual subscription at any time via your account dashboard or by contacting our support team. Upon cancellation, your access remains active until the end of your current billing period.
        </p>

        <h3>3. Refund Requests</h3>
        <p>
          If you encounter technical issues that prevent you from utilizing our software, and our support team is unable to resolve them within 7 business days, you may request a pro-rated refund for the affected billing period.
        </p>

        <h3>4. Processing Time</h3>
        <p>
          Approved refunds will be processed back to your original payment method within 5-7 business days.
        </p>

        <h3>5. How to Contact Support</h3>
        <p>
          To discuss billing or request assistance, please email us at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        </p>
      </div>
    </div>
  );
}
