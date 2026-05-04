import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import video1 from "@/assets/dochub1.mp4";
import video2 from "@/assets/dochub2.mp4";
import video3 from "@/assets/dochub3.mp4";
import video4 from "@/assets/dochub4.mp4";

const videos = [video1, video2, video3, video4];
const ROTATE_MS = 8000;

interface HeroVideoCarouselProps {
  className?: string;
}

export default function HeroVideoCarousel({ className = "" }: HeroVideoCarouselProps) {
  const [active, setActive] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setActive((v) => (v + 1) % videos.length);
    }, ROTATE_MS);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  const goTo = (i: number) => {
    setActive(i);
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setActive((v) => (v + 1) % videos.length);
    }, ROTATE_MS);
  };

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <AnimatePresence mode="sync">
        <motion.video
          key={active}
          src={videos[active]}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{
            opacity: { duration: 1.6, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: ROTATE_MS / 1000 + 1.6, ease: "linear" },
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/70 to-primary/95" />
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/60 via-transparent to-accent/25" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_hsl(var(--primary)/0.4)_70%,_hsl(var(--primary)/0.85)_100%)]" />

      {/* Soft grain / noise */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />

      {/* Indicators */}
      <div className="pointer-events-auto absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {videos.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir para o vídeo ${i + 1}`}
            onClick={() => goTo(i)}
            className="group relative h-1.5 overflow-hidden rounded-full bg-white/25 transition-all"
            style={{ width: active === i ? 40 : 16 }}
          >
            {active === i && (
              <motion.span
                key={active}
                className="absolute inset-y-0 left-0 bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: ROTATE_MS / 1000, ease: "linear" }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
