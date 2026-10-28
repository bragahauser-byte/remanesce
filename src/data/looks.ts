/*
 * Os seis looks da coleção O Renascer da Permanência.
 * Imagens em public/images/roupas/roupa-N/ (frente/verso em jpg com fundo linho e webp sem fundo).
 * Para refazer os recortes: npm run recortar.
 */

import { asset } from "@/lib/paths";

export type Look = {
  number: number;
  slug: string;
  name: string;
  line: string;
  /** Descrição curta para alt e textos de apoio. */
  description: string;
  front: string;
  back: string;
  /** Recortes sem fundo (WebP transparente), para o carrossel 3D e composições. */
  cutout: { front: string; back: string };
  /** Largura × altura nativas das imagens. */
  size: { width: number; height: number };
};

const img = (n: number, side: "frente" | "verso", ext = "jpg") => asset(`/images/roupas/roupa-${n}/${side}.${ext}`);

export const looks: Look[] = [
  {
    number: 1,
    slug: "bractea",
    name: "Bráctea",
    line: "A pinha começa a se abrir.",
    description: "Top cropped de gola alta com escamas em um ombro e saia midi assimétrica com cascata de escamas e barra desfiada.",
    front: img(1, "frente"),
    back: img(1, "verso"),
    cutout: { front: img(1, "frente", "webp"), back: img(1, "verso", "webp") },
    size: { width: 219, height: 636 },
  },
  {
    number: 2,
    slug: "semente",
    name: "Semente",
    line: "Cada losango guarda o que vai nascer.",
    description: "Vestido midi de denim em recortes de losango, com travetes vermelhos em cada encontro e barra em pontas.",
    front: img(2, "frente"),
    back: img(2, "verso"),
    cutout: { front: img(2, "frente", "webp"), back: img(2, "verso", "webp") },
    size: { width: 273, height: 641 },
  },
  {
    number: 3,
    slug: "curiacu",
    name: "Curiaçu",
    line: "De pé, como a árvore que ele virou.",
    description: "Top frente única de gola camisa com zíper e pantalona de cintura alta com escamas descendo pelas laterais.",
    front: img(3, "frente"),
    back: img(3, "verso"),
    cutout: { front: img(3, "frente", "webp"), back: img(3, "verso", "webp") },
    size: { width: 261, height: 649 },
  },
  {
    number: 4,
    slug: "guacira",
    name: "Guacira",
    line: "O vermelho escondido sob as escamas.",
    description: "Top de ombro único coberto de escamas e saia longa de escamas com fenda e franjas vermelhas por baixo.",
    front: img(4, "frente"),
    back: img(4, "verso"),
    cutout: { front: img(4, "frente", "webp"), back: img(4, "verso", "webp") },
    size: { width: 192, height: 652 },
  },
  {
    number: 5,
    slug: "raiz",
    name: "Raiz",
    line: "O que corre por dentro, de geração em geração.",
    description: "Jaqueta bomber cropped com losangos vermelhos nas costuras, top faixa e calça wide leg com recortes em losango vermelho.",
    front: img(5, "frente"),
    back: img(5, "verso"),
    cutout: { front: img(5, "frente", "webp"), back: img(5, "verso", "webp") },
    size: { width: 234, height: 650 },
  },
  {
    number: 6,
    slug: "gralha",
    name: "Gralha",
    line: "Asas de escama, levando a semente adiante.",
    description: "Jaqueta cropped de ombros vazados com mangas de escamas forradas de vermelho e minissaia de escamas com pontas vermelhas.",
    front: img(6, "frente"),
    back: img(6, "verso"),
    cutout: { front: img(6, "frente", "webp"), back: img(6, "verso", "webp") },
    size: { width: 200, height: 634 },
  },
];

export const getLook = (n: number) => looks.find((l) => l.number === n);
