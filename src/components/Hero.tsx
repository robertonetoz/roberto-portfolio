"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { projects } from "@/lib/projects";
import { useMedia } from "./useMedia";
import { scrollToCenter } from "./SmoothScroll";

const ease = [0.16, 1, 0.3, 1] as const;

// 15 cells, the middle one is Roberto. Every other cell is a site he built.
const around = projects.filter((p) => p.slug !== "lorenabarbosa");
const cells = [...around.slice(0, 7), null, ...around.slice(7)];

function Letters({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.04em] whitespace-nowrap" aria-hidden>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block whitespace-pre"
          initial={{ y: "105%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1.1, delay: delay + i * 0.035, ease }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

function Portrait({ photo }: { photo: string | null }) {
  return (
    <div className="absolute top-[13%] left-1/2 aspect-[3/4] w-[66%] -translate-x-1/2 overflow-hidden rounded-t-full bg-ipe-roxo md:top-[12%] md:right-[9%] md:left-auto md:h-[62%] md:w-auto md:translate-x-0">
      {photo ? (
        <Image
          src={photo}
          alt="Foto de Roberto Campos Neto"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_100%,#cdb8ff_0%,#7c4dff_40%,#1a0b33_100%)]" />
      )}
    </div>
  );
}

export default function Hero({ photo }: { photo: string | null }) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const isDesktop = useMedia("(min-width: 768px)", true);

  const { scrollYProgress: rawProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  // Routed through a function so Motion keeps it in JS instead of a native ViewTimeline,
  // which mis-maps progress inside this pinned section.
  const scrollYProgress = useTransform(rawProgress, (v) => v);

  // Scale at which the centre cell covers the viewport, and scale at which the whole mosaic fits.
  const startScale = useMotionValue(5);
  const endScale = useMotionValue(1);

  useEffect(() => {
    function measure() {
      const grid = gridRef.current;
      const center = centerRef.current;
      if (!grid || !center) return;
      const W = window.innerWidth;
      const H = window.innerHeight;
      startScale.set(Math.max(W / center.offsetWidth, H / center.offsetHeight) * 1.002);
      const fitH = W >= 768 ? 0.66 : 0.52;
      endScale.set(Math.min(1, (0.92 * W) / grid.offsetWidth, (fitH * H) / grid.offsetHeight));
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [startScale, endScale, isDesktop]);

  const zoom = useTransform(scrollYProgress, [0.05, 0.72], [0, 1], { clamp: true });
  // Exponential interpolation so the zoom feels even rather than rushing at the end.
  const scale = useTransform([zoom, startScale, endScale], ([z, s, e]: number[]) =>
    reduce ? s : s * Math.pow(e / s, z),
  );

  // The name stretches open on load, then compresses away as the mosaic appears.
  const peak = isDesktop ? 138 : 96;
  const loadWidth = useMotionValue(50);
  useEffect(() => {
    const controls = animate(loadWidth, peak, { duration: 1.6, delay: 0.5, ease });
    return () => controls.stop();
  }, [loadWidth, peak]);
  const nameWidth = useTransform([loadWidth, scrollYProgress], ([l, p]: number[]) => {
    const t = Math.min(1, Math.max(0, p / 0.3));
    return `'wdth' ${reduce ? peak : l - (l - 50) * t}`;
  });
  const nameOpacity = useTransform(scrollYProgress, [0.12, 0.32], [1, 0]);
  const nameY = useTransform(scrollYProgress, [0, 0.32], ["0vh", "-12vh"]);
  const captionOpacity = useTransform(scrollYProgress, [0.68, 0.85], [0, 1]);
  const captionY = useTransform(scrollYProgress, [0.68, 0.85], [24, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  const tileLabel = useTransform(zoom, [0.75, 1], [0, 1]);
  // Lift the finished mosaic so the caption fits underneath (more on tall phone screens).
  const shiftY = useTransform(zoom, (z) =>
    typeof window === "undefined" ? 0 : -z * window.innerHeight * (window.innerWidth >= 768 ? 0.03 : 0.12),
  );

  return (
    <section
      id="inicio"
      ref={sectionRef}
      data-season="preto"
      className={reduce ? "relative" : "relative h-[300svh] md:h-[340vh]"}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Mosaic */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            ref={gridRef}
            style={{ scale, y: shiftY }}
            className="grid w-[92vw] shrink-0 grid-cols-3 gap-2 will-change-transform md:w-[min(92vw,1500px)] md:grid-cols-5 md:gap-3"
          >
            {cells.map((p, i) =>
              p ? (
                <a
                  key={p.slug}
                  href={`#p-${p.slug}`}
                  aria-label={`Ver ${p.name} na lista de projetos`}
                  tabIndex={-1}
                  onClick={(e) => {
                    const row = document.getElementById(`p-${p.slug}`);
                    if (!row) return;
                    e.preventDefault();
                    scrollToCenter(row);
                  }}
                  className="relative block aspect-[390/844] overflow-hidden rounded-[10px] bg-black/30 md:aspect-[16/10] md:rounded-[8px]"
                >
                  <Image
                    src={`/projects/${p.slug}-mobile.jpg`}
                    alt=""
                    fill
                    sizes="40vw"
                    className="object-cover object-top md:hidden"
                  />
                  <Image
                    src={`/projects/${p.slug}.jpg`}
                    alt=""
                    fill
                    sizes="30vw"
                    className="hidden object-cover object-top md:block"
                  />
                </a>
              ) : (
                <div
                  key={`me-${i}`}
                  ref={centerRef}
                  className="relative aspect-[390/844] overflow-hidden rounded-[10px] bg-bg md:aspect-[16/10] md:rounded-[8px]"
                >
                  <Portrait photo={photo} />
                  <motion.div
                    style={{ opacity: tileLabel }}
                    className="hairline absolute inset-0 rounded-[inherit] border"
                    aria-hidden
                  >
                    <span className="absolute bottom-[7%] left-[7%] font-display text-[11px] leading-tight font-bold [font-variation-settings:'wdth'_120] md:text-[15px]">
                      Roberto
                      <br />
                      Campos Neto
                    </span>
                  </motion.div>
                </div>
              ),
            )}
          </motion.div>
        </div>

        {/* Name over the portrait */}
        <motion.div
          style={{ opacity: reduce ? 1 : nameOpacity, y: reduce ? 0 : nameY }}
          className="pointer-events-none absolute inset-0 flex flex-col justify-end px-4 pb-[7svh] sm:px-8 md:pb-[9vh]"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mb-4 max-w-[28ch] text-lg leading-snug md:mb-6 md:text-xl"
          >
            Desenvolvedor web em Uberlândia, MG
          </motion.p>
          <motion.h1
            style={{ fontVariationSettings: nameWidth, fontSize: isDesktop ? "9.2vw" : "11.6vw" }}
            className="font-display leading-[0.84] font-extrabold tracking-[-0.02em]"
          >
            <span className="sr-only">Roberto Campos Neto</span>
            <Letters text="Roberto" delay={0.15} />
            <Letters text="Campos Neto" delay={0.3} />
          </motion.h1>
        </motion.div>

        {!reduce && (
          <motion.p
            style={{ opacity: hintOpacity }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute right-4 bottom-[3svh] text-sm sm:right-8 md:bottom-[4vh]"
          >
            Role para ver os sites
          </motion.p>
        )}

        {/* Caption once the mosaic is complete */}
        <motion.div
          style={{ opacity: reduce ? 0 : captionOpacity, y: reduce ? 0 : captionY }}
          className="absolute inset-x-0 bottom-0 px-4 pb-[5svh] sm:px-8 md:pb-[5vh]"
        >
          <div className="mx-auto flex max-w-[min(92vw,1500px)] flex-col justify-between gap-4 md:flex-row md:items-end">
            <p className="max-w-[44ch] text-lg leading-snug md:text-xl">
              {projects.length} sites feitos para clínicas, estúdios de tatuagem, academias,
              incorporadoras e empresas de Uberlândia e região.
            </p>
            <a
              href="#projetos"
              className="self-start rounded-full bg-fg px-6 py-3 text-base font-medium text-bg transition-opacity hover:opacity-85 md:self-auto"
            >
              Conhecer os projetos
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
