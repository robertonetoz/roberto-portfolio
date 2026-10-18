"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";

const links = [
  { href: "#projetos", label: "Projetos" },
  { href: "#sobre", label: "Sobre" },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) =>
    setSolid(y > (document.getElementById("inicio")?.offsetHeight ?? 0) - window.innerHeight * 0.6),);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.4 }}
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,backdrop-filter] duration-500 ${
        solid ? "bg-bg/95 backdrop-blur-md" : ""
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-[1500px] items-center justify-between px-4 sm:h-16 sm:px-8">
        <a href="#inicio" className="font-display text-[17px] font-bold [font-variation-settings:'wdth'_112]">
          Roberto Campos Neto
        </a>
        <div className="flex items-center gap-5 sm:gap-7">
          <ul className="hidden gap-7 text-[15px] sm:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="underline-offset-[6px] hover:underline">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contato"
            className="rounded-full bg-fg px-4 py-2 text-[15px] font-medium text-bg transition-opacity hover:opacity-85"
          >
            Fale comigo
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
