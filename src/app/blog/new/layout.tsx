import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin AI Blog Generator | Dhanda Grow",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function BlogNewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
