'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowUpRight, Check, Clock, GraduationCap, ShieldCheck } from 'lucide-react';
import { CALM_EASE, CalmButton, SectionLabel } from './FlowElements';
import { nl } from '@/src/content/nl';
import { company } from '@/src/config/company';

export function OpleidingenClient() {
  const [selectedCourse, setSelectedCourse] = useState(nl.opleidingenPage.courses[0].title);
  const [naam, setNaam] = useState('');
  const [email, setEmail] = useState('');
  const [telefoon, setTelefoon] = useState('');
  const [bedrijf, setBedrijf] = useState('');
  const [toelichting, setToelichting] = useState('');
  const [privacy, setPrivacy] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelectCourse = (courseTitle: string) => {
    setSelectedCourse(courseTitle);
    const formEl = document.getElementById('aanmelden');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!naam.trim() || !email.trim() || !telefoon.trim()) {
      setErrorMessage('Vul alstublieft uw naam, e-mailadres en telefoonnummer in.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Controleer alstublieft het ingevulde e-mailadres.');
      return;
    }

    if (!privacy) {
      setErrorMessage('Ga alstublieft akkoord met de privacyverklaring om uw aanmelding te versturen.');
      return;
    }

    const payload = {
      type: 'opleiding_inschrijving',
      opleiding: selectedCourse,
      naam: naam.trim(),
      email: email.trim(),
      telefoon: telefoon.trim(),
      bedrijf: bedrijf.trim() || undefined,
      toelichting: toelichting.trim() || undefined,
      submittedAt: new Date().toISOString(),
    };

    // Structured handler ready for future API endpoint
    console.info('[Atlas Academie Aanmelding]', payload);
    setSubmitted(true);
  };

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 pb-24 space-y-24">
      {/* Courses List as Rounded Porcelain Rows */}
      <section>
        <div className="max-w-2xl mb-10">
          <SectionLabel>ATLAS ACADEMIE</SectionLabel>
          <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.5rem)] font-light text-[var(--blue)]">
            Erkende opleidingen & herhalingstrainingen
          </h2>
        </div>

        <div className="space-y-4">
          {nl.opleidingenPage.courses.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.06, ease: CALM_EASE }}
              className="rounded-[28px] bg-[var(--porcelain)] border border-[var(--sand)] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all duration-500 hover:shadow-calm"
            >
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-[var(--blue)]">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--cream)] px-3.5 py-1 text-[var(--ink)] font-semibold">
                    <Clock strokeWidth={1.25} className="w-3.5 h-3.5 text-[var(--orange-ink)]" />
                    <span>{course.duration}</span>
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <GraduationCap strokeWidth={1.25} className="w-4 h-4 text-[var(--blue)]" />
                    <span>{course.level}</span>
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck strokeWidth={1.25} className="w-4 h-4 text-[var(--blue)]" />
                    <span>{course.certificate}</span>
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-[1.65rem] font-normal text-[var(--blue)]">
                  {course.title}
                </h3>

                <p className="text-[15.5px] leading-[1.65] text-[var(--ink)]/85">
                  {course.summary}
                </p>

                <div className="pt-1 flex flex-wrap gap-x-6 gap-y-2">
                  {course.highlights.map((hl) => (
                    <span key={hl} className="inline-flex items-center gap-2 text-xs text-[var(--blue)] font-medium">
                      <Check strokeWidth={1.5} className="w-3.5 h-3.5 text-[var(--orange-ink)]" />
                      <span>{hl}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="shrink-0">
                <button
                  type="button"
                  onClick={() => handleSelectCourse(course.title)}
                  className="group inline-flex items-center gap-3 h-12 pl-5 pr-2.5 rounded-full bg-[var(--cream)] hover:bg-[var(--orange)] text-[var(--ink)] font-medium text-sm transition-all duration-500"
                >
                  <span>Inschrijven</span>
                  <span className="w-7 h-7 rounded-full bg-[var(--porcelain)] inline-flex items-center justify-center">
                    <ArrowUpRight
                      strokeWidth={1.25}
                      className="w-3.5 h-3.5 transition-transform duration-500 group-hover:rotate-45"
                    />
                  </span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Enrolment Form (#aanmelden) */}
      <section id="aanmelden" className="scroll-mt-32">
        <div className="rounded-[40px] bg-[var(--cream)] border border-[var(--line)] p-6 sm:p-12 lg:p-16 shadow-calm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-5">
              <SectionLabel>AANMELDEN OPLEIDING</SectionLabel>
              <h2 className="font-display text-[clamp(2rem,3.6vw,3rem)] font-light text-[var(--blue)]">
                {nl.opleidingenPage.form.heading}
              </h2>
              <p className="text-[16px] leading-[1.7] text-[var(--ink)]/85">
                {nl.opleidingenPage.form.subtext}
              </p>

              <div className="pt-4 border-t border-[var(--line)] space-y-2 text-sm text-[var(--ink)]/85">
                <p className="font-semibold text-[var(--blue)]">Liever telefonisch overleggen?</p>
                <p>
                  Bel onze opleidingscoördinator via{' '}
                  <a
                    href={company.phoneHref}
                    className="font-semibold text-[var(--ink)] underline underline-offset-4 tabular-nums"
                  >
                    {company.phoneDisplay}
                  </a>
                  .
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: CALM_EASE }}
                  className="rounded-[28px] bg-[var(--porcelain)] border border-[var(--sand)] p-8 sm:p-12 text-center space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-[var(--orange)] text-[var(--ink)] mx-auto flex items-center justify-center">
                    <Check strokeWidth={1.5} className="w-7 h-7" />
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl text-[var(--blue)]">
                    Bedankt voor uw aanmelding!
                  </h3>
                  <p className="text-[16px] text-[var(--ink)]/85 max-w-md mx-auto">
                    Wij hebben uw inschrijving voor <strong>{selectedCourse}</strong> ontvangen.
                    Binnen één werkdag nemen wij contact met u op om de startdata te bevestigen.
                  </p>
                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setNaam('');
                        setEmail('');
                        setTelefoon('');
                        setBedrijf('');
                        setToelichting('');
                      }}
                      className="text-sm font-medium text-[var(--blue)] underline underline-offset-4"
                    >
                      Nog een deelnemer aanmelden
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="rounded-[28px] bg-[var(--porcelain)]/75 border border-[var(--line)] p-6 sm:p-10 space-y-6"
                >
                  <div>
                    <label
                      htmlFor="opleiding-select"
                      className="block text-sm font-medium text-[var(--ink)] mb-2"
                    >
                      Gewenste opleiding *
                    </label>
                    <select
                      id="opleiding-select"
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className="w-full h-14 px-6 rounded-full bg-[var(--porcelain)] border border-[var(--sand)] text-[var(--ink)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
                    >
                      {nl.opleidingenPage.courses.map((c) => (
                        <option key={c.id} value={c.title}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="opleiding-naam" className="block text-sm font-medium text-[var(--ink)] mb-2">
                        Naam deelnemer of contactpersoon *
                      </label>
                      <input
                        id="opleiding-naam"
                        type="text"
                        required
                        value={naam}
                        onChange={(e) => setNaam(e.target.value)}
                        placeholder="Bijv. Jan de Vries"
                        className="w-full h-14 px-6 rounded-full bg-[var(--porcelain)] border border-[var(--sand)] text-[var(--ink)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
                      />
                    </div>
                    <div>
                      <label htmlFor="opleiding-bedrijf" className="block text-sm font-medium text-[var(--ink)] mb-2">
                        Bedrijf / organisatie (optioneel)
                      </label>
                      <input
                        id="opleiding-bedrijf"
                        type="text"
                        value={bedrijf}
                        onChange={(e) => setBedrijf(e.target.value)}
                        placeholder="Uw bedrijfsnaam"
                        className="w-full h-14 px-6 rounded-full bg-[var(--porcelain)] border border-[var(--sand)] text-[var(--ink)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="opleiding-email" className="block text-sm font-medium text-[var(--ink)] mb-2">
                        E-mailadres *
                      </label>
                      <input
                        id="opleiding-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="naam@organisatie.nl"
                        className="w-full h-14 px-6 rounded-full bg-[var(--porcelain)] border border-[var(--sand)] text-[var(--ink)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
                      />
                    </div>
                    <div>
                      <label htmlFor="opleiding-telefoon" className="block text-sm font-medium text-[var(--ink)] mb-2">
                        Telefoonnummer *
                      </label>
                      <input
                        id="opleiding-telefoon"
                        type="tel"
                        required
                        value={telefoon}
                        onChange={(e) => setTelefoon(e.target.value)}
                        placeholder="06 - 12 34 56 78"
                        className="w-full h-14 px-6 rounded-full bg-[var(--porcelain)] border border-[var(--sand)] text-[var(--ink)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="opleiding-toelichting"
                      className="block text-sm font-medium text-[var(--ink)] mb-2"
                    >
                      Toelichting of aantal deelnemers (optioneel)
                    </label>
                    <textarea
                      id="opleiding-toelichting"
                      rows={3}
                      value={toelichting}
                      onChange={(e) => setToelichting(e.target.value)}
                      placeholder="Bijv. gewenste maand, locatievoorkeur of incompany aanvraag voor meerdere medewerkers..."
                      className="w-full p-5 rounded-[20px] bg-[var(--porcelain)] border border-[var(--sand)] text-[var(--ink)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      id="opleiding-privacy"
                      type="checkbox"
                      checked={privacy}
                      onChange={(e) => setPrivacy(e.target.checked)}
                      className="mt-1 w-4 h-4 accent-[var(--blue)] rounded"
                    />
                    <label htmlFor="opleiding-privacy" className="text-sm text-[var(--ink)]/85">
                      Ik ga akkoord met de verwerking van mijn gegevens volgens de{' '}
                      <Link href="/privacy" className="underline text-[var(--blue)]">
                        privacyverklaring
                      </Link>
                      . *
                    </label>
                  </div>

                  {errorMessage ? (
                    <p role="alert" className="text-sm font-medium text-[var(--orange-ink)]">
                      {errorMessage}
                    </p>
                  ) : null}

                  <CalmButton type="submit" variant="primary">
                    Aanmelding versturen
                  </CalmButton>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
