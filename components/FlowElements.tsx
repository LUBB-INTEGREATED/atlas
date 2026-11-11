'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import { ArrowUpRight, Plus } from 'lucide-react';
import type { ServiceItem } from '@/src/content/nl';

export const CALM_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Small label: Figtree 600, uppercase, tracking 0.14em, 12px, in --blue (or --cream on dark),
 * with a small orange dot before it (● DIENSTEN).
 */
export function SectionLabel({
  children,
  variant = 'default',
  className = '',
}: {
  children: React.ReactNode;
  variant?: 'default' | 'onBlue' | 'onOrange';
  className?: string;
}) {
  const textColor =
    variant === 'onBlue'
      ? 'text-[var(--cream)]'
      : variant === 'onOrange'
        ? 'text-[var(--ink)]'
        : 'text-[var(--blue)]';
  const dotColor = variant === 'onOrange' ? 'bg-[var(--ink)]' : 'bg-[var(--orange)]';

  return (
    <div
      className={`inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] ${textColor} ${className}`}
    >
      <span className={`w-2 h-2 rounded-full ${dotColor} shrink-0`} aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

/**
 * Word-by-word soft blur-to-sharp reveal for Fraunces headlines.
 */
export function RevealHeadline({
  before,
  italic,
  after = '',
  as: Tag = 'h2',
  className = '',
}: {
  before: string;
  italic?: string;
  after?: string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-8% 0px' });

  const beforeWords = before.trim().split(/\s+/).filter(Boolean);
  const italicWords = italic ? italic.trim().split(/\s+/).filter(Boolean) : [];

  return (
    <Tag ref={ref} className={`font-display font-light text-balance ${className}`}>
      {beforeWords.map((word, idx) => (
        <motion.span
          key={`b-${idx}`}
          initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.78, delay: idx * 0.055, ease: CALM_EASE }}
          className="inline-block mr-[0.26em]"
        >
          {word}
        </motion.span>
      ))}
      {italicWords.map((word, idx) => {
        const isLastItalic = idx === italicWords.length - 1;
        return (
          <motion.span
            key={`i-${idx}`}
            initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
            animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{
              duration: 0.82,
              delay: (beforeWords.length + idx) * 0.055,
              ease: CALM_EASE,
            }}
            className="inline-block italic font-normal mr-[0.24em]"
          >
            {word}
            {isLastItalic && after ? <span className="not-italic">{after}</span> : null}
          </motion.span>
        );
      })}
      {!italic && after ? <span>{after}</span> : null}
    </Tag>
  );
}

/**
 * Arch-framed image with clip-path opening and gentle scale 1.08 -> 1.0 reveal,
 * plus resilient fallback container so no broken image frame ever appears.
 */
export function ArchImage({
  src,
  alt,
  className = '',
  aspectClass = 'aspect-[3/4]',
  priority = false,
  roundedVariant = 'arch',
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  aspectClass?: string;
  priority?: boolean;
  roundedVariant?: 'arch' | 'panel';
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-6% 0px' });
  const [imgError, setImgError] = useState(false);

  const shapeClass =
    roundedVariant === 'arch'
      ? 'rounded-t-[999px] rounded-b-[28px]'
      : 'rounded-[28px]';

  return (
    <motion.div
      ref={ref}
      initial={{
        clipPath:
          roundedVariant === 'arch'
            ? 'inset(18% 6% 0% 6% round 999px 999px 28px 28px)'
            : 'inset(12% 4% 0% 4% round 28px)',
        opacity: 0,
        y: 24,
      }}
      animate={
        isInView
          ? {
              clipPath:
                roundedVariant === 'arch'
                  ? 'inset(0% 0% 0% 0% round 999px 999px 28px 28px)'
                  : 'inset(0% 0% 0% 0% round 28px)',
              opacity: 1,
              y: 0,
            }
          : {}
      }
      transition={{ duration: 0.88, delay, ease: CALM_EASE }}
      className={`relative overflow-hidden bg-[var(--cream)] ${shapeClass} ${aspectClass} ${className}`}
    >
      {!imgError ? (
        // TODO: replace with real Atlas photo
        <motion.img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          initial={{ scale: 1.08 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 1.15, delay, ease: CALM_EASE }}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-[var(--cream)] to-[var(--sand)] text-[var(--blue)]">
          <div className="w-12 h-16 rounded-t-full border border-[var(--blue)]/30 mb-3" />
          <span className="text-xs font-medium tracking-wide max-w-[20ch]">{alt}</span>
        </div>
      )}
    </motion.div>
  );
}

/**
 * Primary, Secondary, and Tertiary buttons following the Calm Flow specification:
 * - Primary: --orange pill, --ink text, 56px tall, label + circular arrow icon that rotates 45deg on hover, subtle magnetic pull.
 * - Secondary: --blue 1px outline pill, fills --blue with cream text on hover.
 * - Tertiary: text link with a curved SVG underline that draws in on hover.
 */
export function CalmButton({
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  children,
  className = '',
  disabled = false,
}: {
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'dark' | 'tertiary' | 'outlineCream';
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (variant !== 'primary' && variant !== 'dark') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    setOffset({ x: relX * 0.12, y: relY * 0.18 });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  if (variant === 'tertiary') {
    const inner = (
      <span className={`group inline-flex flex-col items-start gap-1 font-medium text-[var(--blue)] hover:text-[var(--ink)] transition-colors whitespace-nowrap shrink-0 ${className}`}>
        <span className="inline-flex items-center gap-2">
          <span>{children}</span>
          <ArrowUpRight
            strokeWidth={1.25}
            className="w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45"
          />
        </span>
        <svg
          viewBox="0 0 120 8"
          fill="none"
          className="w-full h-2 overflow-visible"
          aria-hidden="true"
        >
          <path
            d="M2 5.5C38 1.5 82 1.5 118 5.5"
            stroke="#F4721E"
            strokeWidth="2"
            strokeLinecap="round"
            className="transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [stroke-dasharray:120] [stroke-dashoffset:40] group-hover:[stroke-dashoffset:0]"
          />
        </svg>
      </span>
    );

    if (href) {
      return <Link href={href}>{inner}</Link>;
    }
    return (
      <button type={type} onClick={onClick} disabled={disabled}>
        {inner}
      </button>
    );
  }

  const baseClasses =
    'group relative inline-flex items-center justify-between gap-3.5 h-14 pl-6 pr-2.5 rounded-full font-medium text-[15px] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] whitespace-nowrap shrink-0 select-none';

  const variantClasses =
    variant === 'primary'
      ? 'bg-[var(--orange)] hover:bg-[var(--orange-hover)] text-[var(--ink)] shadow-calm'
      : variant === 'dark'
        ? 'bg-[var(--ink)] hover:bg-[var(--blue-deep)] text-[var(--cream-light)] shadow-calm'
        : variant === 'outlineCream'
          ? 'border border-[var(--cream)]/60 text-[var(--cream)] hover:bg-[var(--cream)] hover:text-[var(--ink)] pr-6'
          : 'border border-[var(--blue)] text-[var(--blue)] hover:bg-[var(--blue)] hover:text-[var(--cream-light)] pr-6';

  const showArrowCircle = variant === 'primary' || variant === 'dark';

  const content = (
    <motion.span
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.4 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${baseClasses} ${variantClasses} ${disabled ? 'opacity-60 pointer-events-none' : ''} ${className}`}
    >
      <span>{children}</span>
      {showArrowCircle ? (
        <span
          className={`w-9 h-9 rounded-full inline-flex items-center justify-center transition-colors duration-500 ${
            variant === 'dark'
              ? 'bg-[var(--cream-light)]/15 text-[var(--cream-light)]'
              : 'bg-[var(--ink)]/12 text-[var(--ink)]'
          }`}
        >
          <ArrowUpRight
            strokeWidth={1.25}
            className="w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45"
          />
        </span>
      ) : (
        <ArrowUpRight
          strokeWidth={1.25}
          className="w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45"
        />
      )}
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block rounded-full">
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className="inline-block rounded-full">
      {content}
    </button>
  );
}

/**
 * Service card: arch-topped photo, Fraunces H3, one line of text, small circular arrow.
 * Hover: photo zooms 1.04 inside the arch, card lifts 4px with the soft blue shadow.
 */
export function ServiceCard({ service }: { service: ServiceItem }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href={`/diensten/${service.slug}`}
      className="group block rounded-t-[999px] rounded-b-[28px] bg-[var(--porcelain)] p-3.5 border border-[var(--line)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-calm focus-visible:ring-2 focus-visible:ring-[var(--blue)]"
    >
      <div className="relative aspect-[4/4.3] w-full overflow-hidden rounded-t-[999px] rounded-b-[20px] bg-[var(--cream)]">
        {!imgError ? (
          // TODO: replace with real Atlas photo
          <img
            src={service.image}
            alt={service.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[var(--cream)] text-[var(--blue)] text-sm">
            {service.title}
          </div>
        )}
      </div>

      <div className="pt-5 pb-3 px-3 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-display text-[1.5rem] font-normal text-[var(--blue)] group-hover:text-[var(--ink)] transition-colors">
            {service.title}
          </h3>
          <p className="mt-1.5 text-[15px] text-[var(--ink)]/80 line-clamp-2 leading-relaxed">
            {service.shortDescription}
          </p>
        </div>
        <span
          className="mt-1 w-10 h-10 rounded-full border border-[var(--line)] bg-[var(--cream-light)] group-hover:bg-[var(--orange)] group-hover:border-[var(--orange)] text-[var(--blue)] group-hover:text-[var(--ink)] inline-flex items-center justify-center shrink-0 transition-all duration-500"
          aria-hidden="true"
        >
          <ArrowUpRight
            strokeWidth={1.25}
            className="w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45"
          />
        </span>
      </div>
    </Link>
  );
}

/**
 * Accordion (FAQ): rounded rows on --porcelain, plus icon in a small circle that rotates to ×,
 * smooth height animation.
 */
export function FaqAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3.5">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const contentId = `faq-panel-${idx}`;
        const buttonId = `faq-btn-${idx}`;

        return (
          <div
            key={item.question}
            className="rounded-[28px] bg-[var(--porcelain)] border border-[var(--sand)] transition-colors duration-500"
          >
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={contentId}
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-display text-lg sm:text-[1.25rem] font-normal text-[var(--blue)]">
                {item.question}
              </span>
              <span
                className={`w-9 h-9 rounded-full inline-flex items-center justify-center shrink-0 border transition-all duration-500 ${
                  isOpen
                    ? 'bg-[var(--orange)] border-[var(--orange)] text-[var(--ink)] rotate-45'
                    : 'bg-[var(--cream-light)] border-[var(--sand)] text-[var(--blue)]'
                }`}
                aria-hidden="true"
              >
                <Plus strokeWidth={1.25} className="w-4 h-4" />
              </span>
            </button>
            <motion.div
              id={contentId}
              role="region"
              aria-labelledby={buttonId}
              initial={false}
              animate={{
                height: isOpen ? 'auto' : 0,
                opacity: isOpen ? 1 : 0,
              }}
              transition={{ duration: 0.55, ease: CALM_EASE }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pt-1 text-[16px] leading-[1.7] text-[var(--ink)]/85 max-w-[68ch]">
                {item.answer}
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Inner Page Hero: cream-light, small breadcrumb, Fraunces H1 in --blue, lead text,
 * wide rounded (28px) or arch-framed photo below the text that opens with a clip-path reveal,
 * and a short piece of the flow line running through it.
 */
export function PageHero({
  breadcrumb,
  parentBreadcrumb,
  titleBefore,
  titleItalic,
  titleAfter = '',
  subtitleBadge,
  lead,
  image,
  imageAlt,
  archPhoto = false,
}: {
  breadcrumb: string;
  parentBreadcrumb?: { label: string; href: string };
  titleBefore: string;
  titleItalic?: string;
  titleAfter?: string;
  subtitleBadge?: string;
  lead: string;
  image?: string;
  imageAlt?: string;
  archPhoto?: boolean;
}) {
  return (
    <section className="relative pt-36 sm:pt-44 pb-16 sm:pb-24 overflow-hidden bg-film-grain">
      {/* Short flowing orange line running softly through the inner hero */}
      <svg
        viewBox="0 0 1440 320"
        fill="none"
        className="pointer-events-none absolute top-28 left-0 w-full h-72 opacity-85"
        aria-hidden="true"
      >
        <motion.path
          d="M-40 240 C 280 90, 620 310, 980 150 C 1180 65, 1340 130, 1490 85"
          stroke="#F4721E"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: CALM_EASE }}
        />
      </svg>

      <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--blue)]">
            <li>
              <Link href="/" className="hover:text-[var(--ink)] transition-colors">
                Home
              </Link>
            </li>
            {parentBreadcrumb ? (
              <>
                <li aria-hidden="true" className="text-[var(--orange-ink)]">
                  ·
                </li>
                <li>
                  <Link href={parentBreadcrumb.href} className="hover:text-[var(--ink)] transition-colors">
                    {parentBreadcrumb.label}
                  </Link>
                </li>
              </>
            ) : null}
            <li aria-hidden="true" className="text-[var(--orange-ink)]">
              ·
            </li>
            <li aria-current="page" className="text-[var(--orange-ink)]">
              {breadcrumb}
            </li>
          </ol>
        </nav>

        <div className="max-w-4xl">
          {subtitleBadge ? (
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--cream)] px-4 py-1.5 text-sm font-medium text-[var(--blue)]">
              <span className="w-2 h-2 rounded-full bg-[var(--orange)]" aria-hidden="true" />
              <span>{subtitleBadge}</span>
            </div>
          ) : null}

          <RevealHeadline
            as="h1"
            before={titleBefore}
            italic={titleItalic}
            after={titleAfter}
            className="text-[clamp(2.75rem,6vw,5.5rem)] text-[var(--blue)]"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: CALM_EASE }}
            className="mt-6 text-[1.25rem] leading-[1.6] text-[var(--ink)]/85 max-w-2xl"
          >
            {lead}
          </motion.p>
        </div>

        {image ? (
          <div className="mt-12 sm:mt-16">
            <ArchImage
              src={image}
              alt={imageAlt || breadcrumb}
              roundedVariant={archPhoto ? 'arch' : 'panel'}
              aspectClass={archPhoto ? 'aspect-[16/10] sm:aspect-[21/9]' : 'aspect-[16/9] sm:aspect-[21/8]'}
              priority
              className="w-full shadow-calm"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
