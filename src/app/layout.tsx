import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Bodoni_Moda, IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import { Cursor } from "@/components/layout/cursor";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Menu } from "@/components/layout/menu";
import { MobileNav } from "@/components/layout/mobile-nav";
import { PageTransition } from "@/components/layout/page-transition";
import { BagDrawer } from "@/components/shop/bag-drawer";
import { SearchOverlay } from "@/components/shop/search-overlay";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { GrainOverlay } from "@/components/brand/textures";
import { brand } from "@/data/copy";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: {
    default: `${brand.name} · ${brand.signature}`,
    template: `%s · ${brand.name}`,
  },
  description: brand.description,
  applicationName: brand.name,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: brand.name,
    title: `${brand.name} · ${brand.collection}`,
    description: brand.description,
    images: [{ url: "/images/lineup/lineup-frente.jpg", width: 1600, height: 900, alt: "Line-up da coleção O Renascer da Permanência" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#F1EDE4",
};

export default function RootLayout({ children, modal }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${bodoni.variable} ${plexMono.variable} ${instrument.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="label fixed left-4 top-4 z-[110] -translate-y-24 bg-indigo px-4 py-3 text-linho focus:translate-y-0"
        >
          Pular para o conteúdo
        </a>
        <Header />
        {/* Componentes que leem a rota: em rotas dinâmicas, entram por streaming. */}
        <Suspense fallback={null}>
          <Menu />
          <SearchOverlay />
          <BagDrawer />
        </Suspense>
        <main id="conteudo" className="min-h-[70vh]">
          {children}
        </main>
        <Footer />
        {modal}
        <Suspense fallback={null}>
          <MobileNav />
          <PageTransition />
        </Suspense>
        <SmoothScroll />
        <Cursor />
        <GrainOverlay />
      </body>
    </html>
  );
}
