/**
 * Synthetica Research — Root Layout
 * Manrope + Inter fonts, providers, sidebar + top nav shell.
 */
import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import Sidebar from "@/components/layout/Sidebar";
import TopNavBar from "@/components/layout/TopNavBar";

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
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <QueryProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col" style={{ marginLeft: "16rem" }}>
              <TopNavBar />
              <main className="flex-1 pt-16 overflow-y-auto bg-[var(--surface)]">{children}</main>
            </div>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
