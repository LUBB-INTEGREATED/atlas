'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, ChevronDown, Menu, Phone, X } from 'lucide-react';
import { AtlasLogo } from './AtlasLogo';
import { CALM_EASE } from './FlowElements';
import { company } from '@/src/config/company';
import { nl, type ServiceCategory, type ServiceItem } from '@/src/content/nl';

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState<ServiceItem>(nl.services[0]);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
      const footerEl = document.getElementById('site-footer');
      if (footerEl) {
        const rect = footerEl.getBoundingClientRect();
        setFooterVisible(rect.top < window.innerHeight - 20);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenus = () => {
    setServicesOpen(false);
    setMobileMenuOpen(false);
  };

  const categories: ServiceCategory[] = ['Operationeel', 'Planning & advies', 'Totaaloplossingen'];

  const navLinks = [
    { label: nl.nav.home, href: '/' },
    { label: nl.nav.diensten, href: '/diensten', hasDropdown: true },
    { label: nl.nav.opleidingen, href: '/opleidingen' },
    { label: nl.nav.overOns, href: '/over-ons' },
    { label: nl.nav.werkenBij, href: '/werken-bij' },
    { label: nl.nav.contact, href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none">
        <div
          onMouseLeave={() => setServicesOpen(false)}
          className={`pointer-events-auto max-w-[1320px] mx-auto transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            scrolled ? 'max-w-[1240px]' : 'max-w-[1320px]'
          }`}
        >
          {/* Floating pill bar */}
          <div
            className={`flex items-center justify-between gap-4 lg:gap-8 rounded-full bg-[var(--porcelain)]/85 backdrop-blur-md border border-[var(--line)] shadow-calm transition-all duration-500 ${
              scrolled ? 'px-5 py-2.5' : 'px-6 py-3.5'
            }`}
          >
            {/* Left: Brand Logo */}
            <Link
              href="/"
              aria-label={company.name}
              className="rounded-full focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
            >
              <AtlasLogo />
            </Link>

            {/* Centre: Desktop Navigation */}
            <nav aria-label="Hoofdnavigatie" className="hidden lg:flex items-center gap-7">
              {navLinks.map((item) => {
                const active = isActive(item.href);

                if (item.hasDropdown) {
                  return (
                    <div
                      key={item.href}
                      className="relative"
                      onMouseEnter={() => setServicesOpen(true)}
                    >
                      <div className="inline-flex items-center gap-1">
                        <Link
                          href={item.href}
                          className={`relative py-1.5 text-[15px] font-medium transition-colors whitespace-nowrap shrink-0 ${
                            active ? 'text-[var(--ink)]' : 'text-[var(--blue)] hover:text-[var(--ink)]'
                          }`}
                        >
                          {item.label}
                          {active ? <ActiveFlowUnderline /> : null}
                        </Link>
                        <button
                          type="button"
                          aria-expanded={servicesOpen}
                          aria-label="Open diensten menu"
                          onClick={() => setServicesOpen((prev) => !prev)}
                          className="p-1 text-[var(--blue)] hover:text-[var(--ink)] rounded-full"
                        >
                          <ChevronDown
                            strokeWidth={1.25}
                            className={`w-4 h-4 transition-transform duration-500 ${
                              servicesOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onMouseEnter={() => setServicesOpen(false)}
                    className={`relative py-1.5 text-[15px] font-medium transition-colors whitespace-nowrap shrink-0 ${
                      active ? 'text-[var(--ink)]' : 'text-[var(--blue)] hover:text-[var(--ink)]'
                    }`}
                  >
                    {item.label}
                    {active ? <ActiveFlowUnderline /> : null}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Phone link with --ok status dot + Primary CTA */}
            <div className="hidden lg:flex items-center gap-5 shrink-0">
              <a
                href={company.phoneHref}
                className="inline-flex items-center gap-2 text-[14px] font-medium text-[var(--ink)] hover:text-[var(--blue)] transition-colors whitespace-nowrap shrink-0"
                title="24/7 Planning bereikbaar"
              >
                <span
                  className="w-2 h-2 rounded-full bg-[var(--ok)] shrink-0"
                  aria-hidden="true"
                />
                <span className="tabular-nums">{company.phoneDisplay}</span>
              </a>

              <Link
                href="/offerte-aanvragen"
                className="group inline-flex items-center gap-3 h-11 pl-5 pr-2 rounded-full bg-[var(--orange)] hover:bg-[var(--orange-hover)] text-[var(--ink)] font-medium text-[14px] transition-all duration-500 whitespace-nowrap shrink-0"
              >
                <span>{nl.nav.cta}</span>
                <span className="w-7 h-7 rounded-full bg-[var(--ink)]/12 inline-flex items-center justify-center">
                  <ArrowUpRight
                    strokeWidth={1.25}
                    className="w-3.5 h-3.5 transition-transform duration-500 group-hover:rotate-45"
                  />
                </span>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                href="/offerte-aanvragen"
                className="hidden sm:inline-flex items-center px-4 h-10 rounded-full bg-[var(--orange)] text-[var(--ink)] text-xs font-semibold whitespace-nowrap"
              >
                {nl.nav.cta}
              </Link>
              <button
                type="button"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? 'Sluit menu' : 'Open menu'}
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="w-11 h-11 rounded-full bg-[var(--cream)] text-[var(--ink)] inline-flex items-center justify-center border border-[var(--line)]"
              >
                {mobileMenuOpen ? (
                  <X strokeWidth={1.25} className="w-5 h-5" />
                ) : (
                  <Menu strokeWidth={1.25} className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Diensten Mega Dropdown (rounded 28px panel, 3 columns + arch photo preview) */}
          <AnimatePresence>
            {servicesOpen ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.4, ease: CALM_EASE }}
                className="hidden lg:block mt-3 rounded-[28px] bg-[var(--porcelain)]/95 backdrop-blur-xl border border-[var(--line)] shadow-calm-lg p-8"
              >
                <div className="grid grid-cols-12 gap-8 items-stretch">
                  <div className="col-span-9 grid grid-cols-3 gap-6">
                    {categories.map((cat) => {
                      const catServices = nl.services.filter((s) => s.category === cat);
                      return (
                        <div key={cat} className="flex flex-col">
                          <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--blue)] mb-3 pb-2 border-b border-[var(--line)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--orange)]" />
                            <span>{cat}</span>
                          </div>
                          <ul className="space-y-1">
                            {catServices.map((srv) => (
                              <li key={srv.slug}>
                                <Link
                                  href={`/diensten/${srv.slug}`}
                                  onClick={closeMenus}
                                  onMouseEnter={() => setHoveredService(srv)}
                                  onFocus={() => setHoveredService(srv)}
                                  className="group flex items-center justify-between gap-2 rounded-full px-3.5 py-2 text-[14.5px] font-medium text-[var(--ink)] hover:bg-[var(--cream)] transition-colors"
                                >
                                  <span>{srv.title}</span>
                                  <ArrowUpRight
                                    strokeWidth={1.25}
                                    className="w-3.5 h-3.5 text-[var(--blue)] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-45"
                                  />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>

                  {/* Right Column: Arch-shaped photo preview that crossfades on hover */}
                  <div className="col-span-3 flex flex-col justify-between rounded-[24px] bg-[var(--cream)]/70 p-4 border border-[var(--line)]">
                    <div className="relative aspect-[4/4.2] w-full overflow-hidden rounded-t-[999px] rounded-b-[18px] bg-[var(--cream)]">
                      <AnimatePresence mode="wait">
                        {/* TODO: replace with real Atlas photo */}
                        <motion.img
                          key={hoveredService.slug}
                          src={hoveredService.image}
                          alt={hoveredService.title}
                          referrerPolicy="no-referrer"
                          initial={{ opacity: 0, scale: 1.04 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.45, ease: CALM_EASE }}
                          className="w-full h-full object-cover"
                        />
                      </AnimatePresence>
                    </div>
                    <div className="mt-3 px-1">
                      <p className="font-display text-lg text-[var(--blue)]">
                        {hoveredService.title}
                      </p>
                      <p className="mt-1 text-xs text-[var(--ink)]/80 line-clamp-2">
                        {hoveredService.shortDescription}
                      </p>
                      <Link
                        href="/diensten"
                        onClick={closeMenus}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--orange-ink)] hover:underline"
                      >
                        <span>{nl.nav.allServices}</span>
                        <ArrowUpRight strokeWidth={1.25} className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </header>

      {/* Full-Screen Mobile Cream Menu */}
      <AnimatePresence>
        {mobileMenuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: CALM_EASE }}
            className="fixed inset-0 z-40 bg-[var(--cream-light)] bg-film-grain pt-28 pb-10 px-6 flex flex-col justify-between overflow-y-auto lg:hidden"
          >
            <nav aria-label="Mobiele navigatie" className="space-y-3">
              {navLinks.map((item, idx) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.55, delay: idx * 0.06, ease: CALM_EASE }}
                >
                  <Link
                    href={item.href}
                    onClick={closeMenus}
                    className={`block font-display text-[2.25rem] py-1 ${
                      isActive(item.href) ? 'text-[var(--orange-ink)] italic' : 'text-[var(--blue)]'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-10 pt-6 border-t border-[var(--line)] space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--blue)]">
                <span className="w-2 h-2 rounded-full bg-[var(--ok)]" />
                <span>{nl.nav.planningReachable}</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={company.phoneHref}
                  className="inline-flex items-center justify-center gap-2.5 h-14 px-6 rounded-full bg-[var(--porcelain)] border border-[var(--sand)] text-[var(--ink)] font-medium"
                >
                  <Phone strokeWidth={1.25} className="w-4 h-4 text-[var(--blue)]" />
                  <span className="tabular-nums">{company.phoneDisplay}</span>
                </a>
                <Link
                  href="/offerte-aanvragen"
                  className="inline-flex items-center justify-center gap-2.5 h-14 px-6 rounded-full bg-[var(--orange)] text-[var(--ink)] font-medium"
                >
                  <span>{nl.nav.cta}</span>
                  <ArrowUpRight strokeWidth={1.25} className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Mobile Floating Call Button (60px orange circle, bottom right, hidden over footer) */}
      <AnimatePresence>
        {!footerVisible && !mobileMenuOpen ? (
          <motion.a
            href={company.phoneHref}
            aria-label={`Bel direct met Atlas Holland: ${company.phoneDisplay}`}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.4, ease: CALM_EASE }}
            className="fixed bottom-5 right-5 z-40 lg:hidden w-[60px] h-[60px] rounded-full bg-[var(--orange)] text-[var(--ink)] shadow-calm-lg flex items-center justify-center"
          >
            <Phone strokeWidth={1.25} className="w-6 h-6" />
          </motion.a>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function ActiveFlowUnderline() {
  return (
    <svg
      viewBox="0 0 64 6"
      fill="none"
      className="absolute -bottom-0.5 left-0 w-full h-1.5 overflow-visible"
      aria-hidden="true"
    >
      <path
        d="M2 4.5C20 1.2 44 1.2 62 4.5"
        stroke="#F4721E"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
