import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { FlightLayer } from "@/components/layout/flight-layer";
import { Header } from "@/components/layout/header";
import { Menu } from "@/components/layout/menu";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { brand } from "@/data/copy";
import { asset } from "@/lib/paths";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
    images: [{ url: asset("/images/lineup/lineup-frente.jpg"), width: 1600, height: 900, alt: "Line-up da coleção O Renascer da Permanência" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={jakarta.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a
          href="#conteudo"
          className="label fixed left-2 top-2 z-[110] -translate-y-24 bg-fg px-4 py-3 text-bg focus:translate-y-0"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <div id="stage" className="min-h-dvh bg-bg">
          <main id="conteudo">{children}</main>
        </div>
        <FlightLayer />
        <Suspense fallback={null}>
          <Menu />
          <SmoothScroll />
        </Suspense>
      </body>
    </html>
  );
}
