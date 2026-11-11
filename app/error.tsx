'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { RotateCcw } from 'lucide-react';
import { SectionLabel } from '@/components/FlowElements';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Router Error:', error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-24 bg-[var(--cream-light)] bg-film-grain">
      <div className="max-w-lg w-full text-center rounded-[32px] bg-[var(--porcelain)] border border-[var(--sand)] p-8 sm:p-12 shadow-calm space-y-6">
        <SectionLabel className="justify-center">TIJDELIJKE ONDERBREKING</SectionLabel>
        <h1 className="font-display text-3xl sm:text-4xl text-[var(--blue)]">
          Er ging iets mis bij het laden
        </h1>
        <p className="text-[16px] leading-[1.65] text-[var(--ink)]/85">
          Er is een onverwachte fout opgetreden bij het verwerken van deze pagina. Probeer het
          opnieuw of ga terug naar de startpagina.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-[var(--orange)] hover:bg-[var(--orange-hover)] text-[var(--ink)] font-medium text-sm transition-colors shadow-sm"
          >
            <RotateCcw strokeWidth={1.5} className="w-4 h-4" />
            <span>Opnieuw proberen</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-[var(--blue)] text-[var(--blue)] hover:bg-[var(--blue)] hover:text-[var(--cream-light)] font-medium text-sm transition-colors"
          >
            <span>Naar startpagina</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
