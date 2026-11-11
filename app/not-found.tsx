import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageHero, SectionLabel } from '@/components/FlowElements';

export default function NotFound() {
  return (
    <div className="bg-[var(--cream-light)] min-h-[70vh] flex flex-col justify-between">
      <PageHero
        breadcrumb="404 — Niet gevonden"
        titleBefore="Deze pagina is"
        titleItalic="niet beschikbaar"
        lead="De pagina die u zoekt bestaat niet meer of is verplaatst. Keer terug naar de startpagina of bekijk onze diensten."
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 pb-24 text-center">
        <div className="rounded-[28px] bg-[var(--porcelain)] border border-[var(--line)] p-8 sm:p-12 max-w-xl mx-auto shadow-calm space-y-6">
          <SectionLabel className="justify-center">ROUTE ONBEKEND</SectionLabel>
          <p className="text-[16px] leading-[1.7] text-[var(--ink)]/85">
            Zoekt u een gecertificeerde verkeersregelaar, een verkeersplan of direct contact met onze
            24/7 planning?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-[var(--orange)] hover:bg-[var(--orange-hover)] text-[var(--ink)] font-medium text-sm transition-colors shadow-sm"
            >
              <span>Naar de homepage</span>
              <ArrowUpRight strokeWidth={1.25} className="w-4 h-4" />
            </Link>
            <Link
              href="/diensten"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-[var(--blue)] text-[var(--blue)] hover:bg-[var(--blue)] hover:text-[var(--cream-light)] font-medium text-sm transition-colors"
            >
              <span>Bekijk diensten</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
