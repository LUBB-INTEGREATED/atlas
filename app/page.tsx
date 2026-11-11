import type { Metadata } from 'next';
import { HomePageClient } from '@/components/HomePageClient';

export const metadata: Metadata = {
  title: 'Atlas Holland B.V. — Verkeer in goede banen | Gecertificeerde Verkeersregelaars',
  description:
    'Gecertificeerde verkeersregelaars en complete verkeersoplossingen voor infra, bouw, evenementen en calamiteiten. Landelijk inzetbaar en 24/7 bereikbaar.',
};

export default function HomePage() {
  return <HomePageClient />;
}
