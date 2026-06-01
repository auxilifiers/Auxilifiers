import type { Metadata } from "next";
import Script from "next/script";
import { Unbounded, DM_Sans, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Aurora from "@/components/global/Aurora";
import CustomCursor from "@/components/global/CustomCursor";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import { getSiteSettings } from "@/lib/settings";

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

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  return {
    metadataBase: new URL(SITE),
    title: { default: s.metaTitle, template: s.metaTitleTemplate },
    description: s.metaDescription,
    keywords: s.keywords,
    authors: [{ name: "Auxilifiers" }],
    creator: "Auxilifiers",
    publisher: "Auxilifiers",
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: "Auxilifiers",
      title: s.metaTitle,
      description:
        "Build the tech, automate the operations, and grow the reach. One team, three pillars.",
      url: SITE,
    },
    twitter: {
      card: "summary_large_image",
      title: s.metaTitle,
      description:
        "Tech and growth agency for SMBs. Web, AI, automation, SEO, ads — all under one roof.",
    },
    icons: { icon: "/icon.png", apple: "/apple-icon.png" },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const s = await getSiteSettings();

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
        email: s.contactEmail,
        slogan: "Orbiting around your success.",
        sameAs: [s.instagram, s.facebook, s.linkedin, s.youtube].filter(Boolean),
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
        <Footer settings={s} />

        {/* Google Analytics (GA4) — only when a measurement ID is configured */}
        {s.gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${s.gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${s.gaId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
