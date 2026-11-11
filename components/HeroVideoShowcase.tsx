'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Maximize2,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { CALM_EASE } from './FlowElements';
import { ATLAS_IMAGES } from '@/src/assets/images';

export interface HeroVideoScene {
  id: string;
  title: string;
  shortLabel: string;
  subtitle: string;
  src: string;
  poster: string;
  badge: string;
}

export const HERO_VIDEO_SCENES: HeroVideoScene[] = [
  {
    id: 'flow',
    title: 'Doorstroming & Infra',
    shortLabel: '01 · Doorstroming',
    subtitle: 'Verzorgde wegafzettingen en vlotte afwikkeling bij wegwerkzaamheden',
    src: '/videos/atlas-hero-flow.mp4',
    poster: ATLAS_IMAGES.heroCalmRoadworks,
    badge: 'LIVE IN BEWEGING · INFRA',
  },
  {
    id: 'portrait',
    title: 'Beroepsregelaar op post',
    shortLabel: '02 · Verkeersregelaars',
    subtitle: 'Gecertificeerde vakmensen die kalmte en overzicht bewaren',
    src: '/videos/atlas-hero-portrait.mp4',
    poster: ATLAS_IMAGES.heroTrafficController,
    badge: 'OP LOCATIE · VAKMANSCHAP',
  },
  {
    id: 'events',
    title: 'Evenementen & Publiek',
    shortLabel: '03 · Mobiliteit & Evenementen',
    subtitle: 'Soepele geleiding van bezoekers- en verkeersstromen',
    src: '/videos/atlas-hero-events.mp4',
    poster: ATLAS_IMAGES.eventsTrafficFlow,
    badge: 'GASTVRIJHEID & VEILIGHEID',
  },
];

interface HeroVideoShowcaseProps {
  className?: string;
  priority?: boolean;
  onSceneChange?: (scene: HeroVideoScene) => void;
}

export function HeroVideoShowcase({
  className = '',
  onSceneChange,
}: HeroVideoShowcaseProps) {
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const activeScene = HERO_VIDEO_SCENES[currentSceneIdx];

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('00:06');
  const [isCinemaMode, setIsCinemaMode] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Play / pause synchronization
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // Ambient sound synthesis for soothing outdoor breeze when sound is turned ON
  const toggleSound = () => {
    if (isMuted) {
      setIsMuted(false);
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!audioCtxRef.current) {
          const ctx = new AudioContextClass();
          audioCtxRef.current = ctx;

          // Create soothing filtered warm ambient breeze
          const bufferSize = ctx.sampleRate * 2;
          const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
          }

          const whiteNoise = ctx.createBufferSource();
          whiteNoise.buffer = noiseBuffer;
          whiteNoise.loop = true;

          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(320, ctx.currentTime);

          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.04, ctx.currentTime);

          whiteNoise.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          whiteNoise.start();

          gainNodeRef.current = gain;
        } else if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }
      } catch {
        // Fallback gracefully
      }
    } else {
      setIsMuted(true);
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.05);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Update progress tracking
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const ratio = (video.currentTime / video.duration) * 100;
    setProgress(ratio);

    const formatSec = (s: number) => {
      const mins = Math.floor(s / 60);
      const secs = Math.floor(s % 60);
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    setCurrentTime(formatSec(video.currentTime));
    setDuration(formatSec(video.duration));
  };

  const handleSelectScene = (idx: number) => {
    setCurrentSceneIdx(idx);
    setVideoLoaded(false);
    setProgress(0);
    const scene = HERO_VIDEO_SCENES[idx];
    if (onSceneChange) onSceneChange(scene);

    setTimeout(() => {
      const video = videoRef.current;
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => {});
        setIsPlaying(true);
      }
    }, 50);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const video = videoRef.current;
    if (video && video.duration) {
      video.currentTime = ratio * video.duration;
      setProgress(ratio * 100);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Container Shape: Either centered Arch Frame or Wide Cinema Canvas */}
      <div
        className={`relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] border border-[var(--line)] shadow-calm-lg bg-[var(--blue-deep)] ${
          isCinemaMode
            ? 'w-full rounded-[36px] aspect-[16/9] sm:aspect-[21/9]'
            : 'w-full rounded-t-[999px] rounded-b-[28px] aspect-[3/4.2]'
        }`}
      >
        {/* Background Video Element */}
        <video
          ref={videoRef}
          key={activeScene.src}
          src={activeScene.src}
          poster={activeScene.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onLoadedData={() => setVideoLoaded(true)}
          className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] scale-[1.02]"
        />

        {/* Ambient Film Grain + Warm Light Scrim Over Video */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[var(--blue-deep)]/90 via-[var(--blue-deep)]/25 to-[var(--cream-light)]/20" />
        <div className="absolute inset-0 pointer-events-none bg-film-grain opacity-40 mix-blend-overlay" />

        {/* Top Badges & Live Status Indicator */}
        <div className="absolute top-6 inset-x-6 z-20 flex items-center justify-between gap-3 pointer-events-none">
          <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 bg-[var(--porcelain)]/85 backdrop-blur-md border border-[var(--line)] shadow-sm text-[11px] font-semibold tracking-wider text-[var(--ink)] uppercase">
            <span className="w-2 h-2 rounded-full bg-[var(--ok)] animate-pulse shrink-0" aria-hidden="true" />
            <span>{activeScene.badge}</span>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            {/* Cinema mode toggle */}
            <button
              type="button"
              onClick={() => setIsCinemaMode((prev) => !prev)}
              aria-label={isCinemaMode ? 'Sluit bioscoopmodus' : 'Volledig doek openen'}
              title={isCinemaMode ? 'Standaard boogformaat' : 'Bioscoop breedbeeld'}
              className="w-9 h-9 rounded-full bg-[var(--porcelain)]/80 hover:bg-[var(--porcelain)] backdrop-blur-md border border-[var(--line)] text-[var(--ink)] inline-flex items-center justify-center transition-colors"
            >
              {isCinemaMode ? (
                <Minimize2 strokeWidth={1.25} className="w-4 h-4" />
              ) : (
                <Maximize2 strokeWidth={1.25} className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Center Play Button Overlay on Hover/Paused */}
        <div
          onClick={togglePlay}
          className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer group"
          role="button"
          tabIndex={0}
          aria-label={isPlaying ? 'Pauzeer videobeeld' : 'Start videobeeld'}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') togglePlay();
          }}
        >
          <motion.div
            animate={{
              scale: isPlaying ? 0.9 : 1,
              opacity: isPlaying ? 0 : 1,
            }}
            whileHover={{ opacity: 1, scale: 1.06 }}
            transition={{ duration: 0.3 }}
            className="w-16 h-16 rounded-full bg-[var(--orange)] text-[var(--ink)] shadow-calm-lg flex items-center justify-center transition-all group-hover:scale-105"
          >
            {isPlaying ? (
              <Pause strokeWidth={1.5} className="w-6 h-6 fill-current" />
            ) : (
              <Play strokeWidth={1.5} className="w-6 h-6 fill-current translate-x-0.5" />
            )}
          </motion.div>
        </div>

        {/* Bottom Integrated Controls Bar */}
        <div className="absolute inset-x-0 bottom-0 z-20 p-5 sm:p-6 bg-gradient-to-t from-[var(--blue-deep)] via-[var(--blue-deep)]/75 to-transparent text-[var(--cream)] space-y-3">
          {/* Active scene label */}
          <div className="flex items-center justify-between gap-3 text-xs">
            <div>
              <p className="font-semibold text-[var(--orange)] uppercase tracking-[0.14em] text-[10.5px]">
                {activeScene.shortLabel}
              </p>
              <p className="font-display text-lg sm:text-xl text-[var(--porcelain)] mt-0.5">
                {activeScene.title}
              </p>
            </div>

            {/* Time Indicator */}
            <div className="text-[11px] font-mono tabular-nums text-[var(--cream)]/80">
              {currentTime} / {duration}
            </div>
          </div>

          {/* Interactive Progress Bar Scrubber */}
          <div
            onClick={handleSeek}
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-1.5 w-full bg-[var(--cream)]/20 hover:bg-[var(--cream)]/35 rounded-full cursor-pointer relative overflow-hidden transition-all"
          >
            <motion.div
              className="h-full bg-[var(--orange)] rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear', duration: 0.1 }}
            />
          </div>

          {/* Control Buttons Row */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2">
              {/* Play / Pause button */}
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pauzeren' : 'Afspelen'}
                className="w-8 h-8 rounded-full bg-[var(--cream)]/15 hover:bg-[var(--cream)]/30 text-[var(--porcelain)] inline-flex items-center justify-center transition-colors text-xs"
              >
                {isPlaying ? (
                  <Pause strokeWidth={1.5} className="w-3.5 h-3.5" />
                ) : (
                  <Play strokeWidth={1.5} className="w-3.5 h-3.5 translate-x-0.5" />
                )}
              </button>

              {/* Sound Ambience Toggle */}
              <button
                type="button"
                onClick={toggleSound}
                aria-label={isMuted ? 'Geluidssfeer inschakelen' : 'Geluid dempen'}
                title={isMuted ? 'Kalme geluidssfeer aanzetten' : 'Geluid dempen'}
                className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-xs transition-colors ${
                  !isMuted
                    ? 'bg-[var(--orange)] text-[var(--ink)] font-semibold'
                    : 'bg-[var(--cream)]/15 hover:bg-[var(--cream)]/30 text-[var(--porcelain)]'
                }`}
              >
                {!isMuted ? (
                  <>
                    <Volume2 strokeWidth={1.5} className="w-3.5 h-3.5" />
                    <span>Sfeer aan</span>
                  </>
                ) : (
                  <>
                    <VolumeX strokeWidth={1.5} className="w-3.5 h-3.5" />
                    <span>Geluid uit</span>
                  </>
                )}
              </button>

              {/* Reset to start */}
              <button
                type="button"
                onClick={() => {
                  const video = videoRef.current;
                  if (video) {
                    video.currentTime = 0;
                    video.play().catch(() => {});
                    setIsPlaying(true);
                  }
                }}
                aria-label="Herstart video"
                title="Herstart video"
                className="w-8 h-8 rounded-full bg-[var(--cream)]/15 hover:bg-[var(--cream)]/30 text-[var(--porcelain)] inline-flex items-center justify-center transition-colors"
              >
                <RotateCcw strokeWidth={1.5} className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Indicator */}
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-[var(--cream)]/75">
              <Sparkles strokeWidth={1.25} className="w-3.5 h-3.5 text-[var(--orange)]" />
              <span>Rustig & vloeiend</span>
            </span>
          </div>
        </div>
      </div>

      {/* Scene Switcher Selector Pills Below */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {HERO_VIDEO_SCENES.map((scene, idx) => {
          const isActive = currentSceneIdx === idx;
          return (
            <button
              key={scene.id}
              type="button"
              onClick={() => handleSelectScene(idx)}
              className={`h-9 px-4 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-2 ${
                isActive
                  ? 'bg-[var(--blue)] text-[var(--porcelain)] shadow-sm'
                  : 'bg-[var(--porcelain)] hover:bg-[var(--cream)] text-[var(--ink)] border border-[var(--sand)]'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isActive ? 'bg-[var(--orange)]' : 'bg-[var(--sand)]'
                }`}
              />
              <span>{scene.shortLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
