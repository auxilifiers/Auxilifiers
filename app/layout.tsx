import type { Metadata } from "next";
import { Unbounded, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Aurora from "@/components/global/Aurora";
import CustomCursor from "@/components/global/CustomCursor";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";

const unbounded = Unbounded({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Auxilifiers — Orbiting Around Your Success",
  description:
    "We build the tech, automate the operations, and grow the reach — for businesses ready to scale beyond what their team alone can carry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${unbounded.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Aurora />
        <CustomCursor />
        <Header />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
