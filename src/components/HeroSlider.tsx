"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

export interface Slide {
  type: "image" | "video";
  src: string;
  posterSrc?: string;
  alt: string;
  headline: string;
  subtext?: string;
  overlayVariant: "red" | "dark" | "diagonal";
  kenBurnsDirection?: "center" | "top-left" | "bottom-right";
}

const DEFAULT_SLIDES: Slide[] = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&q=80",
    alt: "Athletes competing in ultimate frisbee",
    headline: "Play with heart.",
    subtext: "LUDA \u00b7 The Crayons",
    overlayVariant: "red",
    kenBurnsDirection: "center",
  },
  {
    type: "video",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    posterSrc: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&q=80",
    alt: "Energetic sports highlight reel",
    headline: "Feel the energy.",
    overlayVariant: "red",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1920&q=80",
    alt: "Sports action shot",
    headline: "Lakeville Ultimate.",
    subtext: "Spring Season 2026",
    overlayVariant: "dark",
    kenBurnsDirection: "top-left",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=1920&q=80",
    alt: "Frisbee player in action",
    headline: "Rise up, Crayons.",
    overlayVariant: "diagonal",
    kenBurnsDirection: "bottom-right",
  },
  {
    type: "video",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    posterSrc: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1920&q=80",
    alt: "Game day action footage",
    headline: "Game day.",
    overlayVariant: "dark",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=1920&q=80",
    alt: "Team sports competition",
    headline: "This is LUDA.",
    subtext: "Lakeville, MN",
    overlayVariant: "red",
    kenBurnsDirection: "center",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1920&q=80",
    alt: "Athletes in motion",
    headline: "Run. Catch. Win.",
    subtext: "Twin Cities Invitational",
    overlayVariant: "dark",
    kenBurnsDirection: "top-left",
  },
];

interface HeroSliderProps {
  slides?: Slide[];
}

export function HeroSlider({ slides = DEFAULT_SLIDES }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animKeys, setAnimKeys] = useState<number[]>(() =>
    slides.map((_, i) => (i === 0 ? 1 : 0))
  );
  const [textKey, setTextKey] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const count = slides.length;

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    setTextKey((k) => k + 1);
    setAnimKeys((prev) => prev.map((k, i) => (i === index ? k + 1 : k)));
  }, []);

  const advance = useCallback(
    () => goTo((current + 1) % count),
    [current, count, goTo]
  );
  const retreat = useCallback(
    () => goTo((current - 1 + count) % count),
    [current, count, goTo]
  );

  const advanceRef = useRef(advance);
  useEffect(() => {
    advanceRef.current = advance;
  }, [advance]);

  useEffect(() => {
    if (paused || slides[current].type !== "image") return;
    const id = setTimeout(advance, 5000);
    return () => clearTimeout(id);
  }, [paused, advance, current, slides]);

  useEffect(() => {
    if (paused || slides[current].type !== "video") return;
    const id = setTimeout(advance, 30_000);
    return () => clearTimeout(id);
  }, [paused, advance, current, slides]);

  useEffect(() => {
    slides.forEach((slide, i) => {
      if (slide.type !== "video") return;
      const vid = videoRefs.current[i];
      if (!vid) return;
      if (i === current) {
        if (paused) {
          vid.pause();
        } else {
          vid.play().catch(() => undefined);
        }
      } else {
        vid.pause();
        vid.currentTime = 0;
      }
    });
  }, [current, paused, slides]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 50) dx > 0 ? advance() : retreat();
    touchStartX.current = null;
  };

  const overlayStyle = (v: Slide["overlayVariant"]): React.CSSProperties => {
    if (v === "red") return { background: "rgba(208,0,0,0.45)" };
    if (v === "dark") return { background: "rgba(26,26,26,0.50)" };
    return {
      background:
        "linear-gradient(135deg,rgba(208,0,0,0.50) 0%,rgba(26,26,26,0.62) 100%)",
    };
  };

  const kbStyle = (
    isActive: boolean,
    animKey: number,
    dir?: Slide["kenBurnsDirection"]
  ): { key: number; style: React.CSSProperties | undefined } => {
    const d = dir ?? "center";
    let name = "heroKbCenter";
    if (d === "top-left") name = "heroKbTopLeft";
    if (d === "bottom-right") name = "heroKbBottomRight";
    return {
      key: animKey,
      style: isActive
        ? { animation: name + " 6s ease-out forwards", willChange: "transform" }
        : undefined,
    };
  };

  return (
    <>
      <style>{`
        @keyframes heroKbCenter {
          from { transform: scale(1.00) translate(0%,0%); }
          to   { transform: scale(1.08) translate(0%,0%); }
        }
        @keyframes heroKbTopLeft {
          from { transform: scale(1.00) translate(0%,0%); }
          to   { transform: scale(1.08) translate(1.5%,1.5%); }
        }
        @keyframes heroKbBottomRight {
          from { transform: scale(1.00) translate(0%,0%); }
          to   { transform: scale(1.08) translate(-1.5%,-1.5%); }
        }
        @keyframes heroTextIn {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>

      <section
        style={{ marginTop: "-4rem", height: "100vh" }}
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-label="Hero slider"
      >
        {slides.map((slide, i) => {
          const isActive = i === current;
          const kb = kbStyle(isActive, animKeys[i], slide.kenBurnsDirection);
          return (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                opacity: isActive ? 1 : 0,
                transition: "opacity 0.8s ease",
                zIndex: isActive ? 1 : 0,
              }}
              aria-hidden={!isActive}
            >
              {slide.type === "video" ? (
                <video
                  ref={(el) => { videoRefs.current[i] = el; }}
                  src={slide.src}
                  poster={slide.posterSrc}
                  autoPlay
                  muted
                  playsInline
                  onEnded={() => advanceRef.current()}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                  }}
                />
              ) : (
                <div key={kb.key} className="absolute inset-0" style={kb.style}>
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="absolute inset-0 w-full h-full"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    loading={i === 0 ? "eager" : "lazy"}
                    draggable={false}
                  />
                </div>
              )}

              <div
                className="absolute inset-0"
                style={overlayStyle(slide.overlayVariant)}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center,transparent 35%,rgba(0,0,0,0.68) 100%)",
                }}
              />
            </div>
          );
        })}

        {/* LUDA logo — centered top overlay */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <Image
            src="/LUDA.gif"
            alt="LUDA"
            width={110}
            height={110}
            unoptimized
            draggable={false}
            style={{ opacity: 0.92 }}
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 pb-24 px-8 sm:px-14 lg:px-20 pointer-events-none">
          <div key={textKey} style={{ animation: "heroTextIn 0.55s ease 0.15s both" }}>
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight text-white mb-2 max-w-2xl"
              style={{
                textShadow: "0 2px 20px rgba(0,0,0,0.55),0 1px 4px rgba(0,0,0,0.85)",
              }}
            >
              {slides[current].headline}
            </h1>
            {slides[current].subtext && (
              <p
                className="text-sm sm:text-base font-bold tracking-[0.2em] uppercase text-white/75"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.75)" }}
              >
                {slides[current].subtext}
              </p>
            )}
          </div>
        </div>

        <div
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2"
          role="tablist"
          aria-label="Slide navigation"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              style={{
                width: i === current ? "26px" : "8px",
                height: "8px",
                borderRadius: "9999px",
                backgroundColor:
                  i === current
                    ? "rgba(255,255,255,0.95)"
                    : "rgba(255,255,255,0.38)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "all 0.3s ease",
                outline: "none",
              }}
            />
          ))}
        </div>
      </section>
    </>
  );
}
