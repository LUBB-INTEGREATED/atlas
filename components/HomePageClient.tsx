'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
} from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  HeartHandshake,
  Phone,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import {
  ArchImage,
  CALM_EASE,
  CalmButton,
  RevealHeadline,
  SectionLabel,
  ServiceCard,
} from './FlowElements';
import { HeroVideoClean } from './HeroVideoClean';
import { ATLAS_IMAGES } from '@/src/assets/images';
import { company, getObtainedCertificates } from '@/src/config/company';
import { nl, type ServiceCategory } from '@/src/content/nl';

export function HomePageClient() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ['start start', 'end end'],
  });

  // Hero Parallax
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const yVideo = useTransform(heroScroll, [0, 1], [0, 28]);

  // Services Segmented Control & Carousel
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('Operationeel');
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [carouselProgress, setCarouselProgress] = useState(0.33);

  const filteredServices = nl.services.filter((s) => s.category === activeCategory);

  const handleCarouselScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setCarouselProgress(1);
    } else {
      const ratio = Math.min(1, Math.max(0.15, (el.scrollLeft + el.clientWidth * 0.35) / el.scrollWidth));
      setCarouselProgress(ratio);
    }
  };

  const scrollCarousel = (dir: 'prev' | 'next') => {
    const el = carouselRef.current;
    if (!el) return;
    const delta = dir === 'next' ? 380 : -380;
    el.scrollBy({ left: delta, behavior: 'smooth' });
  };

  // Werkwijze Sticky Scroll Storytelling
  const werkwijzeRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: werkwijzeProgress } = useScroll({
    target: werkwijzeRef,
    offset: ['start center', 'end center'],
  });
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    return werkwijzeProgress.on('change', (v) => {
      if (v < 0.36) setActiveStep(0);
      else if (v < 0.68) setActiveStep(1);
      else setActiveStep(2);
    });
  }, [werkwijzeProgress]);

  // Voor wie Bento Grid active card for keyboard/touch
  const [activeAudience, setActiveAudience] = useState<number | null>(0);

  // Landelijk Map active region tooltip
  const [selectedRegion, setSelectedRegion] = useState<string>('Randstad & Utrecht');

  // Testimonials index (if populated in config)
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const obtainedCertificates = getObtainedCertificates();

  return (
    <div ref={pageRef} className="relative overflow-x-clip">
      {/* Continuous Page-Wide Background SVG Flow Line */}
      <svg
        viewBox="0 0 1440 5600"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[460px] w-full h-[calc(100%-520px)] z-0 opacity-75"
      >
        <path
          d="M -60 120 C 360 20, 1080 280, 1500 140 C 1100 540, 240 680, 220 1120 C 200 1560, 1180 1740, 1160 2240 C 1140 2740, 260 2960, 300 3480 C 340 4000, 1140 4220, 1080 4720 C 1020 5120, 720 5340, 720 5540"
          stroke="rgba(77, 96, 128, 0.12)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <motion.path
          d="M -60 120 C 360 20, 1080 280, 1500 140 C 1100 540, 240 680, 220 1120 C 200 1560, 1180 1740, 1160 2240 C 1140 2740, 260 2960, 300 3480 C 340 4000, 1140 4220, 1080 4720 C 1020 5120, 720 5340, 720 5540"
          stroke="#F4721E"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ pathLength: scrollYProgress }}
        />
      </svg>

      {/* =====================================================================
          1. HERO (cream-light) — CLEAN VIDEO BASED FIRST
      ===================================================================== */}
      <section
        ref={heroRef}
        className="relative z-10 pt-32 sm:pt-40 lg:pt-44 pb-16 sm:pb-24 lg:pb-28 bg-[var(--cream-light)] bg-film-grain overflow-hidden"
      >
        {/* Subtle Decorative Flow Line in the background */}
        <svg
          viewBox="0 0 1440 480"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute top-28 sm:top-24 left-0 w-full h-[360px] sm:h-[440px] z-0 opacity-80"
        >
          <motion.path
            d="M -60 180 C 280 40, 580 320, 920 160 C 1180 40, 1340 220, 1500 130"
            stroke="#F4721E"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.8, delay: 0.2, ease: CALM_EASE }}
          />
        </svg>

        <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6">
          {/* Centered Calm Typography */}
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: CALM_EASE }}
            >
              <SectionLabel>{nl.hero.kicker}</SectionLabel>
            </motion.div>

            <RevealHeadline
              as="h1"
              before={nl.hero.headlineBefore}
              italic={nl.hero.headlineItalic}
              after={nl.hero.headlineAfter}
              className="mt-4 sm:mt-5 text-[clamp(2.75rem,7vw,6.5rem)] text-[var(--blue)] font-display font-light leading-[1.04]"
            />

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: CALM_EASE }}
              className="mt-5 sm:mt-6 text-[1.125rem] sm:text-[1.25rem] leading-[1.65] text-[var(--ink)]/85 max-w-2xl font-sans"
            >
              {nl.hero.lead}
            </motion.p>

            {/* Clean Action Row: Primary Quote + Secondary Services + Direct Phone */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.32, ease: CALM_EASE }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4"
            >
              <CalmButton href="/offerte-aanvragen" variant="primary">
                {nl.hero.primaryCta}
              </CalmButton>
              <CalmButton href="/diensten" variant="secondary">
                {nl.hero.secondaryCta}
              </CalmButton>
              <a
                href={company.phoneHref}
                className="inline-flex items-center gap-2.5 h-14 px-6 rounded-full border border-[var(--sand)] bg-[var(--porcelain)]/80 hover:bg-[var(--cream)] text-[var(--ink)] font-medium text-[15px] transition-all shadow-sm group"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--ok)] animate-pulse shrink-0" aria-hidden="true" />
                <span className="text-[var(--blue)] group-hover:text-[var(--ink)] transition-colors">
                  {company.phoneDisplay}
                </span>
                <span className="text-xs text-[var(--blue)]/70 hidden sm:inline">· 24/7 bereikbaar</span>
              </a>
            </motion.div>
          </div>

          {/* Grand Clean Video Centerpiece */}
          <motion.div
            style={{ y: yVideo }}
            initial={{ opacity: 0, scale: 0.98, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: CALM_EASE }}
            className="mt-12 sm:mt-16 lg:mt-20 max-w-[1240px] mx-auto"
          >
            <HeroVideoClean />
          </motion.div>

          {/* Under-Video Calm Trust Markers — Clear, unboxed, uncluttered */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.55, ease: CALM_EASE }}
            className="mt-10 sm:mt-12 max-w-4xl mx-auto pt-6 border-t border-[var(--sand)]/60 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center"
          >
            <div className="flex items-center justify-center sm:justify-start gap-3 text-left">
              <div className="w-9 h-9 rounded-full bg-[var(--cream)] border border-[var(--sand)] flex items-center justify-center shrink-0 text-[var(--blue)]">
                <ShieldCheck className="w-4 h-4" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-semibold text-sm text-[var(--ink)]">145+ Beroepsregelaars</p>
                <p className="text-xs text-[var(--blue)]">Volledig gecertificeerd & VCA</p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-center gap-3 text-left">
              <div className="w-9 h-9 rounded-full bg-[var(--cream)] border border-[var(--sand)] flex items-center justify-center shrink-0 text-[var(--blue)]">
                <Clock className="w-4 h-4" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-semibold text-sm text-[var(--ink)]">Snelle inzet</p>
                <p className="text-xs text-[var(--blue)]">Binnen 24 uur geregeld</p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-end gap-3 text-left">
              <div className="w-9 h-9 rounded-full bg-[var(--cream)] border border-[var(--sand)] flex items-center justify-center shrink-0 text-[var(--blue)]">
                <Phone className="w-4 h-4" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-semibold text-sm text-[var(--ink)]">Landelijk actief</p>
                <p className="text-xs text-[var(--blue)]">24/7 bereikbaar voor spoed</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gentle Curved Section Transition */}
      <CurvedSectionDivider fill="#F5EDE4" nextFill="#E9D9CA" />

      {/* =====================================================================
          2. INTRO STATEMENT (Inline Pill Images + Scroll Word Highlight)
      ===================================================================== */}
      <IntroStatementSection />

      <CurvedSectionDivider fill="#E9D9CA" nextFill="#F5EDE4" />

      {/* =====================================================================
          3. DIENSTEN (Segmented Control + Draggable/Scrollable Arch Carousel)
      ===================================================================== */}
      <section className="relative z-10 py-[clamp(96px,12vw,160px)] bg-[var(--cream-light)] bg-film-grain">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <SectionLabel>{nl.homeServices.label}</SectionLabel>
              <RevealHeadline
                as="h2"
                before="Alles voor een"
                italic="veilige werkplek"
                className="mt-4 text-[clamp(2.25rem,4.5vw,4rem)] text-[var(--blue)]"
              />
            </div>

            {/* Pill Segmented Control */}
            <div
              role="tablist"
              aria-label="Filter diensten per categorie"
              className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-full bg-[var(--cream)] border border-[var(--line)] self-start lg:self-auto"
            >
              {nl.homeServices.categories.map((category) => {
                const active = activeCategory === category;
                return (
                  <button
                    key={category}
                    role="tab"
                    type="button"
                    aria-selected={active}
                    onClick={() => {
                      setActiveCategory(category);
                      if (carouselRef.current) {
                        carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                      }
                    }}
                    className={`h-11 px-5 rounded-full text-[14px] font-medium transition-all duration-500 whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[var(--porcelain)] text-[var(--ink)] shadow-sm'
                        : 'text-[var(--blue)] hover:text-[var(--ink)]'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Horizontal Carousel of Service Cards */}
          <div
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            className="mt-12 flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredServices.map((srv, idx) => (
                <motion.div
                  key={srv.slug}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.65, delay: idx * 0.08, ease: CALM_EASE }}
                  className="w-[85vw] sm:w-[360px] lg:w-[390px] shrink-0 snap-start"
                >
                  <ServiceCard service={srv} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Carousel Controls + Progress Line + Link "Alle 11 diensten" */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4 flex-1 max-w-md">
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => scrollCarousel('prev')}
                  aria-label="Vorige dienst"
                  className="w-12 h-12 rounded-full border border-[var(--line)] bg-[var(--porcelain)] hover:bg-[var(--cream)] text-[var(--blue)] inline-flex items-center justify-center transition-colors"
                >
                  <ArrowLeft strokeWidth={1.25} className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollCarousel('next')}
                  aria-label="Volgende dienst"
                  className="w-12 h-12 rounded-full border border-[var(--line)] bg-[var(--porcelain)] hover:bg-[var(--cream)] text-[var(--blue)] inline-flex items-center justify-center transition-colors"
                >
                  <ArrowRight strokeWidth={1.25} className="w-5 h-5" />
                </button>
              </div>

              {/* Thin progress line */}
              <div className="h-[2px] flex-1 bg-[var(--sand)] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--orange)] rounded-full"
                  animate={{ width: `${Math.round(carouselProgress * 100)}%` }}
                  transition={{ duration: 0.4, ease: CALM_EASE }}
                />
              </div>
            </div>

            <CalmButton href="/diensten" variant="tertiary">
              {nl.homeServices.allLinkLabel}
            </CalmButton>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. WERKWIJZE (Floating --blue Section, 40px radius, Sticky Scroll)
      ===================================================================== */}
      <section ref={werkwijzeRef} className="relative z-10 px-4 sm:px-6 py-6">
        <div className="max-w-[1400px] mx-auto rounded-[40px] bg-[var(--blue)] text-[var(--cream)] py-[clamp(80px,10vw,140px)] px-6 sm:px-12 lg:px-16 shadow-calm-lg">
          <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: 3 Steps connected by the curved flow line */}
            <div className="lg:col-span-6 space-y-10">
              <div>
                <SectionLabel variant="onBlue">{nl.werkwijze.label}</SectionLabel>
                <RevealHeadline
                  as="h2"
                  before={nl.werkwijze.headingBefore}
                  italic={nl.werkwijze.headingItalic}
                  className="mt-4 text-[clamp(2.25rem,4.5vw,4rem)] text-[var(--cream)]"
                />
                <p className="mt-4 text-[1.125rem] leading-[1.65] text-[var(--cream)]/85 max-w-xl">
                  {nl.werkwijze.lead}
                </p>
              </div>

              <div className="relative pl-8 sm:pl-10 space-y-8">
                {/* Vertical curved flow line connecting the 3 steps */}
                <svg
                  viewBox="0 0 24 420"
                  fill="none"
                  className="absolute left-0 top-3 bottom-3 w-6 h-[calc(100%-24px)]"
                  aria-hidden="true"
                >
                  <path
                    d="M12 4 C 22 110, 2 210, 12 310 C 18 365, 10 395, 12 416"
                    stroke="rgba(233, 217, 202, 0.22)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <motion.path
                    d="M12 4 C 22 110, 2 210, 12 310 C 18 365, 10 395, 12 416"
                    stroke="#F4721E"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    animate={{
                      pathLength: activeStep === 0 ? 0.33 : activeStep === 1 ? 0.68 : 1,
                    }}
                    transition={{ duration: 0.7, ease: CALM_EASE }}
                  />
                </svg>

                {nl.werkwijze.steps.map((step, index) => {
                  const isCurrent = activeStep === index;
                  return (
                    <button
                      key={step.number}
                      type="button"
                      onClick={() => setActiveStep(index)}
                      className={`w-full text-left rounded-[28px] p-6 sm:p-7 transition-all duration-700 border ${
                        isCurrent
                          ? 'bg-[var(--blue-deep)]/85 border-[var(--cream)]/30 shadow-calm'
                          : 'bg-transparent border-[var(--line-dark)] opacity-70 hover:opacity-95'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--orange)] tabular-nums">
                          Stap {step.number} · {step.subtitle}
                        </span>
                        <span
                          className={`w-2.5 h-2.5 rounded-full transition-colors ${
                            isCurrent ? 'bg-[var(--orange)]' : 'bg-[var(--cream)]/30'
                          }`}
                        />
                      </div>
                      <h3 className="mt-2 font-display text-2xl sm:text-[1.75rem] font-normal text-[var(--porcelain)]">
                        {step.title}
                      </h3>
                      <p className="mt-2.5 text-[16px] leading-[1.7] text-[var(--cream)]/85">
                        {step.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Sticky Large Arch Image that crossfades per step */}
            <div className="lg:col-span-6 lg:sticky lg:top-28">
              <div className="relative aspect-[3/3.8] w-full max-w-lg mx-auto overflow-hidden rounded-t-[999px] rounded-b-[28px] bg-[var(--blue-deep)] border border-[var(--line-dark)] shadow-calm-lg">
                <AnimatePresence mode="wait">
                  {/* TODO: replace with real Atlas photo */}
                  <motion.img
                    key={nl.werkwijze.steps[activeStep].number}
                    src={nl.werkwijze.steps[activeStep].image}
                    alt={`${nl.werkwijze.steps[activeStep].title} — ${nl.werkwijze.steps[activeStep].subtitle}`}
                    referrerPolicy="no-referrer"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.75, ease: CALM_EASE }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 bg-gradient-to-t from-[var(--blue-deep)]/90 via-[var(--blue-deep)]/45 to-transparent">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--orange)]">
                    0{activeStep + 1} / 03 · {nl.werkwijze.steps[activeStep].subtitle}
                  </p>
                  <p className="mt-1 font-display text-2xl text-[var(--porcelain)]">
                    {nl.werkwijze.steps[activeStep].title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. IN CIJFERS (Cream, 4 Large Fraunces Numbers with Count-Up)
      ===================================================================== */}
      {company.stats.length > 0 ? (
        <section className="relative z-10 py-[clamp(88px,10vw,148px)] bg-[var(--cream-light)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
            <SectionLabel>{nl.inCijfers.label}</SectionLabel>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[var(--line)] border-y border-[var(--line)]">
              {company.stats.map((stat, idx) => (
                <StatCounterItem key={stat.label} stat={stat} index={idx} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* =====================================================================
          6. VOOR WIE (Bento Grid of 4 Rounded Image Tiles)
      ===================================================================== */}
      <section className="relative z-10 py-[clamp(96px,11vw,160px)] bg-[var(--cream)] bg-film-grain">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <SectionLabel>{nl.voorWie.label}</SectionLabel>
            <RevealHeadline
              as="h2"
              before={nl.voorWie.headingBefore}
              italic={nl.voorWie.headingItalic}
              className="mt-4 text-[clamp(2.25rem,4.5vw,4rem)] text-[var(--blue)]"
            />
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {nl.voorWie.audiences.map((aud, idx) => {
              const isExpanded = activeAudience === idx;
              return (
                <motion.div
                  key={aud.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-8% 0px' }}
                  transition={{ duration: 0.75, delay: idx * 0.08, ease: CALM_EASE }}
                  onMouseEnter={() => setActiveAudience(idx)}
                  onFocus={() => setActiveAudience(idx)}
                  tabIndex={0}
                  className={`${aud.spanClass} group relative min-h-[380px] sm:min-h-[430px] rounded-[28px] overflow-hidden border border-[var(--line)] shadow-calm flex flex-col justify-end outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)]`}
                >
                  {/* Background image */}
                  {/* TODO: replace with real Atlas photo */}
                  <img
                    src={aud.image}
                    alt={aud.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />

                  {/* Soft blue gradient scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--blue-deep)]/95 via-[var(--blue-deep)]/55 to-transparent transition-opacity duration-500" />

                  <div className="relative z-10 p-7 sm:p-9 text-[var(--cream)]">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-display text-2xl sm:text-[2rem] font-normal text-[var(--porcelain)]">
                        {aud.title}
                      </h3>
                      <span className="w-10 h-10 rounded-full bg-[var(--porcelain)]/15 backdrop-blur-sm text-[var(--porcelain)] inline-flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:bg-[var(--orange)] group-hover:text-[var(--ink)]">
                        <ArrowUpRight strokeWidth={1.25} className="w-5 h-5" />
                      </span>
                    </div>

                    <p className="mt-2 text-[15.5px] text-[var(--cream)]/90 max-w-xl">
                      {aud.subtitle}
                    </p>

                    <motion.div
                      initial={false}
                      animate={{
                        height: isExpanded ? 'auto' : 0,
                        opacity: isExpanded ? 1 : 0,
                        marginTop: isExpanded ? 20 : 0,
                      }}
                      transition={{ duration: 0.55, ease: CALM_EASE }}
                      className="overflow-hidden"
                    >
                      <ul className="space-y-2 border-t border-[var(--line-dark)] pt-4">
                        {aud.checks.map((check) => (
                          <li key={check} className="flex items-start gap-2.5 text-sm text-[var(--porcelain)]">
                            <Check
                              strokeWidth={1.5}
                              className="w-4 h-4 text-[var(--orange)] shrink-0 mt-0.5"
                            />
                            <span>{check}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="pt-4">
                        <Link
                          href={aud.href}
                          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--orange)] hover:underline"
                        >
                          <span>Meer over deze inzet</span>
                          <ArrowUpRight strokeWidth={1.25} className="w-4 h-4" />
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CurvedSectionDivider fill="#E9D9CA" nextFill="#F5EDE4" />

      {/* =====================================================================
          7. WAAROM ATLAS (Split Layout: Glossy 3D Still Life + 4 Values)
      ===================================================================== */}
      <section className="relative z-10 py-[clamp(96px,12vw,160px)] bg-[var(--cream-light)] bg-film-grain">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Large Glossy 3D Still Life */}
            <div className="lg:col-span-5">
              <ArchImage
                src={ATLAS_IMAGES.stillLifeConePlinth}
                alt="Stilleven van verkeersveiligheid: oranje verkeerskegel en blauwe afzetting onder een crèmekleurige boog"
                aspectClass="aspect-[3/4]"
                className="shadow-calm-lg border border-[var(--line)]"
              />
            </div>

            {/* Right: Headline + 4 Core Values */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <SectionLabel>{nl.waaromAtlas.label}</SectionLabel>
                <RevealHeadline
                  as="h2"
                  before={nl.waaromAtlas.headingBefore}
                  italic={nl.waaromAtlas.headingItalic}
                  className="mt-4 text-[clamp(2.25rem,4.2vw,3.75rem)] text-[var(--blue)]"
                />
                <p className="mt-5 text-[1.15rem] leading-[1.65] text-[var(--ink)]/85 max-w-2xl">
                  {nl.waaromAtlas.lead}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                {nl.waaromAtlas.values.map((val, idx) => {
                  const icons = [Clock, ShieldCheck, UserCheck, HeartHandshake];
                  const IconComponent = icons[idx % icons.length];
                  return (
                    <motion.div
                      key={val.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: idx * 0.08, ease: CALM_EASE }}
                      className="rounded-[28px] bg-[var(--porcelain)] p-6 border border-[var(--line)]"
                    >
                      <div className="w-12 h-12 rounded-full bg-[var(--cream)] text-[var(--blue)] flex items-center justify-center">
                        <IconComponent strokeWidth={1.25} className="w-5 h-5" />
                      </div>
                      <h3 className="mt-4 font-display text-[1.4rem] font-normal text-[var(--blue)]">
                        {val.title}
                      </h3>
                      <p className="mt-2 text-[15px] leading-[1.65] text-[var(--ink)]/80">
                        {val.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          8. LANDELIJK INZETBAAR (Outline Map of the Netherlands + 24/7 Phone)
      ===================================================================== */}
      <section className="relative z-10 py-[clamp(96px,11vw,150px)] bg-[var(--cream)] bg-film-grain">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <SectionLabel>{nl.landelijk.label}</SectionLabel>
              <RevealHeadline
                as="h2"
                before={nl.landelijk.headingBefore}
                italic={nl.landelijk.headingItalic}
                className="text-[clamp(2.25rem,4.5vw,4rem)] text-[var(--blue)]"
              />
              <p className="text-[1.1rem] leading-[1.7] text-[var(--ink)]/85 max-w-xl">
                {nl.landelijk.description}
              </p>

              {/* Active Region Selector Pills */}
              <div className="pt-2 flex flex-wrap gap-2">
                {nl.landelijk.regions.map((reg) => {
                  const active = selectedRegion === reg.name;
                  return (
                    <button
                      key={reg.name}
                      type="button"
                      onClick={() => setSelectedRegion(reg.name)}
                      className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                        active
                          ? 'bg-[var(--blue)] text-[var(--porcelain)]'
                          : 'bg-[var(--porcelain)] text-[var(--blue)] hover:bg-[var(--cream-light)]'
                      }`}
                    >
                      {reg.name}
                    </button>
                  );
                })}
              </div>

              {/* 24/7 Phone Number in Fraunces */}
              <div className="pt-6 border-t border-[var(--line)]">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--blue)]">
                  {nl.landelijk.phoneLabel}
                </p>
                <a
                  href={company.phoneHref}
                  className="mt-2 inline-flex items-center gap-3 font-display text-[clamp(2rem,4vw,3.25rem)] font-light text-[var(--ink)] hover:text-[var(--orange-ink)] transition-colors tabular-nums"
                >
                  <span>{company.phoneDisplay}</span>
                  <ArrowUpRight strokeWidth={1.25} className="w-7 h-7 text-[var(--orange-ink)]" />
                </a>
              </div>
            </div>

            {/* Right: Soft Outline Map of the Netherlands in --blue with orange region markers */}
            <div className="lg:col-span-6">
              <div className="relative aspect-square max-w-[480px] mx-auto rounded-[40px] bg-[var(--porcelain)] border border-[var(--line)] p-8 sm:p-10 shadow-calm flex items-center justify-center">
                <svg
                  viewBox="0 0 100 115"
                  fill="none"
                  className="w-full h-full"
                  role="img"
                  aria-label="Kaart van Nederland met landelijke steunpunten van Atlas Holland B.V."
                >
                  {/* Stylized soft curved contour of the Netherlands */}
                  <path
                    d="M58 10 C68 9, 76 14, 77 24 C78 33, 74 42, 76 51 C78 60, 72 69, 67 77 C64 82, 68 92, 62 99 C57 104, 52 96, 51 89 C49 82, 41 81, 32 82 C23 83, 18 77, 22 70 C26 63, 31 58, 33 50 C35 42, 39 33, 43 25 C46 19, 51 11, 58 10 Z"
                    fill="rgba(77, 96, 128, 0.07)"
                    stroke="#4D6080"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Subtle internal river/flow lines */}
                  <path
                    d="M25 65 C42 63, 56 58, 73 59"
                    stroke="rgba(77, 96, 128, 0.25)"
                    strokeWidth="0.9"
                    strokeLinecap="round"
                  />
                  <path
                    d="M46 52 C48 39, 54 32, 60 24"
                    stroke="rgba(77, 96, 128, 0.22)"
                    strokeWidth="0.9"
                    strokeLinecap="round"
                  />

                  {/* Regional Points */}
                  {nl.landelijk.regions.map((region) => {
                    const isSelected = selectedRegion === region.name;
                    return (
                      <g
                        key={region.name}
                        className="cursor-pointer"
                        onClick={() => setSelectedRegion(region.name)}
                      >
                        <circle
                          cx={region.x}
                          cy={region.y}
                          r={isSelected ? 6.5 : 4.2}
                          fill="rgba(244, 114, 30, 0.22)"
                        />
                        <circle
                          cx={region.x}
                          cy={region.y}
                          r={isSelected ? 3.2 : 2.3}
                          fill="#F4721E"
                        />
                      </g>
                    );
                  })}
                </svg>

                <div className="absolute bottom-6 left-6 right-6 rounded-full bg-[var(--cream-light)]/90 backdrop-blur-md border border-[var(--line)] px-5 py-3 flex items-center justify-between text-xs">
                  <span className="font-semibold text-[var(--blue)]">Actieve regio:</span>
                  <span className="font-medium text-[var(--ink)]">{selectedRegion}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          9. KWALITEIT (Row of Obtained Certificate Pills, Centred)
      ===================================================================== */}
      {obtainedCertificates.length > 0 ? (
        <section className="relative z-10 py-20 sm:py-28 bg-[var(--cream-light)]">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-6 text-center">
            <SectionLabel className="justify-center">{nl.kwaliteit.label}</SectionLabel>
            <h2 className="mt-4 font-display text-[clamp(2rem,3.6vw,3.25rem)] font-light text-[var(--blue)]">
              {nl.kwaliteit.heading}
            </h2>
            <p className="mt-3 text-[1.0625rem] text-[var(--ink)]/80 max-w-xl mx-auto">
              {nl.kwaliteit.description}
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
              {obtainedCertificates.map((cert) => (
                <div
                  key={cert.code}
                  className="inline-flex items-center gap-2.5 rounded-full bg-[var(--cream)] border border-[var(--line)] px-6 py-3 text-[15px] text-[var(--blue)] shadow-sm"
                >
                  <span className="font-semibold text-[var(--ink)]">{cert.code}</span>
                  <span aria-hidden="true">·</span>
                  <span>{cert.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* =====================================================================
          10. ERVARINGEN & CLIENT LOGOS
          (Automatically hides when company.testimonials & company.clientLogos are empty)
      ===================================================================== */}
      {company.testimonials.length > 0 || company.clientLogos.length > 0 ? (
        <section className="relative z-10 py-24 bg-[var(--cream-light)] border-t border-[var(--line)]">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-6 text-center">
            {company.testimonials.length > 0 ? (
              <div>
                <SectionLabel className="justify-center">ERVARINGEN</SectionLabel>
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={testimonialIdx}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.6, ease: CALM_EASE }}
                    className="mt-8 font-display text-[clamp(1.75rem,3.5vw,3rem)] font-light text-[var(--blue)] max-w-4xl mx-auto"
                  >
                    “{company.testimonials[testimonialIdx].quote}”
                    <footer className="mt-6 font-sans text-sm font-medium text-[var(--ink)]/80">
                      {company.testimonials[testimonialIdx].author} ·{' '}
                      {company.testimonials[testimonialIdx].role},{' '}
                      {company.testimonials[testimonialIdx].organization}
                    </footer>
                  </motion.blockquote>
                </AnimatePresence>
                {company.testimonials.length > 1 ? (
                  <div className="mt-8 flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setTestimonialIdx(
                          (prev) =>
                            (prev - 1 + company.testimonials.length) % company.testimonials.length
                        )
                      }
                      aria-label="Vorige ervaring"
                      className="w-11 h-11 rounded-full border border-[var(--line)] inline-flex items-center justify-center text-[var(--blue)]"
                    >
                      <ArrowLeft strokeWidth={1.25} className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setTestimonialIdx((prev) => (prev + 1) % company.testimonials.length)
                      }
                      aria-label="Volgende ervaring"
                      className="w-11 h-11 rounded-full border border-[var(--line)] inline-flex items-center justify-center text-[var(--blue)]"
                    >
                      <ArrowRight strokeWidth={1.25} className="w-4 h-4" />
                    </button>
                  </div>
                ) : null}
              </div>
            ) : null}

            {company.clientLogos.length > 0 ? (
              <div className="mt-14 flex flex-wrap items-center justify-center gap-10 opacity-60 text-[var(--blue)]">
                {company.clientLogos.map((logo) => (
                  <span key={logo.name} className="font-display text-xl">
                    {logo.name}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* =====================================================================
          11. WERKEN BIJ (Floating --orange Section, 40px radius, --ink text)
      ===================================================================== */}
      <section className="relative z-10 px-4 sm:px-6 py-8">
        <div className="max-w-[1360px] mx-auto rounded-[40px] bg-[var(--orange)] text-[var(--ink)] p-8 sm:p-14 lg:p-20 shadow-calm-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7 space-y-6">
              <SectionLabel variant="onOrange">{nl.werkenBijBanner.label}</SectionLabel>
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light text-[var(--ink)]">
                {nl.werkenBijBanner.heading}
              </h2>
              <p className="text-[1.2rem] leading-[1.6] text-[var(--ink)]/90 max-w-xl">
                {nl.werkenBijBanner.lead}
              </p>

              {/* 3 Benefits */}
              <div className="flex flex-wrap gap-3 pt-2">
                {nl.werkenBijBanner.benefits.map((benefit) => (
                  <span
                    key={benefit}
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--porcelain)]/85 px-5 py-2.5 text-sm font-semibold text-[var(--ink)]"
                  >
                    <Check strokeWidth={1.5} className="w-4 h-4 text-[var(--ink)]" />
                    <span>{benefit}</span>
                  </span>
                ))}
              </div>

              <div className="pt-4">
                <CalmButton href="/werken-bij" variant="dark">
                  {nl.werkenBijBanner.cta}
                </CalmButton>
              </div>
            </div>

            {/* Arch photo of a smiling team member */}
            <div className="lg:col-span-5">
              <ArchImage
                src={ATLAS_IMAGES.operationsSiteAccess}
                alt="Glimlachende collega van Atlas Holland op locatie"
                aspectClass="aspect-[4/4.5]"
                className="max-w-md mx-auto shadow-calm border border-[var(--ink)]/15"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          12. CLOSING CTA (Cream, Centred H2, Primary Button, Display Phone)
      ===================================================================== */}
      <section className="relative z-10 py-[clamp(96px,12vw,160px)] bg-[var(--cream-light)] text-center">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 flex flex-col items-center">
          <SectionLabel className="justify-center">{nl.closingCta.label}</SectionLabel>
          <RevealHeadline
            as="h2"
            before="Verkeersregelaars"
            italic="nodig?"
            className="mt-4 text-[clamp(2.75rem,5.5vw,5rem)] text-[var(--blue)]"
          />
          <p className="mt-4 text-[1.2rem] leading-[1.6] text-[var(--ink)]/85 max-w-xl">
            {nl.closingCta.lead}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <CalmButton href="/offerte-aanvragen" variant="primary">
              {nl.closingCta.buttonLabel}
            </CalmButton>
            <CalmButton href="/contact" variant="secondary">
              Contact opnemen
            </CalmButton>
          </div>

          <div className="mt-12 pt-10 border-t border-[var(--line)] w-full max-w-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--blue)]">
              Of bel direct met onze 24/7 planning
            </p>
            <a
              href={company.phoneHref}
              className="mt-3 inline-flex items-center gap-3 font-display text-[clamp(2.25rem,5vw,4rem)] font-light text-[var(--blue)] hover:text-[var(--ink)] transition-colors tabular-nums"
            >
              <Phone strokeWidth={1.25} className="w-7 h-7 text-[var(--orange-ink)]" />
              <span>{company.phoneDisplay}</span>
            </a>
          </div>

          {/* The flow line ends here in a soft curve */}
          <svg
            viewBox="0 0 260 70"
            fill="none"
            className="mt-8 w-56 h-16"
            aria-hidden="true"
          >
            <motion.path
              d="M130 2 C 130 34, 65 42, 95 58 C 122 68, 158 52, 130 64"
              stroke="#F4721E"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: CALM_EASE }}
            />
            <circle cx="130" cy="64" r="4" fill="#F4721E" />
          </svg>
        </div>
      </section>
    </div>
  );
}

/**
 * Intro Statement Section:
 * Large Fraunces paragraph (≈ 2.5rem) centred with inline pill images,
 * fading from --sand to --blue as the user scrolls through it.
 */
function IntroStatementSection() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'end 45%'],
  });

  const color1 = useTransform(scrollYProgress, [0, 0.45], ['#B9A38E', '#4D6080']);
  const color2 = useTransform(scrollYProgress, [0.25, 0.75], ['#B9A38E', '#4D6080']);
  const color3 = useTransform(scrollYProgress, [0.5, 1], ['#B9A38E', '#4D6080']);

  return (
    <section
      ref={ref}
      className="relative z-10 py-[clamp(96px,12vw,168px)] bg-[var(--cream)] bg-film-grain"
    >
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 text-center">
        <p className="font-display font-light text-[clamp(1.85rem,3.6vw,3.1rem)] leading-[1.28] tracking-[-0.02em]">
          <motion.span style={{ color: color1 }}>{nl.introStatement.part1} </motion.span>
          <span className="inline-flex items-center align-middle mx-2 my-1 w-24 sm:w-32 h-11 sm:h-14 rounded-full overflow-hidden border border-[var(--line)] shadow-sm bg-[var(--porcelain)]">
            {/* TODO: replace with real Atlas photo */}
            <img
              src={ATLAS_IMAGES.heroCalmRoadworks}
              alt="Verkeersplan en werkvak"
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </span>
          <motion.span style={{ color: color2 }}> {nl.introStatement.part2} </motion.span>
          <span className="inline-flex items-center align-middle mx-2 my-1 w-24 sm:w-32 h-11 sm:h-14 rounded-full overflow-hidden border border-[var(--line)] shadow-sm bg-[var(--porcelain)]">
            {/* TODO: replace with real Atlas photo */}
            <img
              src={ATLAS_IMAGES.heroTrafficController}
              alt="Verkeersregelaar op locatie"
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </span>
          <motion.span style={{ color: color3 }} className="italic font-normal">
            {' '}
            {nl.introStatement.part3}
          </motion.span>
        </p>
      </div>
    </section>
  );
}

/**
 * Stat Counter Item with smooth count-up when entering the viewport
 */
function StatCounterItem({
  stat,
  index,
}: {
  stat: (typeof company.stats)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let startTimestamp: number | null = null;
    const duration = prefersReducedMotion ? 1 : 1100;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * stat.value));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    const rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.08, ease: CALM_EASE }}
      className="py-10 px-6 sm:px-8 flex flex-col justify-between"
    >
      <div className="font-display font-light text-[clamp(3rem,5vw,4.75rem)] text-[var(--blue)] tabular-nums leading-none">
        {stat.prefix || ''}
        {count}
        <span className="text-[var(--orange-ink)]">{stat.suffix}</span>
      </div>
      <div className="mt-4">
        <p className="font-semibold text-[16px] text-[var(--ink)]">{stat.label}</p>
        <p className="mt-1 text-sm text-[var(--blue)]">{stat.sublabel}</p>
      </div>
    </motion.div>
  );
}

/**
 * Soft SVG Curved Section Transition
 */
function CurvedSectionDivider({ fill, nextFill }: { fill: string; nextFill: string }) {
  return (
    <div
      style={{ backgroundColor: fill }}
      className="relative z-10 w-full overflow-hidden leading-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 64"
        fill="none"
        preserveAspectRatio="none"
        className="w-full h-10 sm:h-16 block"
      >
        <path
          d="M0 64L1440 64L1440 16C1120 62 320 62 0 16L0 64Z"
          fill={nextFill}
        />
      </svg>
    </div>
  );
}
