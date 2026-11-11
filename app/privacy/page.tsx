import type { Metadata } from 'next';
import { PageHero, SectionLabel } from '@/components/FlowElements';
import { company } from '@/src/config/company';

export const metadata: Metadata = {
  title: 'Privacyverklaring',
  description: `Privacyverklaring van ${company.name} over het zorgvuldig verwerken en beschermen van persoonsgegevens conform de AVG.`,
};

export default function PrivacyPage() {
  return (
    <div className="bg-[var(--cream-light)]">
      <PageHero
        breadcrumb="Privacyverklaring"
        titleBefore="Zorgvuldig omgaan met"
        titleItalic="uw gegevens"
        lead={`${company.name} hecht grote waarde aan de bescherming van uw persoonsgegevens. In deze privacyverklaring leest u welke gegevens wij verwerken en met welk doel.`}
      />

      <section className="max-w-[920px] mx-auto px-4 sm:px-6 pb-24">
        <div className="rounded-[28px] bg-[var(--porcelain)] border border-[var(--line)] p-8 sm:p-12 space-y-8 text-[16px] leading-[1.75] text-[var(--ink)]/90">
          <div>
            <SectionLabel>1. VERWERKINGSVERANTWOORDELIJKE</SectionLabel>
            <h2 className="mt-2 font-display text-2xl text-[var(--blue)]">
              Gegevens van {company.name}
            </h2>
            <p className="mt-2">
              {company.name}, gevestigd aan {company.address.street}, {company.address.postalCode}{' '}
              {company.address.city} (KvK: {company.kvk}), is verantwoordelijk voor de verwerking van
              persoonsgegevens zoals weergegeven in deze verklaring. Voor vragen kunt u contact
              opnemen via{' '}
              <a href={company.emailHref} className="underline text-[var(--blue)]">
                {company.email}
              </a>{' '}
              of telefonisch via{' '}
              <a href={company.phoneHref} className="underline text-[var(--blue)] tabular-nums">
                {company.phoneDisplay}
              </a>
              .
            </p>
          </div>

          <div>
            <SectionLabel>2. DOEL VAN DE VERWERKING</SectionLabel>
            <h2 className="mt-2 font-display text-2xl text-[var(--blue)]">
              Waarvoor gebruiken wij uw gegevens?
            </h2>
            <ul className="mt-3 list-disc pl-5 space-y-2">
              <li>
                <strong>Offerteaanvragen en opdrachtuitvoering:</strong> naam, organisatie,
                e-mailadres, telefoonnummer en projectlocatie om een passend voorstel op te stellen
                en de verkeersinzet uit te voeren.
              </li>
              <li>
                <strong>Opleidingsinschrijvingen:</strong> contactgegevens om deelnemers in te
                plannen en certificaten te registreren.
              </li>
              <li>
                <strong>Sollicitaties (Werken bij):</strong> naam, contactgegevens, woonplaats,
                beschikbaarheid en eventueel cv om uw sollicitatie te beoordelen en contact met u op
                te nemen.
              </li>
            </ul>
          </div>

          <div>
            <SectionLabel>3. BEWAARTERMIJNEN</SectionLabel>
            <h2 className="mt-2 font-display text-2xl text-[var(--blue)]">
              Hoe lang bewaren wij gegevens?
            </h2>
            <p className="mt-2">
              Wij bewaren uw persoonsgegevens niet langer dan strikt noodzakelijk is om de doelen te
              realiseren waarvoor uw gegevens worden verzameld. Sollicitatiegegevens worden uiterlijk
              4 weken na afronding van de sollicitatieprocedure verwijderd, tenzij u toestemming
              geeft om uw gegevens maximaal 1 jaar in portefeuille te houden.
            </p>
          </div>

          <div>
            <SectionLabel>4. UW RECHTEN (AVG)</SectionLabel>
            <h2 className="mt-2 font-display text-2xl text-[var(--blue)]">
              Inzage, correctie en verwijdering
            </h2>
            <p className="mt-2">
              U heeft het recht om uw persoonsgegevens in te zien, te corrigeren of te laten
              verwijderen. Een verzoek hiervoor kunt u sturen naar{' '}
              <a href={company.emailHref} className="underline text-[var(--blue)]">
                {company.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
