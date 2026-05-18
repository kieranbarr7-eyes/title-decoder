import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Title Decoder",
  description:
    "What does someone with this LinkedIn title actually do? Paste a title and company, get a real explanation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-900 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
