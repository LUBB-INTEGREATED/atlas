import type { Metadata } from 'next';
import {
  CalmButton,
  PageHero,
  RevealHeadline,
  SectionLabel,
  ServiceCard,
} from '@/components/FlowElements';
import { ATLAS_IMAGES } from '@/src/assets/images';
import { company } from '@/src/config/company';
import { nl, type ServiceCategory } from '@/src/content/nl';

export const metadata: Metadata = {
  title: 'Diensten — Verkeersregelaars, Verkeersplannen & Totaaloplossingen',
  description:
    'Ontdek alle 11 diensten van Atlas Holland B.V.: van landelijk gecertificeerde verkeersregelaars en bouwportiers tot CROW-verkeersplannen, BLVC en 24/7 calamiteiteninzet.',
};

const CATEGORY_DESCRIPTIONS: Record<ServiceCategory, { subtitle: string; intro: string }> = {
  Operationeel: {
    subtitle: 'Gecertificeerde vakmensen op straat en aan de bouwpoort',
    intro:
      'Representatieve verkeersregelaars, bouwportiers, veiligheidspersonen en begeleiders die rust en overzicht brengen op ieder kruispunt, werkvak en parkeerterrein.',
  },
  'Planning & advies': {
    subtitle: 'Doordachte voorbereiding en één vast aanspreekpunt',
    intro:
      'Van toetsbare CROW 96a/96b-verkeersplannen en BLVC-plannen tot volledige projectcoördinatie in nauwe afstemming met gemeenten en wegbeheerders.',
  },
  Totaaloplossingen: {
    subtitle: 'Materiaal, mensen en regie in één hand',
    intro:
      'Compleet ingerichte werkvakken, evenementenmobiliteit en 24/7 spoedinzet bij calamiteiten door heel Nederland.',
  },
};

export default function DienstenPage() {
  const categories: ServiceCategory[] = ['Operationeel', 'Planning & advies', 'Totaaloplossingen'];

  return (
    <div className="bg-[var(--cream-light)]">
      <PageHero
        breadcrumb="Diensten"
        titleBefore="Alles voor een veilige en"
        titleItalic="vlotte doorstroming"
        lead="Of u nu op zoek bent naar één gecertificeerde verkeersregelaar voor morgenochtend, een compleet BLVC-plan of de volledige afzetting van een meerdaags infraproject: wij regelen het van A tot Z."
        image={ATLAS_IMAGES.heroCalmRoadworks}
        imageAlt="Zorgvuldig ingericht werkvak langs een Nederlandse gracht bij zonsopkomst"
      />

      {/* Three Service Groups */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 pb-24 space-y-24 sm:space-y-32">
        {categories.map((category, groupIdx) => {
          const items = nl.services.filter((s) => s.category === category);
          const meta = CATEGORY_DESCRIPTIONS[category];

          return (
            <section
              key={category}
              id={category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
              className="pt-8 border-t border-[var(--line)]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
                <div className="lg:col-span-7">
                  <SectionLabel>
                    0{groupIdx + 1} · {category.toUpperCase()}
                  </SectionLabel>
                  <RevealHeadline
                    as="h2"
                    before={category}
                    className="mt-3 text-[clamp(2rem,4vw,3.5rem)] text-[var(--blue)]"
                  />
                  <p className="mt-2 font-display italic text-xl text-[var(--orange-ink)]">
                    {meta.subtitle}
                  </p>
                </div>
                <div className="lg:col-span-5">
                  <p className="text-[1.0625rem] leading-[1.7] text-[var(--ink)]/85">
                    {meta.intro}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {items.map((service) => (
                  <ServiceCard key={service.slug} service={service} />
                ))}
              </div>
            </section>
          );
        })}

        {/* Bottom Advisory Banner */}
        <section className="rounded-[40px] bg-[var(--cream)] border border-[var(--line)] p-8 sm:p-14 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-calm">
          <div className="max-w-2xl">
            <SectionLabel>PERSOONLIJK ADVIES</SectionLabel>
            <h2 className="mt-3 font-display text-[clamp(2rem,3.6vw,3rem)] font-light text-[var(--blue)]">
              Twijfelt u welke combinatie het beste past bij uw project?
            </h2>
            <p className="mt-3 text-[1.0625rem] leading-[1.7] text-[var(--ink)]/85">
              Onze coördinatoren denken direct met u mee over aantallen, fasering en vergunningseisen.
              Binnen 24 uur ontvangt u een helder voorstel.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <CalmButton href="/offerte-aanvragen" variant="primary">
              Offerte aanvragen
            </CalmButton>
            <CalmButton href={company.phoneHref} variant="secondary">
              Bel {company.phoneDisplay}
            </CalmButton>
          </div>
        </section>
      </div>
    </div>
  );
}
