'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Check, Upload } from 'lucide-react';
import { CALM_EASE, CalmButton, SectionLabel } from './FlowElements';
import { company } from '@/src/config/company';

export function JobApplicationForm({ defaultVacancyTitle }: { defaultVacancyTitle?: string }) {
  const [naam, setNaam] = useState('');
  const [email, setEmail] = useState('');
  const [telefoon, setTelefoon] = useState('');
  const [woonplaats, setWoonplaats] = useState('');
  const [ervaring, setErvaring] = useState('Nog geen ervaring');
  const [beschikbaarheid, setBeschikbaarheid] = useState('Fulltime');
  const [rijbewijs, setRijbewijs] = useState('B');
  const [motivatie, setMotivatie] = useState('');
  const [cvFileName, setCvFileName] = useState<string | null>(null);
  const [privacy, setPrivacy] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    const file = e.target.files?.[0];
    if (!file) {
      setCvFileName(null);
      return;
    }

    const maxBytes = 5 * 1024 * 1024;
    if (file.size > maxBytes) {
      setErrorMsg('Het gekozen bestand is groter dan 5 MB. Kies een kleiner PDF- of Word-bestand.');
      e.target.value = '';
      setCvFileName(null);
      return;
    }

    setCvFileName(file.name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!naam.trim() || !email.trim() || !telefoon.trim() || !woonplaats.trim()) {
      setErrorMsg('Vul alsjeblieft je naam, e-mailadres, telefoonnummer en woonplaats in.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg('Controleer alsjeblieft je e-mailadres.');
      return;
    }

    if (!privacy) {
      setErrorMsg('Vink aan dat je akkoord gaat met de privacyverklaring om je sollicitatie te versturen.');
      return;
    }

    const payload = {
      type: 'sollicitatie',
      vacature: defaultVacancyTitle || 'Open sollicitatie / Verkeersregelaar',
      naam: naam.trim(),
      email: email.trim(),
      telefoon: telefoon.trim(),
      woonplaats: woonplaats.trim(),
      ervaring,
      beschikbaarheid,
      rijbewijs,
      motivatie: motivatie.trim() || undefined,
      cvBestand: cvFileName || undefined,
      submittedAt: new Date().toISOString(),
    };

    // Structured handler ready to post to an API endpoint later
    console.info('[Atlas Werken Bij Sollicitatie]', payload);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: CALM_EASE }}
        className="rounded-[28px] bg-[var(--porcelain)] border border-[var(--sand)] p-8 sm:p-14 text-center space-y-5 shadow-calm"
      >
        <div className="w-16 h-16 rounded-full bg-[var(--orange)] text-[var(--ink)] mx-auto flex items-center justify-center">
          <Check strokeWidth={1.5} className="w-8 h-8" />
        </div>
        <h3 className="font-display text-3xl text-[var(--blue)]">
          Bedankt voor je sollicitatie, {naam}!
        </h3>
        <p className="text-[16.5px] leading-[1.7] text-[var(--ink)]/85 max-w-lg mx-auto">
          We hebben je gegevens goed ontvangen. Binnen één werkdag belt onze collega je op voor een
          kennismaking en een kop koffie.
        </p>
        <p className="text-sm text-[var(--blue)]">
          Kun je niet wachten? Bel ons gerust op{' '}
          <a href={company.phoneHref} className="font-semibold underline tabular-nums">
            {company.phoneDisplay}
          </a>
          .
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[28px] bg-[var(--porcelain)]/85 border border-[var(--line)] p-6 sm:p-10 lg:p-12 space-y-6 shadow-calm"
    >
      <div className="border-b border-[var(--line)] pb-5">
        <SectionLabel>DIRECT SOLLICITEREN</SectionLabel>
        <h3 className="mt-2 font-display text-2xl sm:text-3xl text-[var(--blue)]">
          {defaultVacancyTitle
            ? `Solliciteer als ${defaultVacancyTitle}`
            : 'Zet vandaag je eerste stap bij Atlas'}
        </h3>
        <p className="mt-1 text-sm text-[var(--ink)]/80">
          Binnen twee minuten ingevuld. Een cv meesturen mag, maar is niet verplicht.
        </p>
      </div>

      {/* Naam & E-mail */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="sollicitatie-naam" className="block text-sm font-medium text-[var(--ink)] mb-2">
            Voor- en achternaam *
          </label>
          <input
            id="sollicitatie-naam"
            type="text"
            required
            value={naam}
            onChange={(e) => setNaam(e.target.value)}
            placeholder="Jouw naam"
            className="w-full h-14 px-6 rounded-full bg-[var(--porcelain)] border border-[var(--sand)] text-[var(--ink)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
          />
        </div>
        <div>
          <label htmlFor="sollicitatie-email" className="block text-sm font-medium text-[var(--ink)] mb-2">
            E-mailadres *
          </label>
          <input
            id="sollicitatie-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jij@voorbeeld.nl"
            className="w-full h-14 px-6 rounded-full bg-[var(--porcelain)] border border-[var(--sand)] text-[var(--ink)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
          />
        </div>
      </div>

      {/* Telefoon & Woonplaats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="sollicitatie-telefoon" className="block text-sm font-medium text-[var(--ink)] mb-2">
            Telefoonnummer *
          </label>
          <input
            id="sollicitatie-telefoon"
            type="tel"
            required
            value={telefoon}
            onChange={(e) => setTelefoon(e.target.value)}
            placeholder="06 - 12 34 56 78"
            className="w-full h-14 px-6 rounded-full bg-[var(--porcelain)] border border-[var(--sand)] text-[var(--ink)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
          />
        </div>
        <div>
          <label htmlFor="sollicitatie-woonplaats" className="block text-sm font-medium text-[var(--ink)] mb-2">
            Woonplaats *
          </label>
          <input
            id="sollicitatie-woonplaats"
            type="text"
            required
            value={woonplaats}
            onChange={(e) => setWoonplaats(e.target.value)}
            placeholder="Bijv. Utrecht, Rotterdam, Breda..."
            className="w-full h-14 px-6 rounded-full bg-[var(--porcelain)] border border-[var(--sand)] text-[var(--ink)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
          />
        </div>
      </div>

      {/* Ervaring, Beschikbaarheid & Rijbewijs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label htmlFor="sollicitatie-ervaring" className="block text-sm font-medium text-[var(--ink)] mb-2">
            Jouw ervaring
          </label>
          <select
            id="sollicitatie-ervaring"
            value={ervaring}
            onChange={(e) => setErvaring(e.target.value)}
            className="w-full h-14 px-5 rounded-full bg-[var(--porcelain)] border border-[var(--sand)] text-[var(--ink)] text-[14.5px] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
          >
            <option value="Ervaren en gecertificeerd">Ervaren en gecertificeerd</option>
            <option value="Ervaring zonder geldig certificaat">Ervaring zonder geldig certificaat</option>
            <option value="Nog geen ervaring">Nog geen ervaring (wij leiden je op)</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="sollicitatie-beschikbaarheid"
            className="block text-sm font-medium text-[var(--ink)] mb-2"
          >
            Beschikbaarheid
          </label>
          <select
            id="sollicitatie-beschikbaarheid"
            value={beschikbaarheid}
            onChange={(e) => setBeschikbaarheid(e.target.value)}
            className="w-full h-14 px-5 rounded-full bg-[var(--porcelain)] border border-[var(--sand)] text-[var(--ink)] text-[14.5px] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
          >
            <option value="Fulltime">Fulltime</option>
            <option value="Parttime">Parttime</option>
            <option value="Flexibel">Flexibel</option>
          </select>
        </div>

        <div>
          <label htmlFor="sollicitatie-rijbewijs" className="block text-sm font-medium text-[var(--ink)] mb-2">
            Rijbewijs
          </label>
          <select
            id="sollicitatie-rijbewijs"
            value={rijbewijs}
            onChange={(e) => setRijbewijs(e.target.value)}
            className="w-full h-14 px-5 rounded-full bg-[var(--porcelain)] border border-[var(--sand)] text-[var(--ink)] text-[14.5px] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
          >
            <option value="Geen">Geen</option>
            <option value="B">Rijbewijs B</option>
            <option value="C">Rijbewijs C</option>
          </select>
        </div>
      </div>

      {/* Motivatie */}
      <div>
        <label htmlFor="sollicitatie-motivatie" className="block text-sm font-medium text-[var(--ink)] mb-2">
          Korte toelichting of motivatie (optioneel)
        </label>
        <textarea
          id="sollicitatie-motivatie"
          rows={3}
          value={motivatie}
          onChange={(e) => setMotivatie(e.target.value)}
          placeholder="Vertel kort wie je bent en vanaf wanneer je zou kunnen starten..."
          className="w-full p-5 rounded-[20px] bg-[var(--porcelain)] border border-[var(--sand)] text-[var(--ink)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
        />
      </div>

      {/* CV Upload (Optioneel, PDF/DOC <= 5MB) */}
      <div>
        <label htmlFor="sollicitatie-cv" className="block text-sm font-medium text-[var(--ink)] mb-2">
          CV uploaden (optioneel, PDF of Word ≤ 5 MB)
        </label>
        <label
          htmlFor="sollicitatie-cv"
          className="flex items-center justify-between gap-4 h-14 px-6 rounded-full bg-[var(--porcelain)] border border-dashed border-[var(--blue)]/40 hover:border-[var(--blue)] cursor-pointer transition-colors"
        >
          <span className="text-sm text-[var(--ink)]/80 truncate">
            {cvFileName ? `Geselecteerd: ${cvFileName}` : 'Kies een bestand (PDF, DOC, DOCX)...'}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--blue)] shrink-0">
            <Upload strokeWidth={1.25} className="w-4 h-4" />
            <span>Bestand kiezen</span>
          </span>
          <input
            id="sollicitatie-cv"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileChange}
            className="sr-only"
          />
        </label>
      </div>

      {/* Privacy Checkbox */}
      <div className="flex items-start gap-3">
        <input
          id="sollicitatie-privacy"
          type="checkbox"
          checked={privacy}
          onChange={(e) => setPrivacy(e.target.checked)}
          className="mt-1 w-4 h-4 accent-[var(--blue)] rounded"
        />
        <label htmlFor="sollicitatie-privacy" className="text-sm text-[var(--ink)]/85">
          Ik ga akkoord met de verwerking van mijn gegevens voor deze sollicitatie volgens de{' '}
          <Link href="/privacy" className="underline text-[var(--blue)]">
            privacyverklaring
          </Link>
          . *
        </label>
      </div>

      {errorMsg ? (
        <p role="alert" className="text-sm font-medium text-[var(--orange-ink)]">
          {errorMsg}
        </p>
      ) : null}

      <CalmButton type="submit" variant="primary">
        Sollicitatie versturen
      </CalmButton>
    </form>
  );
}
