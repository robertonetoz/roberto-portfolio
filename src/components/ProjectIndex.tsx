"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { projects, type Project } from "@/lib/projects";
import Stretch from "./Stretch";

const ease = [0.16, 1, 0.3, 1] as const;

function joinPt(items: string[]) {
  return items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} e ${items.at(-1)}`;
}

function host(url: string) {
  return new URL(url).host.replace(/^www\./, "");
}

function Shot({ project, pan }: { project: Project; pan: MotionValue<number> }) {
  // The full-page capture scrolls inside the window while its row crosses the middle of the screen.
  const end = -(1 - 900 / project.fullHeight) * 100;
  const y = useTransform(pan, [0, 1], ["0%", `${end}%`]);

  return (
    <div className="relative h-full">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[14px] bg-aubergine md:rounded-[18px]">
        <motion.div
          className="absolute inset-x-0 top-0 will-change-transform"
          style={{ y, aspectRatio: `1440 / ${project.fullHeight}` }}
        >
          <Image
            src={`/projects/${project.slug}-full.jpg`}
            alt={`Página do site ${project.name}`}
            fill
            unoptimized
            className="object-cover object-top"
          />
        </motion.div>
      </div>
      <div className="absolute top-[42%] left-[4%] w-[21%] overflow-hidden rounded-[12px] border-[3px] border-[#16040f] bg-aubergine shadow-[0_24px_48px_-16px_rgb(0_0_0/0.6)] md:top-[44%] md:rounded-[22px] md:border-[6px]">
        <div className="relative aspect-[390/844]">
          <Image
            src={`/projects/${project.slug}-mobile.jpg`}
            alt=""
            fill
            unoptimized
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}

const wipe = {
  enter: (dir: number) => ({
    clipPath: dir > 0 ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
    zIndex: 2,
  }),
  center: { clipPath: "inset(0% 0% 0% 0%)", zIndex: 2 },
  exit: { zIndex: 1, transition: { duration: 0.9 } },
};

function Row({
  project,
  index,
  active,
  onActive,
  pan,
}: {
  project: Project;
  index: number;
  active: boolean;
  onActive: (i: number) => void;
  pan: MotionValue<number>;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > 0 && v < 1) {
      onActive(index);
      pan.set(v);
    }
  });

  return (
    <li
      id={`p-${project.slug}`}
      ref={ref}
      className="hairline flex h-[max(44svh,330px)] flex-col border-t pt-5 md:h-[max(36vh,360px)] md:pt-7"
    >
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="block self-start">
        <motion.span
          className={`block font-display text-[clamp(2.1rem,4.6vw,4.8rem)] leading-[0.9] font-bold tracking-[-0.01em] transition-[color,opacity] duration-700 ${
            active ? "text-accent opacity-100" : "opacity-35"
          }`}
          initial={false}
          animate={{ fontVariationSettings: active ? "'wdth' 122" : "'wdth' 58" }}
          transition={{ duration: 0.8, ease }}
        >
          {project.name}
        </motion.span>
        <span className="sr-only"> (abre o site em nova aba)</span>
      </a>
      <p className="mt-3 text-base md:text-lg">
        {project.kind}
        {project.city && <span className="muted">, {project.city}</span>}
      </p>
      <div
        className={`transition-opacity duration-700 ${active ? "opacity-100" : "opacity-0"}`}
        aria-hidden={!active}
      >
        <p className="mt-4 max-w-[46ch] text-base leading-relaxed md:text-lg">{project.description}</p>
        <p className="muted mt-3 text-[15px]">Feito com {joinPt(project.stack)}</p>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={active ? 0 : -1}
          className="mt-4 inline-block text-[15px] font-medium underline decoration-1 underline-offset-[6px] hover:decoration-2"
        >
          Abrir {host(project.url)}
        </a>
      </div>
    </li>
  );
}

export default function ProjectIndex() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const pan = useMotionValue(0);
  const activeRef = useRef(0);

  function onActive(i: number) {
    if (activeRef.current === i) return;
    setDir(i > activeRef.current ? 1 : -1);
    activeRef.current = i;
    setActive(i);
  }

  // Warm the cache so the preview wipes in without waiting on the network.
  useEffect(() => {
    const id = window.setTimeout(() => {
      for (const p of projects) {
        new window.Image().src = `/projects/${p.slug}-full.jpg`;
        new window.Image().src = `/projects/${p.slug}-mobile.jpg`;
      }
    }, 2500);
    return () => window.clearTimeout(id);
  }, []);

  const current = projects[active];

  return (
    <section id="projetos" data-season="roxo" className="relative px-4 pt-[18vh] sm:px-8">
      <div className="mx-auto max-w-[1500px]">
        <header className="grid gap-8 pb-[10vh] md:grid-cols-[1.15fr_1fr] md:items-end">
          <Stretch
            from={50}
            to={128}
            className="text-[clamp(3.6rem,12vw,11rem)] leading-[0.82] font-extrabold tracking-[-0.02em]"
          >
            Os sites
          </Stretch>
          <p className="muted max-w-[40ch] text-lg leading-relaxed md:pb-4">
            Alguns já estão no ar com domínio próprio, outros estão prontos para publicar. Toque no
            nome para abrir o site.
          </p>
        </header>

        <div className="grid md:grid-cols-[1fr_1.1fr] md:gap-14">
          <div className="sticky top-14 z-10 order-first -mx-4 self-start bg-bg px-4 pt-3 pb-4 md:top-[16vh] md:order-last md:mx-0 md:bg-transparent md:p-0">
            <div className="relative h-[34svh] md:h-[68vh]">
              <AnimatePresence initial={false} custom={dir}>
                <motion.div
                  key={current.slug}
                  custom={dir}
                  variants={wipe}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.85, ease }}
                  className="absolute inset-0"
                >
                  <Shot project={current} pan={pan} />
                </motion.div>
              </AnimatePresence>
              <p className="muted absolute right-0 bottom-0 hidden text-[15px] md:block" aria-live="polite">
                {host(current.url)}
              </p>
            </div>
          </div>

          <ol className="pb-[24vh]">
            {projects.map((p, i) => (
              <Row key={p.slug} project={p} index={i} active={active === i} onActive={onActive} pan={pan} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
