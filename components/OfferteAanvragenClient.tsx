'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, Check, Clock, Phone, ShieldCheck } from 'lucide-react';
import { CALM_EASE, CalmButton, SectionLabel } from './FlowElements';
import { company } from '@/src/config/company';
import { nl } from '@/src/content/nl';

export function OfferteAanvragenClient() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1: Selected services (initialized from ?dienst= query param if valid)
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(() => {
    const prefill = searchParams.get('dienst');
    if (prefill && nl.services.some((s) => s.slug === prefill)) {
      return [prefill];
    }
    return ['verkeersregelaars'];
  });

  const toggleService = (slug: string) => {
    setSelectedSlugs((prev) =>
      prev.includes(slug) ? prev.filter((item) => item !== slug) : [...prev, slug]
    );
  };

  // Step 2: Project details
  const [locatie, setLocatie] = useState('');
  const [datum, setDatum] = useState('');
  const [begintijd, setBegintijd] = useState('07:00');
  const [eindtijd, setEindtijd] = useState('16:00');
  const [meerdaags, setMeerdaags] = useState(false);
  const [einddatum, setEinddatum] = useState('');
  const [aantalVerkeersregelaars, setAantalVerkeersregelaars] = useState('2');
  const [soortWerkzaamheden, setSoortWerkzaamheden] = useState('');
  const [opmerkingen, setOpmerkingen] = useState('');

  // Step 3: Contact details
  const [naam, setNaam] = useState('');
  const [organisatie, setOrganisatie] = useState('');
  const [email, setEmail] = useState('');
  const [telefoon, setTelefoon] = useState('');
  const [privacy, setPrivacy] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const goToNextStep = () => {
    setErrorMsg(null);
    if (step === 1) {
      if (selectedSlugs.length === 0) {
        setErrorMsg('Selecteer alstublieft minimaal één dienst waarvoor u een offerte wenst.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!locatie.trim() || !datum.trim() || !soortWerkzaamheden.trim()) {
        setErrorMsg('Vul alstublieft de projectlocatie, startdatum en het soort werkzaamheden in.');
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!naam.trim() || !organisatie.trim() || !email.trim() || !telefoon.trim()) {
      setErrorMsg('Vul alstublieft uw naam, organisatie, e-mailadres en telefoonnummer in.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg('Controleer alstublieft het ingevulde e-mailadres.');
      return;
    }

    if (!privacy) {
      setErrorMsg('Ga alstublieft akkoord met de privacyverklaring om uw aanvraag te versturen.');
      return;
    }

    const payload = {
      type: 'offerte_aanvraag',
      diensten: selectedSlugs,
      project: {
        locatie: locatie.trim(),
        datum,
        begintijd,
        eindtijd,
        meerdaags,
        einddatum: meerdaags ? einddatum : undefined,
        aantalVerkeersregelaars,
        soortWerkzaamheden: soortWerkzaamheden.trim(),
        opmerkingen: opmerkingen.trim() || undefined,
      },
      contact: {
        naam: naam.trim(),
        organisatie: organisatie.trim(),
        email: email.trim(),
        telefoon: telefoon.trim(),
      },
      submittedAt: new Date().toISOString(),
    };

    // Structured handler ready for backend API integration
    console.info('[Atlas Offerte Aanvraag]', payload);
    setSubmitted(true);
  };

  const stepsMeta = [
    { num: 1, label: 'Dienst' },
    { num: 2, label: 'Project' },
    { num: 3, label: 'Contact' },
  ] as const;

  return (
    <section className="max-w-[1320px] mx-auto px-4 sm:px-6 pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left 8 Columns: 3-Step Form */}
        <div className="lg:col-span-8">
          {/* Smooth Progress Line: Dienst — Project — Contact */}
          <div className="mb-10 rounded-[28px] bg-[var(--porcelain)] border border-[var(--line)] p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              {stepsMeta.map((s) => {
                const active = step >= s.num || submitted;
                const isCurrent = step === s.num && !submitted;
                return (
                  <button
                    key={s.num}
                    type="button"
                    disabled={submitted || s.num > step}
                    onClick={() => {
                      if (!submitted && s.num < step) setStep(s.num);
                    }}
                    className="flex items-center gap-3 text-left disabled:cursor-default"
                  >
                    <span
                      className={`w-9 h-9 rounded-full inline-flex items-center justify-center text-xs font-semibold transition-colors ${
                        isCurrent
                          ? 'bg-[var(--orange)] text-[var(--ink)]'
                          : active
                            ? 'bg-[var(--blue)] text-[var(--porcelain)]'
                            : 'bg-[var(--cream)] text-[var(--blue)]'
                      }`}
                    >
                      0{s.num}
                    </span>
                    <span
                      className={`font-display text-lg sm:text-xl ${
                        active ? 'text-[var(--blue)]' : 'text-[var(--blue)]/50'
                      }`}
                    >
                      {s.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Progress Bar */}
            <div className="mt-5 h-[3px] w-full rounded-full bg-[var(--cream)] overflow-hidden">
              <motion.div
                className="h-full bg-[var(--orange)] rounded-full"
                animate={{
                  width: submitted ? '100%' : step === 1 ? '33.3%' : step === 2 ? '66.6%' : '100%',
                }}
                transition={{ duration: 0.6, ease: CALM_EASE }}
              />
            </div>
          </div>

          {/* Step Content */}
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, ease: CALM_EASE }}
              className="rounded-[28px] bg-[var(--porcelain)] border border-[var(--sand)] p-8 sm:p-14 text-center space-y-5 shadow-calm"
            >
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1, ease: CALM_EASE }}
                className="w-16 h-16 rounded-full bg-[var(--orange)] text-[var(--ink)] mx-auto flex items-center justify-center"
              >
                <Check strokeWidth={1.75} className="w-8 h-8" />
              </motion.div>
              <h2 className="font-display text-3xl sm:text-4xl text-[var(--blue)]">
                Bedankt! We nemen binnen 24 uur contact met u op.
              </h2>
              <p className="text-[16.5px] leading-[1.7] text-[var(--ink)]/85 max-w-xl mx-auto">
                Uw aanvraag voor <strong>{organisatie}</strong> (locatie: {locatie}) is ontvangen
                door onze centrale planning. U ontvangt binnen uiterlijk 24 uur een helder voorstel
                of inzetbevestiging.
              </p>
              <div className="pt-4">
                <CalmButton href="/" variant="secondary">
                  Terug naar de startpagina
                </CalmButton>
              </div>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-[28px] bg-[var(--porcelain)] border border-[var(--line)] p-6 sm:p-10 lg:p-12 shadow-calm overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {/* STEP 1: DIENST SELECTEREN */}
                {step === 1 ? (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.5, ease: CALM_EASE }}
                    className="space-y-6"
                  >
                    <div>
                      <SectionLabel>STAP 01 · DIENST</SectionLabel>
                      <h2 className="mt-2 font-display text-2xl sm:text-3xl text-[var(--blue)]">
                        Welke dienst(en) wilt u aanvragen?
                      </h2>
                      <p className="mt-1 text-sm text-[var(--ink)]/80">
                        U kunt meerdere diensten tegelijk selecteren voor een gecombineerd voorstel.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                      {nl.services.map((srv) => {
                        const isSelected = selectedSlugs.includes(srv.slug);
                        return (
                          <button
                            key={srv.slug}
                            type="button"
                            onClick={() => toggleService(srv.slug)}
                            aria-pressed={isSelected}
                            className={`text-left rounded-[22px] p-4.5 border transition-all duration-300 flex items-start justify-between gap-3 ${
                              isSelected
                                ? 'bg-[var(--cream)] border-[var(--blue)] shadow-sm'
                                : 'bg-[var(--porcelain)] border-[var(--sand)] hover:bg-[var(--cream-light)]'
                            }`}
                          >
                            <div>
                              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--orange-ink)]">
                                {srv.category}
                              </span>
                              <p className="font-display text-lg text-[var(--blue)] mt-0.5">
                                {srv.title}
                              </p>
                            </div>
                            <span
                              className={`w-6 h-6 rounded-full border inline-flex items-center justify-center shrink-0 mt-1 transition-colors ${
                                isSelected
                                  ? 'bg-[var(--blue)] border-[var(--blue)] text-[var(--porcelain)]'
                                  : 'border-[var(--sand)] bg-[var(--porcelain)]'
                              }`}
                            >
                              {isSelected ? <Check strokeWidth={1.75} className="w-3.5 h-3.5" /> : null}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {errorMsg ? (
                      <p role="alert" className="text-sm font-medium text-[var(--orange-ink)]">
                        {errorMsg}
                      </p>
                    ) : null}

                    <div className="pt-4 flex justify-end">
                      <CalmButton type="button" onClick={goToNextStep} variant="primary">
                        Volgende stap: Projectgegevens
                      </CalmButton>
                    </div>
                  </motion.div>
                ) : null}

                {/* STEP 2: PROJECTGEGEVENS */}
                {step === 2 ? (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.5, ease: CALM_EASE }}
                    className="space-y-6"
                  >
                    <div>
                      <SectionLabel>STAP 02 · PROJECT</SectionLabel>
                      <h2 className="mt-2 font-display text-2xl sm:text-3xl text-[var(--blue)]">
                        Waar en wanneer vindt het project plaats?
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="offerte-locatie" className="block text-sm font-medium text-[var(--ink)] mb-2">
                          Projectlocatie (plaats / straat) *
                        </label>
                        <input
                          id="offerte-locatie"
                          type="text"
                          required
                          value={locatie}
                          onChange={(e) => setLocatie(e.target.value)}
                          placeholder="Bijv. Stationsplein, Utrecht"
                          className="w-full h-14 px-6 rounded-full bg-[var(--porcelain)] border border-[var(--sand)] text-[var(--ink)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
                        />
                      </div>

                      <div>
                        <label htmlFor="offerte-datum" className="block text-sm font-medium text-[var(--ink)] mb-2">
                          Startdatum *
                        </label>
                        <input
                          id="offerte-datum"
                          type="date"
                          required
                          value={datum}
                          onChange={(e) => setDatum(e.target.value)}
                          className="w-full h-14 px-6 rounded-full bg-[var(--porcelain)] border border-[var(--sand)] text-[var(--ink)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div>
                        <label htmlFor="offerte-begintijd" className="block text-sm font-medium text-[var(--ink)] mb-2">
                          Begintijd
                        </label>
                        <input
                          id="offerte-begintijd"
                          type="time"
                          value={begintijd}
                          onChange={(e) => setBegintijd(e.target.value)}
                          className="w-full h-14 px-6 rounded-full bg-[var(--porcelain)] border border-[var(--sand)] text-[var(--ink)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
                        />
                      </div>

                      <div>
                        <label htmlFor="offerte-eindtijd" className="block text-sm font-medium text-[var(--ink)] mb-2">
                          Eindtijd
                        </label>
                        <input
                          id="offerte-eindtijd"
                          type="time"
                          value={eindtijd}
                          onChange={(e) => setEindtijd(e.target.value)}
                          className="w-full h-14 px-6 rounded-full bg-[var(--porcelain)] border border-[var(--sand)] text-[var(--ink)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
                        />
                      </div>

                      <div>
                        <label htmlFor="offerte-aantal" className="block text-sm font-medium text-[var(--ink)] mb-2">
                          Aantal verkeersregelaars
                        </label>
                        <select
                          id="offerte-aantal"
                          value={aantalVerkeersregelaars}
                          onChange={(e) => setAantalVerkeersregelaars(e.target.value)}
                          className="w-full h-14 px-6 rounded-full bg-[var(--porcelain)] border border-[var(--sand)] text-[var(--ink)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
                        >
                          <option value="Advies gewenst">Advies gewenst</option>
                          <option value="1">1 verkeersregelaar</option>
                          <option value="2">2 verkeersregelaars</option>
                          <option value="3 - 4">3 tot 4 verkeersregelaars</option>
                          <option value="5 of meer">5 of meer verkeersregelaars</option>
                        </select>
                      </div>
                    </div>

                    {/* Meerdaags Checkbox + Einddatum */}
                    <div className="rounded-[22px] bg-[var(--cream-light)] p-5 border border-[var(--line)] space-y-4">
                      <div className="flex items-center gap-3">
                        <input
                          id="offerte-meerdaags"
                          type="checkbox"
                          checked={meerdaags}
                          onChange={(e) => setMeerdaags(e.target.checked)}
                          className="w-4 h-4 accent-[var(--blue)] rounded"
                        />
                        <label htmlFor="offerte-meerdaags" className="text-sm font-medium text-[var(--ink)]">
                          Dit betreft een meerdaagse of langlopende inzet
                        </label>
                      </div>

                      {meerdaags ? (
                        <div>
                          <label htmlFor="offerte-einddatum" className="block text-sm font-medium text-[var(--ink)] mb-2">
                            Verwachte einddatum
                          </label>
                          <input
                            id="offerte-einddatum"
                            type="date"
                            value={einddatum}
                            onChange={(e) => setEinddatum(e.target.value)}
                            className="w-full sm:w-72 h-14 px-6 rounded-full bg-[var(--porcelain)] border border-[var(--sand)] text-[var(--ink)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
                          />
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <label htmlFor="offerte-soort" className="block text-sm font-medium text-[var(--ink)] mb-2">
                        Soort werkzaamheden of evenement *
                      </label>
                      <input
                        id="offerte-soort"
                        type="text"
                        required
                        value={soortWerkzaamheden}
                        onChange={(e) => setSoortWerkzaamheden(e.target.value)}
                        placeholder="Bijv. asfaltonderhoud, hijswerkzaamheden, kabel- en leidingwerk..."
                        className="w-full h-14 px-6 rounded-full bg-[var(--porcelain)] border border-[var(--sand)] text-[var(--ink)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
                      />
                    </div>

                    <div>
                      <label htmlFor="offerte-opmerkingen" className="block text-sm font-medium text-[var(--ink)] mb-2">
                        Aanvullende opmerkingen (optioneel)
                      </label>
                      <textarea
                        id="offerte-opmerkingen"
                        rows={3}
                        value={opmerkingen}
                        onChange={(e) => setOpmerkingen(e.target.value)}
                        placeholder="Bijzonderheden over vergunningen, bebording of specifieke werktijden..."
                        className="w-full p-5 rounded-[20px] bg-[var(--porcelain)] border border-[var(--sand)] text-[var(--ink)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
                      />
                    </div>

                    {errorMsg ? (
                      <p role="alert" className="text-sm font-medium text-[var(--orange-ink)]">
                        {errorMsg}
                      </p>
                    ) : null}

                    <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--blue)] hover:text-[var(--ink)]"
                      >
                        <ArrowLeft strokeWidth={1.25} className="w-4 h-4" />
                        <span>Vorige stap</span>
                      </button>

                      <CalmButton type="button" onClick={goToNextStep} variant="primary">
                        Volgende stap: Contactgegevens
                      </CalmButton>
                    </div>
                  </motion.div>
                ) : null}

                {/* STEP 3: CONTACTGEGEVENS */}
                {step === 3 ? (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.5, ease: CALM_EASE }}
                    className="space-y-6"
                  >
                    <div>
                      <SectionLabel>STAP 03 · CONTACT</SectionLabel>
                      <h2 className="mt-2 font-display text-2xl sm:text-3xl text-[var(--blue)]">
                        Waar mogen wij het voorstel naartoe sturen?
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="offerte-naam" className="block text-sm font-medium text-[var(--ink)] mb-2">
                          Uw naam *
                        </label>
                        <input
                          id="offerte-naam"
                          type="text"
                          required
                          value={naam}
                          onChange={(e) => setNaam(e.target.value)}
                          placeholder="Voor- en achternaam"
                          className="w-full h-14 px-6 rounded-full bg-[var(--porcelain)] border border-[var(--sand)] text-[var(--ink)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
                        />
                      </div>

                      <div>
                        <label htmlFor="offerte-organisatie" className="block text-sm font-medium text-[var(--ink)] mb-2">
                          Organisatie / gemeente / aannemer *
                        </label>
                        <input
                          id="offerte-organisatie"
                          type="text"
                          required
                          value={organisatie}
                          onChange={(e) => setOrganisatie(e.target.value)}
                          placeholder="Naam van uw organisatie"
                          className="w-full h-14 px-6 rounded-full bg-[var(--porcelain)] border border-[var(--sand)] text-[var(--ink)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="offerte-email" className="block text-sm font-medium text-[var(--ink)] mb-2">
                          Zakelijk e-mailadres *
                        </label>
                        <input
                          id="offerte-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="naam@organisatie.nl"
                          className="w-full h-14 px-6 rounded-full bg-[var(--porcelain)] border border-[var(--sand)] text-[var(--ink)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
                        />
                      </div>

                      <div>
                        <label htmlFor="offerte-telefoon" className="block text-sm font-medium text-[var(--ink)] mb-2">
                          Telefoonnummer *
                        </label>
                        <input
                          id="offerte-telefoon"
                          type="tel"
                          required
                          value={telefoon}
                          onChange={(e) => setTelefoon(e.target.value)}
                          placeholder="06 / 085 nummer"
                          className="w-full h-14 px-6 rounded-full bg-[var(--porcelain)] border border-[var(--sand)] text-[var(--ink)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
                        />
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pt-2">
                      <input
                        id="offerte-privacy"
                        type="checkbox"
                        checked={privacy}
                        onChange={(e) => setPrivacy(e.target.checked)}
                        className="mt-1 w-4 h-4 accent-[var(--blue)] rounded"
                      />
                      <label htmlFor="offerte-privacy" className="text-sm text-[var(--ink)]/85">
                        Ik ga akkoord met de verwerking van mijn gegevens conform de{' '}
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

                    <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--blue)] hover:text-[var(--ink)]"
                      >
                        <ArrowLeft strokeWidth={1.25} className="w-4 h-4" />
                        <span>Vorige stap</span>
                      </button>

                      <CalmButton type="submit" variant="primary">
                        Offerteaanvraag versturen
                      </CalmButton>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </form>
          )}
        </div>

        {/* Right 4 Columns: Sticky Rounded Side Panel */}
        <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
          <div className="rounded-[28px] bg-[var(--blue)] text-[var(--cream)] p-7 sm:p-9 shadow-calm-lg space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--cream)]">
              <span className="w-2 h-2 rounded-full bg-[var(--ok)]" aria-hidden="true" />
              <span>Reactie binnen 24 uur</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-light text-[var(--porcelain)]">
              Heldere afspraken, zonder verrassingen
            </h3>

            <ul className="space-y-3 text-sm text-[var(--cream)]/90">
              <li className="flex items-start gap-2.5">
                <Clock strokeWidth={1.25} className="w-4 h-4 text-[var(--orange)] shrink-0 mt-0.5" />
                <span>Binnen 24 uur een vrijblijvende offerte of inzetbevestiging</span>
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck strokeWidth={1.25} className="w-4 h-4 text-[var(--orange)] shrink-0 mt-0.5" />
                <span>Inzet conform CROW 96a/96b, VCA** en BRL 9101</span>
              </li>
            </ul>

            <div className="pt-5 border-t border-[var(--line-dark)] space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--cream)]/80">
                Spoedinzet of direct vandaag nodig?
              </p>
              <a
                href={company.emergencyPhoneHref}
                className="w-full h-14 px-6 rounded-full bg-[var(--orange)] hover:bg-[var(--orange-hover)] text-[var(--ink)] font-semibold text-base inline-flex items-center justify-between transition-colors shadow-calm tabular-nums"
              >
                <span className="inline-flex items-center gap-2.5">
                  <Phone strokeWidth={1.25} className="w-4 h-4" />
                  <span>Spoed: {company.emergencyPhoneDisplay}</span>
                </span>
                <span className="text-xs uppercase tracking-wider">24/7</span>
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
