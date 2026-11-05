/*
 * Os seis looks da coleção O Renascer da Permanência.
 * Fotos em public/images/pecas/<look>/ (geradas por `npm run imagens` a partir de
 * "modelos e roupas/"): frente e atrás com a modelo, e as peças sozinhas sobre branco.
 * A ordem aqui é a numeração da coleção (códigos RMN-0N); a ordem da vitrine fica em
 * collection.ts.
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
  /** Texto longo do look (a declaração grande que rola ao lado do título). */
  manifesto: string;
  /**
   * Filme do look em tela cheia. Enquanto o vídeo não chega, só o quadro (poster);
   * quando houver, basta preencher `video` com o caminho do .mp4 em public/.
   */
  film: { poster: string; video?: string };
};

/** Foto da pasta de um look (versão de 1600 px; a de 800 px entra pelo srcset). */
export const photo = (look: string, name: string) => asset(`/images/pecas/${look}/${name}-1600.webp`);

/** Quadro do filme (2400 px; a versão de 1600 entra pelo srcset). */
const film = (look: string) => ({ poster: asset(`/images/pecas/${look}/filme-2400.webp`) });

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
    manifesto:
      "As brácteas são as escamas que protegem a pinha antes de ela se abrir. Aqui elas descem em cascata por um ombro só e pela saia, cortadas uma a uma de retalhos de denim. A barra desfiada é o tempo agindo: a peça não termina na costura, continua no uso, como a árvore que muda de forma sem deixar de ser a mesma.",
    film: film("bractea"),
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
    manifesto:
      "Cada losango é uma semente guardada. O vestido é montado em recortes que se encontram em travetes vermelhos, pequenos pontos de vida presos no denim. Nada nele é liso por acaso: as pontas da barra lembram a pinha madura, pronta para soltar o que carrega e começar de novo em outro lugar.",
    film: film("semente"),
  },
  {
    number: 3,
    slug: "curiacu",
    name: "Curiaçu",
    line: "De pé, como a árvore que ele virou.",
    description: "Top frente única de gola camisa com zíper e pantalona de cintura alta com escamas descendo pelas laterais.",
    front: photo("curiacu", "frente"),
    back: photo("curiacu", "atras"),
    fit: "cover",
    manifesto:
      "Curiaçu era o mais alto da tribo e, ferido, virou a primeira araucária. O look fica de pé como ele: um top frente única de gola camisa e uma pantalona de cintura alta com escamas descendo pelas laterais, como galhos que parecem flechas cravadas no tronco. Força e sacrifício na mesma linha vertical.",
    film: film("curiacu"),
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
    manifesto:
      "Guacira procurou Curiaçu na mata e nunca o encontrou; Tupã a transformou em gralha-azul. Por fora, escamas de denim; por baixo, o vermelho que só aparece quando a saia se abre na fenda. É a memória que não se mostra inteira, mas sustenta tudo o que está à vista.",
    film: film("guacira"),
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
    manifesto:
      "O vermelho corre pelas costuras como seiva. Os losangos ficam embutidos na jaqueta e na calça e só aparecem quando o corpo se move: o que passa de geração em geração não se mostra inteiro de uma vez. Raiz é o look da herança, do que vem de baixo e segura a árvore de pé por dois séculos.",
    film: film("raiz"),
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
    manifesto:
      "A gralha enterra pinhões pensando que são gotas do sangue de Curiaçu, e assim planta florestas sem saber. A jaqueta tem os ombros vazados e mangas de escamas forradas de vermelho, como asas abertas; a minissaia termina em pontas vermelhas. É o look do movimento: levar a semente adiante.",
    film: film("gralha"),
  },
];

export const getLook = (n: number) => looks.find((l) => l.number === n);
