'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { ATLAS_IMAGES } from '@/src/assets/images';

export interface VideoScene {
  id: string;
  label: string;
  videoSrc: string;
  poster: string;
}

const SCENES: VideoScene[] = [
  {
    id: 'infra',
    label: 'Infra & Werkvakken',
    videoSrc: '/videos/atlas-hero-hd.mp4',
    poster: ATLAS_IMAGES.heroCalmRoadworks,
  },
  {
    id: 'controller',
    label: 'Verkeersregelaars',
    videoSrc: '/videos/atlas-hero-portrait.mp4',
    poster: ATLAS_IMAGES.heroTrafficController,
  },
  {
    id: 'events',
    label: 'Evenementen & Publiek',
    videoSrc: '/videos/atlas-hero-events.mp4',
    poster: ATLAS_IMAGES.eventsTrafficFlow,
  },
];

export function HeroVideoClean() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeScene = SCENES[activeIdx];

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

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

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setProgress((video.currentTime / video.duration) * 100);
  };

  const switchScene = (idx: number) => {
    setActiveIdx(idx);
    setProgress(0);
    setTimeout(() => {
      const video = videoRef.current;
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => {});
        setIsPlaying(true);
      }
    }, 50);
  };

  return (
    <div className="relative w-full">
      {/* The Clear Video Canvas Frame */}
      <div className="relative w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] overflow-hidden border border-[var(--line)] shadow-calm-lg bg-[var(--cream)] aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9]">
        {/* Crisp HTML5 Video */}
        <video
          ref={videoRef}
          key={activeScene.videoSrc}
          src={activeScene.videoSrc}
          poster={activeScene.poster}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-cover transition-transform duration-700 ease-out"
        />

        {/* Very subtle warm sunlit scrim to preserve high video clarity */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[var(--ink)]/40 via-transparent to-[var(--ink)]/15" />

        {/* Top-Right: Floating Glass Status Chip */}
        <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20">
          <div className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 bg-[var(--porcelain)]/85 backdrop-blur-md border border-[var(--line)] shadow-sm text-xs sm:text-[13px] font-medium text-[var(--ink)]">
            <span className="w-2 h-2 rounded-full bg-[var(--ok)] animate-pulse shrink-0" aria-hidden="true" />
            <span>Planning bereikbaar · 24/7</span>
          </div>
        </div>

        {/* Click anywhere on video to toggle play/pause */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pauzeer video' : 'Speel video af'}
          className="absolute inset-0 w-full h-full z-10 cursor-pointer flex items-center justify-center group focus:outline-none"
        >
          <motion.div
            initial={false}
            animate={{
              scale: isPlaying ? 0.9 : 1,
              opacity: isPlaying ? 0 : 1,
            }}
            whileHover={{ opacity: 1, scale: 1.05 }}
            transition={{ duration: 0.25 }}
            className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-[var(--orange)] text-[var(--ink)] shadow-calm-lg flex items-center justify-center transition-all group-hover:scale-110"
          >
            {isPlaying ? (
              <Pause strokeWidth={1.5} className="w-7 h-7 fill-current" />
            ) : (
              <Play strokeWidth={1.5} className="w-7 h-7 fill-current translate-x-0.5" />
            )}
          </motion.div>
        </button>

        {/* Bottom Floating Minimalist Controls Bar */}
        <div className="absolute bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-6 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
          {/* Left: Play/Pause & Sound Pill */}
          <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full p-1.5 bg-[var(--porcelain)]/85 backdrop-blur-md border border-[var(--line)] shadow-sm">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pauzeren' : 'Afspelen'}
              className="w-9 h-9 rounded-full bg-[var(--cream)] hover:bg-[var(--orange)] text-[var(--ink)] flex items-center justify-center transition-colors"
            >
              {isPlaying ? (
                <Pause strokeWidth={1.5} className="w-4 h-4" />
              ) : (
                <Play strokeWidth={1.5} className="w-4 h-4 translate-x-0.5" />
              )}
            </button>

            <button
              type="button"
              onClick={toggleSound}
              aria-label={isMuted ? 'Geluid aanzetten' : 'Geluid dempen'}
              className="w-9 h-9 rounded-full bg-[var(--cream)] hover:bg-[var(--orange)] text-[var(--ink)] flex items-center justify-center transition-colors"
            >
              {isMuted ? (
                <VolumeX strokeWidth={1.5} className="w-4 h-4" />
              ) : (
                <Volume2 strokeWidth={1.5} className="w-4 h-4" />
              )}
            </button>

            <span className="hidden sm:inline-block pr-3 text-xs font-medium text-[var(--ink)]/80">
              Live beeld impressie
            </span>
          </div>

          {/* Right: Scene Switcher Pills */}
          <div className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full p-1.5 bg-[var(--porcelain)]/85 backdrop-blur-md border border-[var(--line)] shadow-sm overflow-x-auto max-w-full">
            {SCENES.map((scene, idx) => {
              const active = activeIdx === idx;
              return (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => switchScene(idx)}
                  className={`h-8 px-3.5 rounded-full text-xs font-medium transition-all whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[var(--blue)] text-[var(--porcelain)] shadow-sm'
                      : 'text-[var(--ink)] hover:bg-[var(--cream)]'
                  }`}
                >
                  {scene.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Minimalist Progress Line at the very bottom border */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-[var(--line)]">
          <motion.div
            className="h-full bg-[var(--orange)]"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'linear', duration: 0.1 }}
          />
        </div>
      </div>
    </div>
  );
}
