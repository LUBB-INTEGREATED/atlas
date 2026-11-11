import type { Metadata } from 'next';
import React, { Suspense } from 'react';
import { PageHero } from '@/components/FlowElements';
import { OfferteAanvragenClient } from '@/components/OfferteAanvragenClient';

export const metadata: Metadata = {
  title: 'Offerte aanvragen — Binnen 24 uur een voorstel op maat',
  description:
    'Vraag direct gecertificeerde verkeersregelaars, een verkeersplan of tijdelijke verkeersmaatregelen aan bij Atlas Holland B.V. Reactie binnen 24 uur.',
};

export default function OfferteAanvragenPage() {
  return (
    <div className="bg-[var(--cream-light)]">
      <PageHero
        breadcrumb="Offerte aanvragen"
        titleBefore="In drie stappen uw"
        titleItalic="inzet geregeld"
        lead="Selecteer de gewenste dienst en geef uw projectlocatie door. Onze planningsafdeling stuurt u binnen 24 uur een helder voorstel."
      />
      <Suspense fallback={<div className="max-w-[1320px] mx-auto px-6 py-12">Laden...</div>}>
        <OfferteAanvragenClient />
      </Suspense>
    </div>
  );
}
