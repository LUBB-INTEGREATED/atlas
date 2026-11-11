import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowUpRight, Check, Clock, Phone, ShieldCheck } from 'lucide-react';
import {
  CalmButton,
  FaqAccordion,
  PageHero,
  SectionLabel,
  ServiceCard,
} from '@/components/FlowElements';
import { company, getObtainedCertificates } from '@/src/config/company';
import { getServiceBySlug, nl } from '@/src/content/nl';

export async function generateStaticParams() {
  return nl.services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    return {
      title: 'Dienst niet gevonden',
    };
  }

  return {
    title: `${service.title} (${service.category})`,
    description: service.lead,
    openGraph: {
      title: `${service.title} | ${company.name}`,
      description: service.lead,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const obtainedCerts = getObtainedCertificates();
  const relatedServices = service.relatedSlugs
    .map((s) => getServiceBySlug(s))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <div className="bg-[var(--cream-light)]">
      <PageHero
        breadcrumb={service.title}
        parentBreadcrumb={{ label: 'Diensten', href: '/diensten' }}
        subtitleBadge={service.category}
        titleBefore={service.title}
        lead={service.lead}
        image={service.image}
        imageAlt={service.title}
        archPhoto
      />

      {/* Main Content (8 Columns Left) + Sticky Aside (4 Columns Right) */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left 8 Columns */}
          <div className="lg:col-span-8 space-y-16">
            {/* Wat wij doen */}
            <div>
              <SectionLabel>WAT WIJ DOEN</SectionLabel>
              <h2 className="mt-3 font-display text-[clamp(2rem,3.5vw,3rem)] font-light text-[var(--blue)]">
                Zorgvuldige inzet, afgestemd op uw locatie
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-[1.75] text-[var(--ink)]/90">
                {service.whatWeDoIntro}
              </p>

              <ul className="mt-8 space-y-3.5">
                {service.whatWeDoBullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3.5 rounded-[22px] bg-[var(--porcelain)] p-4.5 border border-[var(--line)]"
                  >
                    <span className="w-6 h-6 rounded-full bg-[var(--cream)] text-[var(--orange-ink)] inline-flex items-center justify-center shrink-0 mt-0.5">
                      <Check strokeWidth={1.75} className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[16px] leading-[1.6] text-[var(--ink)]">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Toepassingen */}
            <div className="rounded-[28px] bg-[var(--cream)] p-8 sm:p-10 border border-[var(--line)]">
              <SectionLabel>TOEPASSINGEN</SectionLabel>
              <h3 className="mt-3 font-display text-2xl sm:text-[1.75rem] font-normal text-[var(--blue)]">
                Wanneer zet u {service.title.toLowerCase()} in?
              </h3>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.applications.map((app) => (
                  <div
                    key={app}
                    className="rounded-[20px] bg-[var(--porcelain)] p-5 border border-[var(--line)] flex items-start gap-3"
                  >
                    <span
                      className="w-2 h-2 rounded-full bg-[var(--orange)] shrink-0 mt-2"
                      aria-hidden="true"
                    />
                    <p className="text-[15px] leading-[1.6] text-[var(--ink)]">{app}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Werkwijze Steps on the Flow Line */}
            <div>
              <SectionLabel>WERKWIJZE</SectionLabel>
              <h2 className="mt-3 font-display text-[clamp(1.85rem,3.2vw,2.75rem)] font-light text-[var(--blue)]">
                In drie heldere stappen geregeld
              </h2>

              <div className="relative mt-8 pl-8 sm:pl-10 space-y-6">
                <svg
                  viewBox="0 0 20 300"
                  fill="none"
                  className="absolute left-0 top-3 bottom-3 w-5 h-[calc(100%-24px)]"
                  aria-hidden="true"
                >
                  <path
                    d="M10 4 C 18 85, 2 165, 10 250 C 14 275, 8 290, 10 296"
                    stroke="#F4721E"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>

                {service.steps.map((step, idx) => (
                  <div
                    key={step.title}
                    className="rounded-[28px] bg-[var(--porcelain)] p-6 sm:p-7 border border-[var(--line)]"
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--orange-ink)] tabular-nums">
                      Stap 0{idx + 1}
                    </span>
                    <h3 className="mt-1 font-display text-xl sm:text-2xl text-[var(--blue)]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[16px] leading-[1.65] text-[var(--ink)]/85">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Veelgestelde vragen (FAQ) */}
            <div>
              <SectionLabel>VEELGESTELDE VRAGEN</SectionLabel>
              <h2 className="mt-3 mb-8 font-display text-[clamp(1.85rem,3.2vw,2.75rem)] font-light text-[var(--blue)]">
                Praktische antwoorden over {service.title.toLowerCase()}
              </h2>
              <FaqAccordion items={service.faqs} />
            </div>
          </div>

          {/* Right 4 Columns: Sticky Rounded --blue Panel */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="rounded-[28px] bg-[var(--blue)] text-[var(--cream)] p-7 sm:p-9 shadow-calm-lg space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--cream)]">
                <span className="w-2 h-2 rounded-full bg-[var(--ok)]" aria-hidden="true" />
                <span>Direct inzetbaar · 24/7</span>
              </div>

              <h3 className="font-display text-2xl sm:text-[2rem] font-light text-[var(--porcelain)] leading-tight">
                {service.title} aanvragen?
              </h3>

              <p className="text-[15px] leading-[1.65] text-[var(--cream)]/85">
                Vraag direct een vrijblijvende offerte aan of overleg telefonisch met onze centrale
                planning.
              </p>

              <div className="pt-1">
                <Link
                  href={`/offerte-aanvragen?dienst=${service.slug}`}
                  className="group w-full h-14 pl-6 pr-2.5 rounded-full bg-[var(--orange)] hover:bg-[var(--orange-hover)] text-[var(--ink)] font-medium text-[15px] inline-flex items-center justify-between transition-all shadow-calm"
                >
                  <span>Direct aanvragen</span>
                  <span className="w-9 h-9 rounded-full bg-[var(--ink)]/12 inline-flex items-center justify-center">
                    <ArrowUpRight
                      strokeWidth={1.25}
                      className="w-4 h-4 transition-transform duration-500 group-hover:rotate-45"
                    />
                  </span>
                </Link>
              </div>

              <div className="pt-5 border-t border-[var(--line-dark)] space-y-3">
                <div className="flex items-center gap-3 text-sm text-[var(--cream)]/90">
                  <Clock strokeWidth={1.25} className="w-4 h-4 text-[var(--orange)] shrink-0" />
                  <span>Reactie met voorstel binnen 24 uur</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[var(--cream)]/90">
                  <Phone strokeWidth={1.25} className="w-4 h-4 text-[var(--orange)] shrink-0" />
                  <a
                    href={company.phoneHref}
                    className="font-display text-xl text-[var(--porcelain)] hover:text-[var(--orange)] transition-colors tabular-nums"
                  >
                    {company.phoneDisplay}
                  </a>
                </div>
              </div>

              {obtainedCerts.length > 0 ? (
                <div className="pt-5 border-t border-[var(--line-dark)]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--cream)]/70 mb-3 flex items-center gap-1.5">
                    <ShieldCheck strokeWidth={1.25} className="w-4 h-4 text-[var(--orange)]" />
                    <span>Gecertificeerde uitvoering</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {obtainedCerts.map((cert) => (
                      <span
                        key={cert.code}
                        className="rounded-full bg-[var(--cream)] px-3.5 py-1 text-xs font-semibold text-[var(--ink)]"
                      >
                        {cert.code}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </aside>
        </div>
      </section>

      {/* Related Services Section */}
      {relatedServices.length > 0 ? (
        <section className="py-20 bg-[var(--cream)] bg-film-grain border-t border-[var(--line)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <SectionLabel>GERELATEERDE DIENSTEN</SectionLabel>
                <h2 className="mt-3 font-display text-[clamp(2rem,3.6vw,3rem)] font-light text-[var(--blue)]">
                  Vaak gecombineerd met {service.title.toLowerCase()}
                </h2>
              </div>
              <CalmButton href="/diensten" variant="tertiary">
                Alle 11 diensten
              </CalmButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {relatedServices.map((rel) => (
                <ServiceCard key={rel.slug} service={rel} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
