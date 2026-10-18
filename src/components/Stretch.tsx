"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * The page's signature motion: display type whose width axis (Anybody, 50–150)
 * stretches open as it scrolls into view.
 */
export default function Stretch({
  children,
  from = 50,
  to = 130,
  className,
  style,
  as = "h2",
}: {
  children: React.ReactNode;
  from?: number;
  to?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 35%"] });
  const settings = useTransform(scrollYProgress, [0, 1], [`'wdth' ${from}`, `'wdth' ${to}`]);
  const Tag = motion[as];

  return (
    <Tag
      ref={ref as never}
      className={`font-display ${className ?? ""}`}
      style={{ ...style, fontVariationSettings: reduce ? `'wdth' ${to}` : settings }}
    >
      {children}
    </Tag>
  );
}
