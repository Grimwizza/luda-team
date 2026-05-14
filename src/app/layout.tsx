import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { InstallPrompt } from "@/components/InstallPrompt";
import React from "react";

const nunito = Nunito({
  subsets:  ["latin"],
  weight:   ["400", "600", "700", "800", "900"],
  variable: "--font-nunito-var",
  display:  "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://luda.team"),
  title:       "The Crayons | LUDA Ultimate Frisbee",
  description: "Lakeville Ultimate Disc Association — high school ultimate frisbee team.",
  keywords:    ["ultimate frisbee", "LUDA", "Lakeville", "high school", "The Crayons"],
  appleWebApp: {
    capable:        true,
    title:          "LUDA",
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunito.variable} data-theme="white">
      <body>
        <ThemeProvider>
          <NavBar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
          <InstallPrompt />
        </ThemeProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
