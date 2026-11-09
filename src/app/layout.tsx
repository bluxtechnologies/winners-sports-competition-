import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | SDU Ozoro`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Winners Sports Competition",
    "Southern Delta University",
    "Ozoro",
    "Winners Football Competition",
    "Monkey Post",
    "5-a-side Football",
    "Winners Marathon Challenge",
    "Campus Sports",
  ],
  authors: [{ name: "WSC Organizing Committee" }],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
    locale: "en_NG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans min-h-screen bg-background text-foreground antialiased selection:bg-brand-gold selection:text-black">
        {children}
      </body>
    </html>
  );
}
