import type { Metadata } from 'next';
import { PageHero } from '@/components/FlowElements';
import { ContactClient } from '@/components/ContactClient';

export const metadata: Metadata = {
  title: 'Contact — 24/7 Bereikbaar voor Planning, Advies & Spoedinzet',
  description:
    'Neem direct contact op met Atlas Holland B.V. voor het aanvragen van verkeersregelaars, verkeersplannen of een kennismaking. 24 uur per dag, 7 dagen per week bereikbaar.',
};

export default function ContactPage() {
  return (
    <div className="bg-[var(--cream-light)]">
      <PageHero
        breadcrumb="Contact"
        titleBefore="Korte lijnen,"
        titleItalic="direct contact"
        lead="Heeft u een vraag over een komend project, wilt u sparren over een verkeersplan of heeft u met spoed verkeersregelaars nodig? U spreekt bij ons direct met de planning."
      />
      <ContactClient />
    </div>
  );
}
