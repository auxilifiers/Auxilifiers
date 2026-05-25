import type { Metadata } from "next";
import { Unbounded, DM_Sans, JetBrains_Mono, Instrument_Serif } from "next/font/google";
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

const instrumentSerif = Instrument_Serif({
  variable: "--font-italic",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://auxilifiers.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Auxilifiers — Orbiting around your success.",
    template: "%s | Auxilifiers",
  },
  description:
    "Auxilifiers is a tech and growth agency for ambitious small and mid-size businesses. We build the tech, automate the operations, and grow the reach — websites, AI automation, SEO, and ads, all under one roof.",
  keywords: [
    "tech agency Pakistan",
    "web development",
    "AI automation",
    "n8n",
    "chatbots",
    "voice AI agents",
    "SEO agency",
    "Google Ads",
    "Meta Ads",
    "Shopify development",
    "mobile app development",
  ],
  authors: [{ name: "Auxilifiers" }],
  creator: "Auxilifiers",
  publisher: "Auxilifiers",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Auxilifiers",
    title: "Auxilifiers — Orbiting around your success.",
    description:
      "Build the tech, automate the operations, and grow the reach. One team, three pillars.",
    url: SITE,
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Auxilifiers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Auxilifiers — Orbiting around your success.",
    description:
      "Tech and growth agency for SMBs. Web, AI, automation, SEO, ads — all under one roof.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}#organization`,
      name: "Auxilifiers",
      url: SITE,
      logo: `${SITE}/logo.png`,
      description:
        "Tech and growth agency that builds the tech, automates the operations, and grows the reach for small and mid-size businesses.",
      email: "info@auxilifiers.com",
      slogan: "Orbiting around your success.",
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}#website`,
      url: SITE,
      name: "Auxilifiers",
      publisher: { "@id": `${SITE}#organization` },
      inLanguage: "en",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE}#service`,
      name: "Auxilifiers",
      url: SITE,
      areaServed: ["Pakistan", "United Kingdom", "United Arab Emirates", "United States"],
      serviceType: [
        "Web Development",
        "Mobile App Development",
        "Shopify Development",
        "AI Automation",
        "Chatbot Development",
        "Voice Agents",
        "CRM Integration",
        "SEO",
        "Google Ads",
        "Meta Ads",
        "Social Media Management",
        "Content Marketing",
        "Video Editing",
        "Graphic Design",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${unbounded.variable} ${dmSans.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('aux-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
