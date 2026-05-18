import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Title Decoder",
  description: "A working dictionary for modern job titles.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white font-sans text-ink-body antialiased">
        {children}
      </body>
    </html>
  );
}
