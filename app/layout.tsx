import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import "./globals.css";
import {Navbar} from '@/app/components/navbar'

const albsns = Albert_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InvManager",
  description: "Simple Inventory management system built using nextJS and firebase.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${albsns.variable} ${albsns.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
