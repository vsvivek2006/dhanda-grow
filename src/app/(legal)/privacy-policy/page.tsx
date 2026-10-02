import type { Metadata } from "next";
import { BRAND_NAME, SUPPORT_EMAIL } from "@/lib/constants";
import { BreadcrumbSchema } from "@/components/seo/JsonLdSchemas";

export const metadata: Metadata = {
  title: `Privacy Policy | ${BRAND_NAME}`,
  description: `Privacy Policy for ${BRAND_NAME}. Learn how we protect your account and business data.`,
  alternates: {
    canonical: "https://dhandhagrow.com/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-20 bg-background">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Privacy Policy", url: "/privacy-policy" },
        ]}
      />
      <div className="container mx-auto max-w-3xl px-4 prose prose-slate dark:prose-invert">
        <h1 className="font-heading text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
        
        <p className="text-muted-foreground mb-8">Last Updated: January 15, 2025</p>

        <h2>1. Introduction</h2>
        <p>
          Welcome to {BRAND_NAME} (by Ezo Technologies). We respect your privacy and are committed to safeguarding your personal and business data.
        </p>

        <h2>2. Information We Collect</h2>
        <p>
          When you use our marketing platform and automation services, we may collect:
        </p>
        <ul>
          <li><strong>Account Data:</strong> Name, email address, phone number, and business name.</li>
          <li><strong>Connected Profiles:</strong> Authorization tokens to publish social media posts or view Google Business profile analytics (we never store unencrypted credentials).</li>
          <li><strong>Usage Data:</strong> Pages viewed, features used, and platform performance data.</li>
        </ul>

        <h2>3. How We Use Your Data</h2>
        <p>
          We use collected information solely to provide, operate, and enhance your {BRAND_NAME} marketing features (scheduling posts, analyzing reviews, generating marketing graphics). We NEVER sell your data to third parties.
        </p>

        <h2>4. Data Security</h2>
        <p>
          We employ industry-standard encryption, strict access controls, and secure APIs to ensure your business data and connected accounts remain protected at all times.
        </p>

        <h2>5. Contact Us</h2>
        <p>
          If you have questions regarding this privacy policy or your stored data, please contact us at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        </p>
      </div>
    </div>
  );
}
