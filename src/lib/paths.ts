/** Prefixo do site (vazio na Vercel, "/remanesce" no GitHub Pages). */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://remanesce.vercel.app";

/** Caminho de arquivo em /public com o prefixo do site (next/image não aplica o basePath sozinho). */
export const asset = (path: string) => `${BASE_PATH}${path}`;

/** Remove o prefixo de um pathname do navegador para usar no router do Next. */
export const stripBase = (pathname: string) =>
  BASE_PATH && pathname.startsWith(BASE_PATH) ? pathname.slice(BASE_PATH.length) || "/" : pathname;
