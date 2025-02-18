import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  title: "LyamApps - Agence de développement d\'applications & sites web sur mesure | Braqueo.fr",
  description: "Développement d\'applications mobiles iOS/Android et sites web sur mesure. Top 100 App Store, +1200 utilisateurs, CRM personnalisé. Expertise Next.js, React Native, Shopify.",
  keywords: "développement application mobile, développement web, iOS, Android, React Native, Next.js, Shopify, CRM sur mesure",
  openGraph: {
    title: "Agence de développement d'applications & sites web sur mesure | LyamApps",
    description: "Développement d'applications mobiles iOS/Android et sites web sur mesure. Top 100 App Store, +1200 utilisateurs. Développement de sites web personnalisés.",
    url: "https://braqueo.fr",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agence de développement d'applications & sites web sur mesure | Braqueo.fr",
    description: "Développement d'applications mobiles iOS/Android et sites web sur mesure. Top 100 App Store, +1200 utilisateurs, CRM personnalisé.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <Script id="schema-org" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "LyamApps",
            "url": "https://lyamapps.com",
            "alternateName": "Braqueo",
            "sameAs": ["https://braqueo.fr"],
            "description": "Agence de développement d'applications mobiles et sites web sur mesure",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "FR"
            }
          }
        `}
      </Script>
      <body className={inter.className}>{children}</body>
    </html>
  );
}