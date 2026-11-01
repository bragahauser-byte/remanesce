/*
 * Os seis looks da coleção O Renascer da Permanência.
 * Fotos em public/images/pecas/<look>/ (geradas por `npm run imagens` a partir de
 * "modelos e roupas/"): frente e atrás com a modelo, e as peças sozinhas sobre branco.
 * O Curiaçu ainda usa o recorte antigo (public/images/roupas/roupa-3/): a pasta de
 * origem dele veio com as fotos do Semente.
 */

import { asset } from "@/lib/paths";

export type Look = {
  number: number;
  slug: string;
  name: string;
  line: string;
  /** Descrição curta para alt e textos de apoio. */
  description: string;
  /** Foto de frente e de costas do look inteiro. */
  front: string;
  back: string;
  /**
   * "cover": foto quadrada de estúdio, preenche a moldura (só o fundo fica de fora).
   * "contain": recorte sem fundo, flutua sobre o painel.
   */
  fit: "cover" | "contain";
};

/** Foto da pasta de um look (versão de 1600 px; a de 800 px entra pelo srcset). */
export const photo = (look: string, name: string) => asset(`/images/pecas/${look}/${name}-1600.webp`);

const cutout = (n: number, side: "frente" | "verso") => asset(`/images/roupas/roupa-${n}/${side}.webp`);

export const looks: Look[] = [
  {
    number: 1,
    slug: "bractea",
    name: "Bráctea",
    line: "A pinha começa a se abrir.",
    description: "Top cropped de gola alta com escamas em um ombro e saia midi assimétrica com cascata de escamas e barra desfiada.",
    front: photo("bractea", "frente"),
    back: photo("bractea", "atras"),
    fit: "cover",
  },
  {
    number: 2,
    slug: "semente",
    name: "Semente",
    line: "Cada losango guarda o que vai nascer.",
    description: "Vestido midi de denim em recortes de losango, com travetes vermelhos em cada encontro e barra em pontas.",
    front: photo("semente", "frente"),
    back: photo("semente", "atras"),
    fit: "cover",
  },
  {
    number: 3,
    slug: "curiacu",
    name: "Curiaçu",
    line: "De pé, como a árvore que ele virou.",
    description: "Top frente única de gola camisa com zíper e pantalona de cintura alta com escamas descendo pelas laterais.",
    front: cutout(3, "frente"),
    back: cutout(3, "verso"),
    fit: "contain",
  },
  {
    number: 4,
    slug: "guacira",
    name: "Guacira",
    line: "O vermelho escondido sob as escamas.",
    description: "Top de ombro único coberto de escamas e saia longa de escamas com fenda e franjas vermelhas por baixo.",
    front: photo("guacira", "frente"),
    back: photo("guacira", "atras"),
    fit: "cover",
  },
  {
    number: 5,
    slug: "raiz",
    name: "Raiz",
    line: "O que corre por dentro, de geração em geração.",
    description: "Jaqueta bomber cropped com losangos vermelhos nas costuras, top faixa e calça wide leg com recortes em losango vermelho.",
    front: photo("raiz", "frente"),
    back: photo("raiz", "atras"),
    fit: "cover",
  },
  {
    number: 6,
    slug: "gralha",
    name: "Gralha",
    line: "Asas de escama, levando a semente adiante.",
    description: "Jaqueta cropped de ombros vazados com mangas de escamas forradas de vermelho e minissaia de escamas com pontas vermelhas.",
    front: photo("gralha", "frente"),
    back: photo("gralha", "atras"),
    fit: "cover",
  },
];

export const getLook = (n: number) => looks.find((l) => l.number === n);
