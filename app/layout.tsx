import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Title Decoder",
  description:
    "A working encyclopedia for modern job titles. Paste a title and company, get a real explanation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-paper font-serif text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
