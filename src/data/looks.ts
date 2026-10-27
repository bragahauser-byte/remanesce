/*
 * Os seis looks da coleção O Renascer da Permanência.
 * Imagens em public/images/looks/look-0N-frente.jpg e -costas.jpg (o look inteiro).
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
  /** Largura × altura nativas das imagens. */
  size: { width: number; height: number };
};

const img = (n: number, side: "frente" | "costas") => asset(`/images/looks/look-0${n}-${side}.jpg`);

export const looks: Look[] = [
  {
    number: 1,
    slug: "bractea",
    name: "Bráctea",
    line: "A pinha começa a se abrir.",
    description: "Top cropped de gola alta com escamas em um ombro e saia midi assimétrica com cascata de escamas e barra desfiada.",
    front: img(1, "frente"),
    back: img(1, "costas"),
    size: { width: 282, height: 660 },
  },
  {
    number: 2,
    slug: "semente",
    name: "Semente",
    line: "Cada losango guarda o que vai nascer.",
    description: "Vestido midi de denim em recortes de losango, com travetes vermelhos em cada encontro e barra em pontas.",
    front: img(2, "frente"),
    back: img(2, "costas"),
    size: { width: 258, height: 660 },
  },
  {
    number: 3,
    slug: "curiacu",
    name: "Curiaçu",
    line: "De pé, como a árvore que ele virou.",
    description: "Top frente única de gola camisa com zíper e pantalona de cintura alta com escamas descendo pelas laterais.",
    front: img(3, "frente"),
    back: img(3, "costas"),
    size: { width: 250, height: 660 },
  },
  {
    number: 4,
    slug: "guacira",
    name: "Guacira",
    line: "O vermelho escondido sob as escamas.",
    description: "Top de ombro único coberto de escamas e saia longa de escamas com fenda e franjas vermelhas por baixo.",
    front: img(4, "frente"),
    back: img(4, "costas"),
    size: { width: 240, height: 660 },
  },
  {
    number: 5,
    slug: "raiz",
    name: "Raiz",
    line: "O que corre por dentro, de geração em geração.",
    description: "Jaqueta bomber cropped com losangos vermelhos nas costuras, top faixa e calça wide leg com recortes em losango vermelho.",
    front: img(5, "frente"),
    back: img(5, "costas"),
    size: { width: 270, height: 660 },
  },
  {
    number: 6,
    slug: "gralha",
    name: "Gralha",
    line: "Asas de escama, levando a semente adiante.",
    description: "Jaqueta cropped de ombros vazados com mangas de escamas forradas de vermelho e minissaia de escamas com pontas vermelhas.",
    front: img(6, "frente"),
    back: img(6, "costas"),
    size: { width: 300, height: 660 },
  },
];

export const getLook = (n: number) => looks.find((l) => l.number === n);
