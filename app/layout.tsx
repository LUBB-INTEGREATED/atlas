import type { Metadata } from 'next';
import { Fraunces, Figtree } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider';
import { company } from '@/src/config/company';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
});

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-figtree',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Atlas Holland B.V. — Verkeer in goede banen | Verkeersregelaars & Advies',
    template: '%s | Atlas Holland B.V.',
  },
  description:
    'Gecertificeerde verkeersregelaars, tijdelijke verkeersmaatregelen, verkeersplannen en veiligheidsbegeleiding voor infra, bouw, evenementen en calamiteiten in heel Nederland.',
  openGraph: {
    title: 'Atlas Holland B.V. — Verkeer in goede banen',
    description:
      'Gecertificeerde verkeersregelaars en complete verkeersoplossingen voor infra, bouw, evenementen en calamiteiten. Landelijk inzetbaar, 24/7 bereikbaar.',
    type: 'website',
    locale: 'nl_NL',
    siteName: company.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atlas Holland B.V. — Verkeer in goede banen',
    description:
      'Gecertificeerde verkeersregelaars en complete verkeersoplossingen voor infra, bouw, evenementen en calamiteiten. Landelijk inzetbaar, 24/7 bereikbaar.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: company.name,
    description:
      'Gecertificeerde verkeersregelaars, tijdelijke verkeersmaatregelen, verkeersplannen en veiligheidsbegeleiding voor infra, bouw, evenementen en calamiteiten in Nederland.',
    telephone: '+31852084710',
    email: company.email,
    foundingDate: String(company.foundingYear),
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      postalCode: company.address.postalCode,
      addressLocality: company.address.city,
      addressCountry: 'NL',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Netherlands',
    },
  };

  return (
    <html lang="nl" className={`${fraunces.variable} ${figtree.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-screen flex flex-col bg-[var(--cream-light)] text-[var(--ink)]">
        <SmoothScrollProvider>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
