'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowUpRight, Check, Mail, MapPin, Phone } from 'lucide-react';
import { CALM_EASE, CalmButton, SectionLabel } from './FlowElements';
import { company } from '@/src/config/company';

export function ContactClient() {
  const [naam, setNaam] = useState('');
  const [email, setEmail] = useState('');
  const [telefoon, setTelefoon] = useState('');
  const [bedrijf, setBedrijf] = useState('');
  const [bericht, setBericht] = useState('');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!naam.trim() || !email.trim() || !bericht.trim()) {
      setErrorMsg('Vul alstublieft uw naam, e-mailadres en bericht in.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg('Controleer alstublieft het ingevulde e-mailadres.');
      return;
    }

    const payload = {
      type: 'contact_bericht',
      naam: naam.trim(),
      email: email.trim(),
      telefoon: telefoon.trim() || undefined,
      bedrijf: bedrijf.trim() || undefined,
      bericht: bericht.trim(),
      submittedAt: new Date().toISOString(),
    };

    // Structured handler ready for future API endpoint
    console.info('[Atlas Contact Bericht]', payload);
    setSubmitted(true);
  };

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 pb-24 space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left 7 Columns: Validated Contact Form */}
        <div className="lg:col-span-7">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: CALM_EASE }}
              className="rounded-[28px] bg-[var(--porcelain)] border border-[var(--sand)] p-8 sm:p-14 text-center space-y-5 shadow-calm"
            >
              <div className="w-16 h-16 rounded-full bg-[var(--orange)] text-[var(--ink)] mx-auto flex items-center justify-center">
                <Check strokeWidth={1.75} className="w-8 h-8" />
              </div>
              <h2 className="font-display text-3xl text-[var(--blue)]">
                Bedankt voor uw bericht, {naam}.
              </h2>
              <p className="text-[16px] leading-[1.7] text-[var(--ink)]/85 max-w-md mx-auto">
                Wij hebben uw bericht ontvangen en reageren binnen één werkdag (bij planningsvragen
                doorgaans dezelfde dag).
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setNaam('');
                  setEmail('');
                  setTelefoon('');
                  setBedrijf('');
                  setBericht('');
                }}
                className="text-sm font-medium text-[var(--blue)] underline underline-offset-4"
              >
                Nieuw bericht versturen
              </button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-[28px] bg-[var(--porcelain)] border border-[var(--line)] p-6 sm:p-10 lg:p-12 space-y-6 shadow-calm"
            >
              <div>
                <SectionLabel>STUUR EEN BERICHT</SectionLabel>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl text-[var(--blue)]">
                  Hoe kunnen wij u helpen?
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-naam" className="block text-sm font-medium text-[var(--ink)] mb-2">
                    Naam *
                  </label>
                  <input
                    id="contact-naam"
                    type="text"
                    required
                    value={naam}
                    onChange={(e) => setNaam(e.target.value)}
                    placeholder="Uw naam"
                    className="w-full h-14 px-6 rounded-full bg-[var(--porcelain)] border border-[var(--sand)] text-[var(--ink)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-[var(--ink)] mb-2">
                    E-mailadres *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="naam@organisatie.nl"
                    className="w-full h-14 px-6 rounded-full bg-[var(--porcelain)] border border-[var(--sand)] text-[var(--ink)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-telefoon" className="block text-sm font-medium text-[var(--ink)] mb-2">
                    Telefoonnummer
                  </label>
                  <input
                    id="contact-telefoon"
                    type="tel"
                    value={telefoon}
                    onChange={(e) => setTelefoon(e.target.value)}
                    placeholder="06 / 085 nummer"
                    className="w-full h-14 px-6 rounded-full bg-[var(--porcelain)] border border-[var(--sand)] text-[var(--ink)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
                  />
                </div>

                <div>
                  <label htmlFor="contact-bedrijf" className="block text-sm font-medium text-[var(--ink)] mb-2">
                    Bedrijf of gemeente
                  </label>
                  <input
                    id="contact-bedrijf"
                    type="text"
                    value={bedrijf}
                    onChange={(e) => setBedrijf(e.target.value)}
                    placeholder="Optioneel"
                    className="w-full h-14 px-6 rounded-full bg-[var(--porcelain)] border border-[var(--sand)] text-[var(--ink)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-bericht" className="block text-sm font-medium text-[var(--ink)] mb-2">
                  Uw vraag of bericht *
                </label>
                <textarea
                  id="contact-bericht"
                  rows={5}
                  required
                  value={bericht}
                  onChange={(e) => setBericht(e.target.value)}
                  placeholder="Vertel ons waar wij u mee kunnen helpen..."
                  className="w-full p-5 rounded-[20px] bg-[var(--porcelain)] border border-[var(--sand)] text-[var(--ink)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
                />
              </div>

              {errorMsg ? (
                <p role="alert" className="text-sm font-medium text-[var(--orange-ink)]">
                  {errorMsg}
                </p>
              ) : null}

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <CalmButton type="submit" variant="primary">
                  Bericht versturen
                </CalmButton>
                <p className="text-xs text-[var(--ink)]/70">
                  Door te versturen gaat u akkoord met onze{' '}
                  <Link href="/privacy" className="underline text-[var(--blue)]">
                    privacyverklaring
                  </Link>
                  .
                </p>
              </div>
            </form>
          )}
        </div>

        {/* Right 5 Columns: Rounded --blue Panel with Details in Large Fraunces */}
        <div className="lg:col-span-5">
          <div className="rounded-[28px] bg-[var(--blue)] text-[var(--cream)] p-8 sm:p-11 shadow-calm-lg space-y-8">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--cream)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--ok)]" aria-hidden="true" />
              <span>Planning bereikbaar · 24/7</span>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--cream)]/70">
                Algemeen & 24/7 Planning
              </p>
              <a
                href={company.phoneHref}
                className="inline-flex items-center gap-3 font-display text-[clamp(2rem,3.6vw,3rem)] font-light text-[var(--porcelain)] hover:text-[var(--orange)] transition-colors tabular-nums"
              >
                <Phone strokeWidth={1.25} className="w-6 h-6 text-[var(--orange)] shrink-0" />
                <span>{company.phoneDisplay}</span>
              </a>
            </div>

            <div className="space-y-2 pt-6 border-t border-[var(--line-dark)]">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--cream)]/70">
                E-mail planning & offertes
              </p>
              <a
                href={company.emailHref}
                className="inline-flex items-center gap-2.5 font-display text-xl sm:text-2xl text-[var(--porcelain)] hover:text-[var(--orange)] transition-colors break-all"
              >
                <Mail strokeWidth={1.25} className="w-5 h-5 text-[var(--orange)] shrink-0" />
                <span>{company.email}</span>
              </a>
            </div>

            <div className="space-y-3 pt-6 border-t border-[var(--line-dark)]">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--cream)]/70">
                Bezoekadres (Centraal kantoor)
              </p>
              <div className="flex items-start gap-3">
                <MapPin strokeWidth={1.25} className="w-5 h-5 text-[var(--orange)] shrink-0 mt-1" />
                <div className="font-display text-xl text-[var(--porcelain)] leading-snug">
                  <p>{company.name}</p>
                  <p>{company.address.street}</p>
                  <p>
                    {company.address.postalCode} {company.address.city}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={company.address.routeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--cream)] px-5 py-2.5 text-xs font-semibold text-[var(--ink)] hover:bg-[var(--orange)] transition-colors"
                >
                  <span>Route plannen in Google Maps</span>
                  <ArrowUpRight strokeWidth={1.25} className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--line-dark)] flex flex-wrap gap-6 text-xs text-[var(--cream)]/75 tabular-nums">
              <span>KvK: {company.kvk}</span>
              <span>BTW: {company.btw}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Softly Styled Architectural Map Below (Tinted to the Calm Flow Palette) */}
      <div className="rounded-[40px] bg-[var(--cream)] border border-[var(--line)] p-4 sm:p-6 shadow-calm">
        <div className="relative h-[340px] sm:h-[420px] w-full rounded-[28px] overflow-hidden bg-[#E6D7C7] border border-[var(--line)]">
          {/* Custom SVG Cartographic Canvas of Utrecht / Archimedesweg tinted in --cream, --sand, --blue and --orange */}
          <svg
            viewBox="0 0 1200 450"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
            className="w-full h-full"
            role="img"
            aria-label={`Kaartweergave van ${company.address.street}, ${company.address.city}`}
          >
            <rect width="1200" height="450" fill="#EFE4D8" />
            {/* Amsterdam-Rijnkanaal water curve */}
            <path
              d="M 460 -20 C 510 140, 560 280, 620 470 L 700 470 C 640 280, 590 140, 540 -20 Z"
              fill="#D4DEEA"
            />
            {/* Secondary arterial roads */}
            <path
              d="M -40 160 C 320 170, 740 130, 1240 190"
              stroke="#D9C5B2"
              strokeWidth="12"
            />
            <path
              d="M 220 -20 C 260 180, 310 310, 350 470"
              stroke="#D9C5B2"
              strokeWidth="10"
            />
            <path
              d="M 840 -20 C 800 180, 760 310, 730 470"
              stroke="#D9C5B2"
              strokeWidth="8"
            />
            {/* Highway A2 / Ring Utrecht */}
            <path
              d="M -40 310 C 380 260, 780 250, 1240 90"
              stroke="#4D6080"
              strokeWidth="4"
              strokeOpacity="0.45"
            />
            <path
              d="M -40 310 C 380 260, 780 250, 1240 90"
              stroke="#F4721E"
              strokeWidth="2"
              strokeDasharray="8 8"
            />

            {/* Location Pin at Archimedesweg 24 Utrecht */}
            <g transform="translate(595, 225)">
              <circle cx="0" cy="0" r="42" fill="rgba(244, 114, 30, 0.16)" />
              <circle cx="0" cy="0" r="20" fill="rgba(244, 114, 30, 0.32)" />
              <circle cx="0" cy="0" r="9" fill="#F4721E" stroke="#FBF7F2" strokeWidth="3" />
            </g>
          </svg>

          {/* Floating Map Card */}
          <div className="absolute bottom-5 left-5 right-5 sm:right-auto rounded-[24px] bg-[var(--porcelain)]/90 backdrop-blur-md border border-[var(--line)] px-6 py-4 shadow-calm flex items-center justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--orange-ink)]">
                Centraal Steunpunt & Planning
              </p>
              <p className="font-display text-lg text-[var(--blue)]">
                {company.address.street}, {company.address.postalCode} {company.address.city}
              </p>
            </div>
            <a
              href={company.address.routeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[var(--orange)] text-[var(--ink)] inline-flex items-center justify-center shrink-0"
              aria-label="Open locatie in Google Maps"
            >
              <ArrowUpRight strokeWidth={1.25} className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
