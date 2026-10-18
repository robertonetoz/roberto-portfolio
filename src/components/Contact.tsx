"use client";

import { useState } from "react";
import Stretch from "./Stretch";

const email = "robertoneto.campos@gmail.com";

const socials = [
  { label: "Instagram", handle: "@robertonetoz", href: "https://www.instagram.com/robertonetoz/" },
  { label: "LinkedIn", handle: "in/robertocamposneto", href: "https://www.linkedin.com/in/robertocamposneto" },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <section
      id="contato"
      data-season="rosa"
      className="flex min-h-[100svh] flex-col px-4 pt-[20vh] pb-6 sm:px-8"
    >
      <div className="mx-auto flex w-full max-w-[1500px] flex-1 flex-col">
        <Stretch
          from={50}
          to={118}
          className="text-[clamp(3.4rem,10.5vw,10rem)] leading-[0.82] font-extrabold tracking-[-0.02em]"
        >
          Vamos fazer
          <br />o seu site?
        </Stretch>

        <p className="mt-10 max-w-[44ch] text-lg leading-snug md:text-xl">
          Conte o que você precisa: site novo, reformulação, landing page ou loja virtual. Eu
          respondo pessoalmente.
        </p>

        <div className="mt-[10vh]">
          <a href={`mailto:${email}`} className="group inline-block max-w-full">
            <Stretch
              as="span"
              from={50}
              to={72}
              className="block text-[clamp(1.5rem,6.6vw,6.2rem)] leading-none font-bold tracking-[-0.01em] break-all underline decoration-[0.06em] underline-offset-[0.14em] group-hover:decoration-[0.1em]"
            >
              {email}
            </Stretch>
          </a>
          <button
            onClick={copy}
            className="mt-6 block rounded-full border-2 border-current px-5 py-2.5 text-base font-medium transition-colors hover:bg-fg hover:text-bg"
          >
            <span aria-live="polite">{copied ? "E-mail copiado" : "Copiar e-mail"}</span>
          </button>
        </div>

        <ul className="mt-[10vh] mb-[10vh] flex flex-col gap-6 sm:flex-row sm:gap-16">
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="group block">
                <span className="block font-display text-3xl font-bold [font-variation-settings:'wdth'_100] transition-[font-variation-settings] duration-500 group-hover:[font-variation-settings:'wdth'_135] md:text-4xl">
                  {s.label}
                </span>
                <span className="mt-1 block text-base opacity-75">{s.handle}</span>
              </a>
            </li>
          ))}
        </ul>

        <footer className="hairline mt-auto flex flex-col gap-2 border-t pt-6 text-[15px] opacity-80 md:flex-row md:justify-between">
          <p>© Roberto Campos Neto</p>
          <p className="max-w-[60ch] md:text-right">
            As cores mudam como os ipês de Uberlândia, que florescem roxos, amarelos e brancos entre
            junho e setembro.
          </p>
        </footer>
      </div>
    </section>
  );
}
