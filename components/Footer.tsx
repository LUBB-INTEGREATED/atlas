import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { AtlasLogo } from './AtlasLogo';
import { company, getObtainedCertificates } from '@/src/config/company';
import { nl } from '@/src/content/nl';

export function Footer() {
  const obtainedCerts = getObtainedCertificates();

  return (
    <footer
      id="site-footer"
      className="relative bg-[var(--blue-deep)] text-[var(--cream)] rounded-t-[40px] pt-20 sm:pt-28 pb-12 overflow-hidden mt-8"
    >
      <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6">
        {/* Top Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[var(--line-dark)]">
          {/* Col 1: Brand + Short intro + Socials */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" aria-label={company.name} className="inline-block">
              <AtlasLogo variant="onBlue" />
            </Link>
            <p className="text-[16px] leading-[1.7] text-[var(--cream)]/85 max-w-sm">
              Gecertificeerde verkeersregelaars, verkeersplannen en tijdelijke verkeersmaatregelen.
              Korte lijnen, duidelijke afspraken en betrokken op locatie.
            </p>
            {company.socials.length > 0 ? (
              <div className="flex items-center gap-3 pt-1">
                {company.socials.map((soc) => (
                  <a
                    key={soc.label}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line-dark)] px-4 py-2 text-xs font-medium text-[var(--cream)] hover:bg-[var(--cream)] hover:text-[var(--ink)] transition-colors"
                  >
                    <span>{soc.label}</span>
                    <ArrowUpRight strokeWidth={1.25} className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          {/* Col 2: Diensten */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--cream)]/70">
              Diensten
            </p>
            <ul className="space-y-2.5 text-[15px]">
              {nl.services.slice(0, 7).map((srv) => (
                <li key={srv.slug}>
                  <Link
                    href={`/diensten/${srv.slug}`}
                    className="text-[var(--cream)]/85 hover:text-[var(--porcelain)] transition-colors"
                  >
                    {srv.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/diensten"
                  className="inline-flex items-center gap-1 text-[var(--orange)] hover:underline font-medium pt-1"
                >
                  <span>Alle 11 diensten</span>
                  <ArrowUpRight strokeWidth={1.25} className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Atlas navigatie */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--cream)]/70">
              Atlas Holland
            </p>
            <ul className="space-y-2.5 text-[15px]">
              <li>
                <Link href="/" className="text-[var(--cream)]/85 hover:text-[var(--porcelain)]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/over-ons" className="text-[var(--cream)]/85 hover:text-[var(--porcelain)]">
                  Over ons
                </Link>
              </li>
              <li>
                <Link href="/opleidingen" className="text-[var(--cream)]/85 hover:text-[var(--porcelain)]">
                  Opleidingen
                </Link>
              </li>
              <li>
                <Link href="/werken-bij" className="text-[var(--cream)]/85 hover:text-[var(--porcelain)]">
                  Werken bij
                </Link>
              </li>
              <li>
                <Link href="/offerte-aanvragen" className="text-[var(--cream)]/85 hover:text-[var(--porcelain)]">
                  Offerte aanvragen
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[var(--cream)]/85 hover:text-[var(--porcelain)]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Bedrijfsgegevens */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--cream)]/70">
              Contact & 24/7 Planning
            </p>
            <div className="space-y-2.5 text-[15px] text-[var(--cream)]/90">
              <p>
                <a
                  href={company.phoneHref}
                  className="font-display text-xl text-[var(--porcelain)] hover:text-[var(--orange)] transition-colors tabular-nums"
                >
                  {company.phoneDisplay}
                </a>
              </p>
              <p>
                <a
                  href={company.emailHref}
                  className="hover:text-[var(--porcelain)] underline underline-offset-4"
                >
                  {company.email}
                </a>
              </p>
              <p className="pt-1 text-[var(--cream)]/80">
                {company.address.street}
                <br />
                {company.address.postalCode} {company.address.city}
              </p>
              <div className="pt-2 text-xs text-[var(--cream)]/65 space-y-1 tabular-nums">
                {company.kvk ? <p>KvK: {company.kvk}</p> : null}
                {company.btw ? <p>BTW: {company.btw}</p> : null}
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Row (Only obtained: true render) */}
        {obtainedCerts.length > 0 ? (
          <div className="py-8 border-b border-[var(--line-dark)] flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--cream)]/70">
              Kwaliteit & Certificering
            </span>
            <div className="flex flex-wrap items-center gap-2.5">
              {obtainedCerts.map((cert) => (
                <span
                  key={cert.code}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--cream)] px-4 py-1.5 text-xs font-medium text-[var(--blue)]"
                >
                  <strong className="font-semibold text-[var(--ink)]">{cert.code}</strong>
                  <span>·</span>
                  <span>{cert.name}</span>
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {/* Legal Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[var(--cream)]/70">
          <p>© 2026 {company.name} Alle rechten voorbehouden.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy" className="hover:text-[var(--porcelain)] transition-colors">
              Privacyverklaring
            </Link>
            <Link
              href="/algemene-voorwaarden"
              className="hover:text-[var(--porcelain)] transition-colors"
            >
              Algemene voorwaarden
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
