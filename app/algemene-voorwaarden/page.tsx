import type { Metadata } from 'next';
import { PageHero, SectionLabel } from '@/components/FlowElements';
import { company } from '@/src/config/company';

export const metadata: Metadata = {
  title: 'Algemene voorwaarden',
  description: `Algemene voorwaarden van ${company.name} voor de inzet van verkeersregelaars, verkeersplannen, opleidingen en tijdelijke verkeersmaatregelen.`,
};

export default function AlgemeneVoorwaardenPage() {
  return (
    <div className="bg-[var(--cream-light)]">
      <PageHero
        breadcrumb="Algemene voorwaarden"
        titleBefore="Heldere afspraken"
        titleItalic="voor elk project"
        lead={`Op alle offertes, opdrachten en overeenkomsten van ${company.name} zijn onderstaande voorwaarden van toepassing.`}
      />

      <section className="max-w-[920px] mx-auto px-4 sm:px-6 pb-24">
        <div className="rounded-[28px] bg-[var(--porcelain)] border border-[var(--line)] p-8 sm:p-12 space-y-8 text-[16px] leading-[1.75] text-[var(--ink)]/90">
          <div>
            <SectionLabel>ARTIKEL 1 · TOEPASSELIJKHEID</SectionLabel>
            <h2 className="mt-2 font-display text-2xl text-[var(--blue)]">
              Algemeen kader
            </h2>
            <p className="mt-2">
              Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, offertes en
              overeenkomsten tussen {company.name} (KvK: {company.kvk}) en haar opdrachtgevers
              betreffende de inzet van beroepsverkeersregelaars, bouwportiers, veiligheidspersonen,
              verkeersplannen en tijdelijke verkeersmaatregelen.
            </p>
          </div>

          <div>
            <SectionLabel>ARTIKEL 2 · OFFERTES & PLANNING</SectionLabel>
            <h2 className="mt-2 font-display text-2xl text-[var(--blue)]">
              Totstandkoming en wijziging van diensten
            </h2>
            <p className="mt-2">
              Alle offertes van {company.name} zijn vrijblijvend en 30 dagen geldig, tenzij anders
              vermeld. Wijzigingen of annuleringen van geplande diensten kunnen tot 24 uur voor
              aanvang kosteloos worden doorgegeven via onze centrale planning ({company.phoneDisplay}
              ).
            </p>
          </div>

          <div>
            <SectionLabel>ARTIKEL 3 · UITVOERING & VEILIGHEID OP LOCATIE</SectionLabel>
            <h2 className="mt-2 font-display text-2xl text-[var(--blue)]">
              Veilige werkomgeving
            </h2>
            <p className="mt-2">
              {company.name} staat ervoor in dat ingezette medewerkers beschikken over de vereiste
              landelijke aanstellingspassen, VCA-certificering en voorgeschreven
              signalisatiekleding. Opdrachtgever draagt zorg voor tijdige informatievoorziening over
              specifieke lokale risico’s op de bouw- of werklocatie.
            </p>
          </div>

          <div>
            <SectionLabel>ARTIKEL 4 · CONTACT</SectionLabel>
            <h2 className="mt-2 font-display text-2xl text-[var(--blue)]">
              Volledige tekst opvragen
            </h2>
            <p className="mt-2">
              Wilt u een PDF-exemplaar van onze volledige leveringsvoorwaarden ontvangen? Stuur een
              bericht naar{' '}
              <a href={company.emailHref} className="underline text-[var(--blue)]">
                {company.email}
              </a>{' '}
              en wij sturen het document direct toe.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
