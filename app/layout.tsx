import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kira Finance Command",
  description:
    "An AI-powered finance command center for business cash flow, personal wealth, integrations, and proactive insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
