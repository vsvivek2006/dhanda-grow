import type { Metadata } from "next";
import { BRAND_NAME, SUPPORT_EMAIL } from "@/lib/constants";
import { BreadcrumbSchema } from "@/components/seo/JsonLdSchemas";

export const metadata: Metadata = {
  title: `Terms and Conditions | ${BRAND_NAME}`,
  description: `Terms and Conditions for ${BRAND_NAME} AI Marketing Platform.`,
  alternates: {
    canonical: "https://dhandhagrow.com/terms-and-conditions",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <div className="py-20 bg-background">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Terms & Conditions", url: "/terms-and-conditions" },
        ]}
      />
      <div className="container mx-auto max-w-3xl px-4 prose prose-slate dark:prose-invert">
        <h1 className="font-heading text-4xl font-bold text-foreground mb-8">Terms and Conditions</h1>
        
        <p className="text-muted-foreground mb-8">Last Updated: January 15, 2025</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing, signing up for, or using {BRAND_NAME} ("Service", "we", "us", or "our"), operated by Ezo Technologies, you agree to be bound by these terms.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          {BRAND_NAME} is an AI-powered local business marketing automation platform. We provide tools for Google Business Profile management, local SEO analysis, automated social media content creation, and customer review management.
        </p>

        <h2>3. User Responsibilities & Account Security</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and complete business information for connected social profiles and Google Business accounts.
        </p>

        <h2>4. Intellectual Property & AI Generation</h2>
        <p>
          You retain ownership of your business brand, trademarks, and uploaded images. Content generated via our AI tools for your social posts is licensed to you for promotional use in accordance with third-party platform policies.
        </p>

        <h2>5. Limitation of Liability</h2>
        <p>
          {BRAND_NAME} provides automation tools to assist your marketing efforts. We do not guarantee specific ranking positions on search engines or third-party platforms, as search algorithms and platform policies operate independently.
        </p>

        <h2>6. Contact Information</h2>
        <p>
          For any questions regarding these terms, please contact us at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        </p>
      </div>
    </div>
  );
}
