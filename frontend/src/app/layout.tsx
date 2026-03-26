/**
 * Synthetica Research — Root Layout
 * Sets up fonts (Manrope + Inter), providers, and sidebar navigation.
 */
import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import Sidebar from "@/components/layout/Sidebar";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Synthetica Research",
  description:
    "An intelligent deep research assistant powered by specialized AI agents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <QueryProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 overflow-hidden">{children}</main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
