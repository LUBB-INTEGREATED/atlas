import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Calendar, Check, Clock, MapPin, Wallet } from 'lucide-react';
import { PageHero, SectionLabel } from '@/components/FlowElements';
import { JobApplicationForm } from '@/components/JobApplicationForm';
import { ATLAS_IMAGES } from '@/src/assets/images';
import { company } from '@/src/config/company';
import { getVacancyBySlug, nl } from '@/src/content/nl';

export async function generateStaticParams() {
  return nl.werkenBijPage.vacancies.map((vac) => ({
    slug: vac.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vacancy = getVacancyBySlug(slug);
  if (!vacancy) {
    return { title: 'Vacature niet gevonden' };
  }

  return {
    title: `Vacature: ${vacancy.title} (${vacancy.region})`,
    description: vacancy.summary,
  };
}

export default async function VacancyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vacancy = getVacancyBySlug(slug);

  if (!vacancy) {
    notFound();
  }

  return (
    <div className="bg-[var(--cream-light)]">
      <PageHero
        breadcrumb={vacancy.title}
        parentBreadcrumb={{ label: 'Werken bij', href: '/werken-bij' }}
        subtitleBadge={`${vacancy.region} · ${vacancy.hours}`}
        titleBefore={vacancy.title}
        lead={vacancy.intro}
        image={ATLAS_IMAGES.heroTrafficController}
        imageAlt={vacancy.title}
        archPhoto
      />

      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left 8 Columns: Wat ga je doen, Wat vragen wij, Wat bieden wij + Form */}
          <div className="lg:col-span-8 space-y-14">
            {/* Wat ga je doen */}
            <div className="rounded-[28px] bg-[var(--porcelain)] p-7 sm:p-10 border border-[var(--line)]">
              <SectionLabel>WAT GA JE DOEN?</SectionLabel>
              <h2 className="mt-3 font-display text-2xl sm:text-3xl text-[var(--blue)]">
                Jouw werkdag bij Atlas
              </h2>
              <ul className="mt-6 space-y-3.5">
                {vacancy.whatYouDo.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[16px] leading-[1.65] text-[var(--ink)]">
                    <span className="w-6 h-6 rounded-full bg-[var(--cream)] text-[var(--orange-ink)] inline-flex items-center justify-center shrink-0 mt-0.5">
                      <Check strokeWidth={1.75} className="w-3.5 h-3.5" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Wat vragen wij */}
            <div className="rounded-[28px] bg-[var(--cream)] p-7 sm:p-10 border border-[var(--line)]">
              <SectionLabel>WAT VRAGEN WIJ?</SectionLabel>
              <h2 className="mt-3 font-display text-2xl sm:text-3xl text-[var(--blue)]">
                Wie jij bent
              </h2>
              <ul className="mt-6 space-y-3.5">
                {vacancy.whatWeAsk.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[16px] leading-[1.65] text-[var(--ink)]">
                    <span className="w-6 h-6 rounded-full bg-[var(--porcelain)] text-[var(--blue)] inline-flex items-center justify-center shrink-0 mt-0.5">
                      <Check strokeWidth={1.75} className="w-3.5 h-3.5" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Wat bieden wij */}
            <div className="rounded-[28px] bg-[var(--porcelain)] p-7 sm:p-10 border border-[var(--line)]">
              <SectionLabel>WAT BIEDEN WIJ JOU?</SectionLabel>
              <h2 className="mt-3 font-display text-2xl sm:text-3xl text-[var(--blue)]">
                Hier kun je op rekenen
              </h2>
              <ul className="mt-6 space-y-3.5">
                {vacancy.whatWeOffer.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[16px] leading-[1.65] text-[var(--ink)]">
                    <span className="w-6 h-6 rounded-full bg-[var(--orange)] text-[var(--ink)] inline-flex items-center justify-center shrink-0 mt-0.5">
                      <Check strokeWidth={1.75} className="w-3.5 h-3.5" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sollicitatieformulier */}
            <div id="solliciteren" className="scroll-mt-32 pt-4">
              <JobApplicationForm defaultVacancyTitle={vacancy.title} />
            </div>
          </div>

          {/* Right 4 Columns: Rounded Sidebar (regio, uren, start, salaris) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div className="rounded-[28px] bg-[var(--blue)] text-[var(--cream)] p-7 sm:p-9 shadow-calm-lg space-y-6">
              <SectionLabel variant="onBlue">VACATURE OVERZICHT</SectionLabel>
              <h3 className="font-display text-2xl text-[var(--porcelain)]">{vacancy.title}</h3>

              <div className="space-y-4 pt-2 border-t border-[var(--line-dark)] text-sm">
                <div className="flex items-start gap-3">
                  <MapPin strokeWidth={1.25} className="w-4 h-4 text-[var(--orange)] shrink-0 mt-1" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[var(--cream)]/70">Regio</p>
                    <p className="font-medium text-[var(--porcelain)]">{vacancy.region}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock strokeWidth={1.25} className="w-4 h-4 text-[var(--orange)] shrink-0 mt-1" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[var(--cream)]/70">Uren</p>
                    <p className="font-medium text-[var(--porcelain)]">{vacancy.hours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar strokeWidth={1.25} className="w-4 h-4 text-[var(--orange)] shrink-0 mt-1" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[var(--cream)]/70">Startdatum</p>
                    <p className="font-medium text-[var(--porcelain)]">{vacancy.start}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Wallet strokeWidth={1.25} className="w-4 h-4 text-[var(--orange)] shrink-0 mt-1" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[var(--cream)]/70">Salarisindicatie</p>
                    <p className="font-medium text-[var(--porcelain)]">{vacancy.salaryIndication}</p>
                  </div>
                </div>
              </div>

              <a
                href="#solliciteren"
                className="w-full h-14 rounded-full bg-[var(--orange)] hover:bg-[var(--orange-hover)] text-[var(--ink)] font-medium text-sm inline-flex items-center justify-center transition-colors"
              >
                Direct solliciteren ↓
              </a>

              <p className="text-xs text-[var(--cream)]/80 text-center">
                Vragen over deze vacature? Mail naar{' '}
                <a href={company.jobsEmailHref} className="underline text-[var(--porcelain)]">
                  {company.jobsEmail}
                </a>
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
