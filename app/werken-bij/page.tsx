import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Clock, GraduationCap, HeartHandshake, ShieldCheck, Wallet } from 'lucide-react';
import {
  FaqAccordion,
  PageHero,
  RevealHeadline,
  SectionLabel,
} from '@/components/FlowElements';
import { JobApplicationForm } from '@/components/JobApplicationForm';
import { ATLAS_IMAGES } from '@/src/assets/images';
import { nl } from '@/src/content/nl';

export const metadata: Metadata = {
  title: 'Werken bij Atlas Holland — Word Verkeersregelaar (Gratis Opleiding)',
  description:
    'Jouw inzet maakt het verschil. Solliciteer als beroepsverkeersregelaar, bouwportier of evenementenbegeleider bij Atlas Holland B.V. Geen ervaring? Wij leiden je gratis op.',
};

export default function WerkenBijPage() {
  const benefitIcons = [Wallet, GraduationCap, ShieldCheck, HeartHandshake];

  return (
    <div className="bg-[var(--cream-light)]">
      <PageHero
        breadcrumb={nl.werkenBijPage.breadcrumb}
        subtitleBadge={nl.werkenBijPage.subtitleBadge}
        titleBefore={nl.werkenBijPage.titleBefore}
        titleItalic={nl.werkenBijPage.titleItalic}
        titleAfter={nl.werkenBijPage.titleAfter}
        lead={nl.werkenBijPage.lead}
        image={ATLAS_IMAGES.operationsSiteAccess}
        imageAlt="Collega van Atlas Holland verwelkomt bezoeker op locatie"
        archPhoto
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 pb-24 space-y-24 sm:space-y-32">
        {/* 1. Benefits */}
        <section>
          <div className="max-w-2xl mb-12">
            <SectionLabel>WAT WIJ JOU BIEDEN</SectionLabel>
            <RevealHeadline
              as="h2"
              before="Goed geregeld vanaf"
              italic="je eerste dag"
              className="mt-3 text-[clamp(2rem,4vw,3.5rem)] text-[var(--blue)]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nl.werkenBijPage.benefits.map((b, idx) => {
              const Icon = benefitIcons[idx % benefitIcons.length];
              return (
                <div
                  key={b.title}
                  className="rounded-[28px] bg-[var(--porcelain)] p-7 border border-[var(--line)] shadow-calm"
                >
                  <div className="w-12 h-12 rounded-full bg-[var(--cream)] text-[var(--blue)] flex items-center justify-center">
                    <Icon strokeWidth={1.25} className="w-5 h-5" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl text-[var(--blue)]">{b.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-[1.65] text-[var(--ink)]/85">
                    {b.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 2. Vacancy Rows as Rounded Pills */}
        <section id="vacatures">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <SectionLabel>OPENSTAANDE VACATURES</SectionLabel>
              <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.5rem)] font-light text-[var(--blue)]">
                Kies de rol die bij je past
              </h2>
            </div>
            <a
              href="#solliciteren"
              className="text-sm font-medium text-[var(--orange-ink)] hover:underline"
            >
              Of stuur direct een open sollicitatie ↓
            </a>
          </div>

          <div className="space-y-4">
            {nl.werkenBijPage.vacancies.map((vac) => (
              <Link
                key={vac.slug}
                href={`/werken-bij/${vac.slug}`}
                className="group block rounded-[32px] sm:rounded-full bg-[var(--porcelain)] hover:bg-[var(--cream)] border border-[var(--sand)] px-6 sm:px-9 py-5 sm:py-6 transition-all duration-500 hover:shadow-calm"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl text-[var(--blue)] group-hover:text-[var(--ink)] transition-colors">
                      {vac.title}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--ink)]/80 line-clamp-1">{vac.summary}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 lg:gap-5 shrink-0">
                    <span className="rounded-full bg-[var(--cream)] group-hover:bg-[var(--porcelain)] px-4 py-1.5 text-xs font-medium text-[var(--blue)]">
                      {vac.region}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--ink)]/80">
                      <Clock strokeWidth={1.25} className="w-3.5 h-3.5 text-[var(--orange-ink)]" />
                      <span>{vac.hours}</span>
                    </span>
                    <span className="w-10 h-10 rounded-full bg-[var(--orange)] text-[var(--ink)] inline-flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                      <ArrowUpRight strokeWidth={1.25} className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 3. 4 Steps on the Flow Line (Solliciteer -> Kennismaken -> Opleiding -> Aan de slag) */}
        <section className="rounded-[40px] bg-[var(--cream)] p-8 sm:p-14 border border-[var(--line)]">
          <div className="max-w-2xl mb-12">
            <SectionLabel>IN 4 STAPPEN OP WEG</SectionLabel>
            <h2 className="mt-3 font-display text-[clamp(2rem,3.6vw,3rem)] font-light text-[var(--blue)]">
              Hoe verloopt jouw sollicitatie?
            </h2>
          </div>

          <div className="relative">
            {/* Horizontal curved flow line on desktop */}
            <svg
              viewBox="0 0 1100 60"
              fill="none"
              className="hidden lg:block w-full h-14 mb-2"
              aria-hidden="true"
            >
              <path
                d="M 40 30 C 220 5, 420 55, 580 30 C 740 5, 920 55, 1060 25"
                stroke="#F4721E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {nl.werkenBijPage.steps.map((step) => (
                <div
                  key={step.number}
                  className="rounded-[28px] bg-[var(--porcelain)] p-6 border border-[var(--line)]"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--orange-ink)] tabular-nums">
                    Stap {step.number}
                  </span>
                  <h3 className="mt-2 font-display text-2xl text-[var(--blue)]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]/85">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. FAQ */}
        <section className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <SectionLabel className="justify-center">VEELGESTELDE VRAGEN</SectionLabel>
            <h2 className="mt-3 font-display text-[clamp(2rem,3.6vw,3rem)] font-light text-[var(--blue)]">
              Goed om te weten voordat je solliciteert
            </h2>
          </div>
          <FaqAccordion items={nl.werkenBijPage.faqs} />
        </section>

        {/* 5. Application Form (#solliciteren) */}
        <section id="solliciteren" className="scroll-mt-32 max-w-4xl mx-auto">
          <JobApplicationForm />
        </section>
      </div>
    </div>
  );
}
