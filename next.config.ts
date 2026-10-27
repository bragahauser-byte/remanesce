import type { NextConfig } from "next";

/*
 * Dois alvos de deploy:
 * - padrão (Vercel / next start): servidor Next normal.
 * - DEPLOY_TARGET=pages: export estático para o GitHub Pages em /remanesce.
 */
const pages = process.env.DEPLOY_TARGET === "pages";
const basePath = pages ? "/remanesce" : "";

const nextConfig: NextConfig = {
  output: pages ? "export" : undefined,
  basePath,
  images: { unoptimized: pages },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: pages ? "https://bragahauser-byte.github.io/remanesce" : "https://remanesce.vercel.app",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
