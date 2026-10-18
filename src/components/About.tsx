"use client";

import { motion } from "motion/react";
import Stretch from "./Stretch";

const ease = [0.16, 1, 0.3, 1] as const;

const intro =
  "Sou desenvolvedor web, formado em Análise e Desenvolvimento de Sistemas pelo IMEPAC. Faço sites institucionais, landing pages, lojas virtuais e automações, e uso inteligência artificial no dia a dia para entregar mais rápido sem perder o cuidado com os detalhes.";

const tools = [
  { group: "Frontend", items: "HTML5, CSS3, Tailwind CSS, JavaScript, React e Next.js" },
  { group: "CMS e lojas", items: "WordPress, WooCommerce, Elementor e Shopify" },
  { group: "Backend", items: "Java, SQL e bancos de dados relacionais" },
  { group: "Automações", items: "n8n, APIs e fluxos automatizados" },
  { group: "No dia a dia", items: "Git, GitHub, Figma, Claude e Codex" },
];

const education = [
  { period: "2023 a 2025", title: "Análise e Desenvolvimento de Sistemas", place: "IMEPAC" },
  { period: "2023 a 2024", title: "Inglês do básico ao avançado", place: "Aliança América" },
  { period: "2016 a 2018", title: "Curso de inglês", place: "IMEPAC" },
];

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 1 }}
      className="hairline grid gap-4 border-t py-8 md:grid-cols-[1fr_1.7fr] md:py-10"
    >
      <dt className="font-display text-2xl font-semibold [font-variation-settings:'wdth'_110] md:text-[28px]">
        {label}
      </dt>
      <dd>{children}</dd>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="sobre" data-season="branco" className="px-4 pt-[22vh] pb-[16vh] sm:px-8">
      <div className="mx-auto max-w-[1500px]">
        <Stretch
          from={50}
          to={135}
          className="text-[clamp(3.6rem,13vw,12rem)] leading-[0.82] font-extrabold tracking-[-0.02em]"
        >
          Sobre
        </Stretch>

        <div className="mt-[9vh] grid md:grid-cols-[1fr_1.7fr]">
          <motion.p
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ staggerChildren: 0.025 }}
            className="max-w-[34ch] text-[1.45rem] leading-[1.28] font-medium tracking-[-0.015em] md:col-start-2 md:text-[2.15rem]"
          >
            {intro.split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-top">
                <motion.span
                  className="inline-block"
                  variants={{ hidden: { y: "105%" }, shown: { y: 0 } }}
                  transition={{ duration: 0.9, ease }}
                >
                  {word}&nbsp;
                </motion.span>
              </span>
            ))}
          </motion.p>
        </div>

        <dl className="mt-[12vh]">
          <Row label="Hoje">
            <p className="text-lg font-medium md:text-xl">Analista de Sistemas Jr na Edge Solutions</p>
            <p className="muted mt-3 max-w-[56ch] text-base leading-relaxed md:text-lg">
              Desenvolvo sites institucionais em WordPress, landing pages focadas em conversão e
              interfaces com React, Next.js e Tailwind CSS. Também crio e mantenho lojas na Shopify e
              monto automações com n8n.
            </p>
          </Row>

          <Row label="Ferramentas">
            <ul className="space-y-3">
              {tools.map((t) => (
                <li key={t.group} className="grid gap-1 text-base md:grid-cols-[160px_1fr] md:text-lg">
                  <span className="muted">{t.group}</span>
                  <span>{t.items}</span>
                </li>
              ))}
            </ul>
          </Row>

          <Row label="Formação">
            <ol className="space-y-6">
              {education.map((e) => (
                <li key={e.title + e.period} className="grid gap-1 md:grid-cols-[160px_1fr]">
                  <span className="muted text-base md:text-lg">{e.period}</span>
                  <span>
                    <span className="block text-lg font-medium md:text-xl">{e.title}</span>
                    <span className="muted block text-base">{e.place}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Row>

          <Row label="Como trabalho">
            <p className="max-w-[56ch] text-base leading-relaxed md:text-lg">
              Aprendo rápido, gosto de resolver problemas e de entender o negócio de quem está do
              outro lado. Um site bom, para mim, é o que faz o cliente certo entrar em contato.
            </p>
          </Row>
        </dl>
      </div>
    </section>
  );
}
