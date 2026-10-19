import type { Metadata } from "next";
import { Anybody, Instrument_Sans } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Seasons from "@/components/Seasons";
import "./globals.css";

const anybody = Anybody({
  variable: "--font-anybody",
  subsets: ["latin"],
  axes: ["wdth"],
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Roberto Campos Neto | Desenvolvedor Web em Uberlândia",
  description:
    "Portfólio de Roberto Campos Neto, desenvolvedor web em Uberlândia, MG. Sites para clínicas, estúdios, academias, incorporadoras e empresas, com Next.js, React, Tailwind CSS e WordPress.",
  openGraph: {
    title: "Roberto Campos Neto | Desenvolvedor Web",
    description:
      "Sites para clínicas, estúdios, academias, incorporadoras e empresas de Uberlândia e região.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" data-season="cerrado" className={`${anybody.variable} ${instrument.variable}`}>
      <body className="min-h-full">
        <SmoothScroll />
        <Seasons />
        {children}
      </body>
    </html>
  );
}
