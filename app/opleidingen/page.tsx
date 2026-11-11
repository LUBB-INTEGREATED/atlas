import type { Metadata } from 'next';
import { PageHero } from '@/components/FlowElements';
import { OpleidingenClient } from '@/components/OpleidingenClient';
import { ATLAS_IMAGES } from '@/src/assets/images';
import { nl } from '@/src/content/nl';

export const metadata: Metadata = {
  title: 'Opleidingen — Beroepsverkeersregelaar, BRL 9101, VCA & Veiligheid',
  description:
    'Praktijkgerichte veiligheidsopleidingen bij de Atlas Academie: Beroepsverkeersregelaar, BRL 9101, VCA-VOL, BHV, Agressiehantering en Veiligheidspersoon Tram.',
};

export default function OpleidingenPage() {
  return (
    <div className="bg-[var(--cream-light)]">
      <PageHero
        breadcrumb={nl.opleidingenPage.breadcrumb}
        titleBefore={nl.opleidingenPage.titleBefore}
        titleItalic={nl.opleidingenPage.titleItalic}
        lead={nl.opleidingenPage.lead}
        image={ATLAS_IMAGES.operationsSiteAccess}
        imageAlt="Praktijkgerichte opleiding en instructie bij Atlas Holland"
      />
      <OpleidingenClient />
    </div>
  );
}
