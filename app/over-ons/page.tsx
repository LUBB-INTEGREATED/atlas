import type { Metadata } from 'next';
import { ArrowUpRight, Mail, ShieldCheck } from 'lucide-react';
import {
  ArchImage,
  CalmButton,
  PageHero,
  RevealHeadline,
  SectionLabel,
} from '@/components/FlowElements';
import { ATLAS_IMAGES } from '@/src/assets/images';
import { company, getObtainedCertificates } from '@/src/config/company';
import { nl } from '@/src/content/nl';

export const metadata: Metadata = {
  title: 'Over ons — Veiligheid met aandacht, rust en vakmanschap',
  description:
    'Maak kennis met Atlas Holland B.V.: uw landelijke partner voor gecertificeerde verkeersregelaars, verkeersplannen en tijdelijke verkeersmaatregelen onder één dak.',
};

export default function OverOnsPage() {
  const obtainedCerts = getObtainedCertificates();

  return (
    <div className="bg-[var(--cream-light)]">
      <PageHero
        breadcrumb={nl.overOnsPage.breadcrumb}
        titleBefore={nl.overOnsPage.titleBefore}
        titleItalic={nl.overOnsPage.titleItalic}
        lead={nl.overOnsPage.lead}
        image={ATLAS_IMAGES.heroTrafficController}
        imageAlt="Verkeersregelaar van Atlas Holland op locatie bij zonsondergang"
        archPhoto
      />

      {/* Story Section: Alles onder één dak */}
      <section className="py-16 sm:py-24 max-w-[1320px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <SectionLabel>ONS VERHAAL</SectionLabel>
            <RevealHeadline
              as="h2"
              before="Alles onder één dak,"
              italic="met korte lijnen"
              className="text-[clamp(2.25rem,4vw,3.5rem)] text-[var(--blue)]"
            />
            <div className="space-y-5 text-[1.0625rem] leading-[1.75] text-[var(--ink)]/90">
              {nl.overOnsPage.storyParagraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <div className="pt-4 flex flex-wrap gap-4">
              <CalmButton href="/offerte-aanvragen" variant="primary">
                Kennismaken of aanvragen
              </CalmButton>
              <CalmButton href="/diensten" variant="secondary">
                Onze 11 diensten
              </CalmButton>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
            <ArchImage
              src={ATLAS_IMAGES.stillLifeConePlinth}
              alt="Stilleven van rust en verkeersveiligheid"
              aspectClass="aspect-[3/4]"
              className="shadow-calm border border-[var(--line)]"
            />
            <ArchImage
              src={ATLAS_IMAGES.operationsSiteAccess}
              alt="Persoonlijke ontvangst en begeleiding op de bouwplaats"
              aspectClass="aspect-[3/3.6]"
              delay={0.15}
              className="shadow-calm border border-[var(--line)]"
            />
          </div>
        </div>
      </section>

      {/* Core Values (Veiligheid · Kwaliteit · Betrokkenheid · Flexibiliteit) */}
      <section className="py-20 sm:py-28 bg-[var(--cream)] bg-film-grain">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <SectionLabel>ONZE KERNWAARDEN</SectionLabel>
            <h2 className="mt-3 font-display text-[clamp(2.25rem,4vw,3.5rem)] font-light text-[var(--blue)]">
              Waar u ons elke dag op mag aanspreken
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nl.overOnsPage.values.map((val, idx) => (
              <div
                key={val.title}
                className="rounded-[28px] bg-[var(--porcelain)] p-7 border border-[var(--line)] flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--orange-ink)] tabular-nums">
                    0{idx + 1}
                  </span>
                  <h3 className="mt-3 font-display text-2xl text-[var(--blue)]">{val.title}</h3>
                  <p className="mt-3 text-[15.5px] leading-[1.65] text-[var(--ink)]/85">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Grid (Arch Portrait, Name, Role, Email, LinkedIn) */}
      {company.team.length > 0 ? (
        <section className="py-20 sm:py-28 max-w-[1320px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-14">
            <SectionLabel>HET TEAM ACHTER DE PLANNING</SectionLabel>
            <h2 className="mt-3 font-display text-[clamp(2.25rem,4vw,3.5rem)] font-light text-[var(--blue)]">
              Vaste aanspreekpunten die uw project kennen
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {company.team.map((member, idx) => (
              <div
                key={member.email}
                className="rounded-t-[999px] rounded-b-[28px] bg-[var(--porcelain)] p-4 border border-[var(--line)] shadow-calm"
              >
                <ArchImage
                  src={member.image}
                  alt={member.name}
                  aspectClass="aspect-[3/3.6]"
                  delay={idx * 0.08}
                />
                <div className="pt-5 pb-2 px-2">
                  <h3 className="font-display text-xl text-[var(--blue)]">{member.name}</h3>
                  <p className="mt-1 text-sm text-[var(--ink)]/80">{member.role}</p>
                  <div className="mt-4 pt-3 border-t border-[var(--line)] flex items-center justify-between gap-2 text-xs font-medium">
                    <a
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center gap-1.5 text-[var(--blue)] hover:text-[var(--ink)] truncate"
                    >
                      <Mail strokeWidth={1.25} className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{member.email}</span>
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`LinkedIn van ${member.name}`}
                      className="inline-flex items-center gap-1 text-[var(--orange-ink)] hover:underline shrink-0"
                    >
                      <span>LinkedIn</span>
                      <ArrowUpRight strokeWidth={1.25} className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Obtained Certificates Section */}
      {obtainedCerts.length > 0 ? (
        <section className="py-20 bg-[var(--cream)] border-t border-[var(--line)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-10">
              <SectionLabel>KWALITEIT & CERTIFICERING</SectionLabel>
              <h2 className="mt-3 font-display text-[clamp(2rem,3.5vw,3rem)] font-light text-[var(--blue)]">
                Onafhankelijk getoetste veiligheid
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {obtainedCerts.map((cert) => (
                <div
                  key={cert.code}
                  className="rounded-[28px] bg-[var(--porcelain)] p-6 border border-[var(--line)] space-y-3"
                >
                  <div className="inline-flex items-center gap-2 rounded-full bg-[var(--cream)] px-4 py-1.5 text-xs font-semibold text-[var(--ink)]">
                    <ShieldCheck strokeWidth={1.25} className="w-4 h-4 text-[var(--orange-ink)]" />
                    <span>{cert.code}</span>
                  </div>
                  <h3 className="font-display text-xl text-[var(--blue)]">{cert.name}</h3>
                  <p className="text-sm leading-relaxed text-[var(--ink)]/80">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
