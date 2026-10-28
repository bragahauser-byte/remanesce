/*
 * Catálogo da coleção O Renascer da Permanência.
 * Preços em centavos e são sugestões: edite aqui. Estoques são fictícios.
 * Imagens: cada peça usa a foto do look inteiro ("look") e recortes dela ("detalhe")
 * com objectPosition + zoom. Para trocar por fotos de editorial, troque os `src`.
 */

import { asset } from "@/lib/paths";
import { looks } from "./looks";

export type Category = "tops" | "saias" | "calcas" | "vestidos" | "jaquetas" | "acessorios";

export const categories: { key: Category; label: string; singular: string }[] = [
  { key: "tops", label: "Tops", singular: "Top" },
  { key: "saias", label: "Saias", singular: "Saia" },
  { key: "calcas", label: "Calças", singular: "Calça" },
  { key: "vestidos", label: "Vestidos", singular: "Vestido" },
  { key: "jaquetas", label: "Jaquetas", singular: "Jaqueta" },
  { key: "acessorios", label: "Acessórios", singular: "Acessório" },
];

export type Badge = "Pronta entrega" | "Vermelho por dentro" | "Peça-herói" | "Últimas unidades";

export type TypeTag = "PEÇA-HERÓI" | "VERMELHO POR DENTRO" | "ÚLTIMAS UNIDADES" | "100% DENIM" | "PLANTA 1 ARAUCÁRIA";

export type ProductImage = {
  src: string;
  kind: "look" | "detalhe";
  alt: string;
  /** Só para recortes: ponto focal e ampliação. */
  objectPosition?: string;
  zoom?: number;
};

export type Size = { label: string; stock: number };

export type Product = {
  slug: string;
  code: string;
  name: string;
  category: Category;
  look: number | null;
  short: string;
  price: number;
  color: string;
  images: { front: ProductImage; back: ProductImage; details: ProductImage[] };
  sizes: Size[];
  story: string;
  composition: string;
  care: string[];
  tags: TypeTag[];
  /** Badge em pílula branca no card (FARM). */
  badge: Badge | null;
  /** Filtro "Pronta entrega". */
  readyToShip: boolean;
  /** Filtro "Detalhe vermelho": o vermelho aparece por dentro da peça. */
  redDetail: boolean;
  /** Nota média (exemplo) e número de avaliações. */
  rating: number;
  reviews: number;
  /** 1 a 3: ocupa 3, 4 ou 6 colunas na grade da loja. */
  weight: 1 | 2 | 3;
  featured: boolean;
  /** Data de criação da peça (Passaporte). */
  createdAt: string;
};

const letters = (stock: [number, number, number, number, number]): Size[] =>
  ["PP", "P", "M", "G", "GG"].map((label, i) => ({ label, stock: stock[i] }));

const numbers = (stock: [number, number, number, number, number, number, number]): Size[] =>
  ["34", "36", "38", "40", "42", "44", "46"].map((label, i) => ({ label, stock: stock[i] }));

const COMPOSITION = "100% algodão, denim 12 oz. Pespontos em linha cobre. Detalhes em vermelho pinhão.";
const CARE = [
  "Lavar do avesso, em água fria.",
  "Não usar alvejante. Secar à sombra.",
  "Passar em temperatura média, pelo avesso.",
  "Quanto menos lavar, mais ela guarda sua forma.",
];

function lookImages(n: number, piece: string, focus: string, zoom: number, focus2?: string, zoom2?: number) {
  const look = looks[n - 1];
  return {
    front: { src: look.front, kind: "look" as const, alt: `${piece}, vista de frente, no look ${look.name}` },
    back: { src: look.back, kind: "look" as const, alt: `${piece}, vista de costas, no look ${look.name}` },
    details: [
      { src: look.front, kind: "detalhe" as const, alt: `Detalhe de ${piece.toLowerCase()}, frente`, objectPosition: focus, zoom },
      {
        src: look.back,
        kind: "detalhe" as const,
        alt: `Detalhe de ${piece.toLowerCase()}, costas`,
        objectPosition: focus2 ?? focus,
        zoom: zoom2 ?? zoom,
      },
    ],
  };
}

export const products: Product[] = [
  {
    slug: "top-bractea",
    code: "RMN-01-TOP",
    name: "Top Bráctea",
    category: "tops",
    look: 1,
    short: "Cropped de gola alta com escamas sobrepostas em um ombro só, como a pinha se abrindo de um lado.",
    price: 48900,
    color: "Índigo profundo · pesponto cobre",
    images: lookImages(1, "Top Bráctea", "50% 25%", 1.7),
    sizes: letters([2, 4, 5, 3, 0]),
    story:
      "Toda pinha começa a se abrir por um lado. O Top Bráctea guarda esse instante: as escamas sobem por um ombro só, como brácteas que se afastam para deixar a semente sair.",
    composition: COMPOSITION,
    care: CARE,
    tags: ["100% DENIM"],
    badge: "Pronta entrega",
    readyToShip: true,
    redDetail: false,
    rating: 4.7,
    reviews: 23,
    weight: 1,
    featured: false,
    createdAt: "2026-03-12",
  },
  {
    slug: "saia-bractea",
    code: "RMN-01-SAI",
    name: "Saia Bráctea",
    category: "saias",
    look: 1,
    short: "Midi assimétrica com cascata de escamas no quadril e barra desfiada em diagonal.",
    price: 68900,
    color: "Índigo profundo · barra desfiada",
    images: lookImages(1, "Saia Bráctea", "52% 58%", 1.5, "45% 62%", 1.5),
    sizes: letters([1, 3, 4, 2, 1]),
    story:
      "A cascata de escamas desce pelo quadril como a pinha vista de lado. A barra desfiada não é acabamento: é o tempo agindo sobre o tecido, como age sobre tudo que permanece.",
    composition: COMPOSITION,
    care: CARE,
    tags: ["PEÇA-HERÓI"],
    badge: "Peça-herói",
    readyToShip: true,
    redDetail: false,
    rating: 4.8,
    reviews: 31,
    weight: 2,
    featured: true,
    createdAt: "2026-03-12",
  },
  {
    slug: "vestido-semente",
    code: "RMN-02-VES",
    name: "Vestido Semente",
    category: "vestidos",
    look: 2,
    short: "Midi sem mangas em recortes de losango, com pontos de travete vermelho em cada encontro e barra em pontas.",
    price: 129000,
    color: "Índigo profundo · travetes em vermelho pinhão",
    images: lookImages(2, "Vestido Semente", "50% 42%", 1.6, "50% 70%", 1.4),
    sizes: letters([1, 2, 0, 2, 1]),
    story:
      "Cada losango é uma semente; cada ponto vermelho, o encontro que faz a vida continuar. Sem o pólen e a pinha juntos, não há pinhão. Sem os dois lados do recorte, não há vestido.",
    composition: COMPOSITION,
    care: CARE,
    tags: ["PEÇA-HERÓI", "VERMELHO POR DENTRO"],
    badge: "Vermelho por dentro",
    readyToShip: false,
    redDetail: true,
    rating: 4.9,
    reviews: 18,
    weight: 3,
    featured: true,
    createdAt: "2026-03-20",
  },
  {
    slug: "top-curiacu",
    code: "RMN-03-TOP",
    name: "Top Curiaçu",
    category: "tops",
    look: 3,
    short: "Frente única de gola camisa com zíper e barra em escamas.",
    price: 44900,
    color: "Índigo profundo · zíper metálico",
    images: lookImages(3, "Top Curiaçu", "50% 26%", 1.8),
    sizes: letters([3, 4, 4, 3, 2]),
    story:
      "Leva o nome do guerreiro que virou araucária. A gola camisa é a postura de quem fica de pé; as escamas na barra, o primeiro sinal da árvore que ele se tornou.",
    composition: COMPOSITION,
    care: CARE,
    tags: ["100% DENIM"],
    badge: "Pronta entrega",
    readyToShip: true,
    redDetail: false,
    rating: 4.6,
    reviews: 14,
    weight: 1,
    featured: false,
    createdAt: "2026-04-02",
  },
  {
    slug: "calca-curiacu",
    code: "RMN-03-CAL",
    name: "Calça Curiaçu",
    category: "calcas",
    look: 3,
    short: "Pantalona de cintura alta com escamas descendo pelas laterais, do quadril à barra.",
    price: 89000,
    color: "Índigo profundo · escamas laterais",
    images: lookImages(3, "Calça Curiaçu", "28% 70%", 1.5, "72% 70%", 1.5),
    sizes: numbers([1, 3, 4, 4, 2, 1, 0]),
    story:
      "As escamas descem pelas laterais como galhos que crescem para baixo, procurando a terra. Uma pantalona de cintura alta para andar com o corpo inteiro, como quem tem raiz.",
    composition: COMPOSITION,
    care: CARE,
    tags: ["PLANTA 1 ARAUCÁRIA"],
    badge: null,
    readyToShip: true,
    redDetail: false,
    rating: 4.8,
    reviews: 27,
    weight: 2,
    featured: false,
    createdAt: "2026-04-02",
  },
  {
    slug: "top-guacira",
    code: "RMN-04-TOP",
    name: "Top Guacira",
    category: "tops",
    look: 4,
    short: "Ombro único inteiramente coberto de escamas.",
    price: 52000,
    color: "Índigo profundo · escamas sobrepostas",
    images: lookImages(4, "Top Guacira", "50% 27%", 1.8),
    sizes: letters([0, 2, 3, 1, 0]),
    story:
      "Guacira virou gralha-azul. O Top Guacira é a asa: escamas que cobrem um ombro inteiro, sobrepostas como penas, prontas para levar a semente adiante.",
    composition: COMPOSITION,
    care: CARE,
    tags: ["ÚLTIMAS UNIDADES"],
    badge: "Últimas unidades",
    readyToShip: false,
    redDetail: false,
    rating: 4.7,
    reviews: 9,
    weight: 1,
    featured: false,
    createdAt: "2026-04-15",
  },
  {
    slug: "saia-guacira",
    code: "RMN-04-SAI",
    name: "Saia Guacira",
    category: "saias",
    look: 4,
    short: "Longa de escamas com fenda frontal e franjas vermelhas escondidas por baixo: o sangue guardado.",
    price: 149000,
    color: "Índigo profundo · forro em vermelho pinhão",
    images: lookImages(4, "Saia Guacira", "50% 62%", 1.4, "50% 78%", 1.5),
    sizes: letters([1, 1, 2, 1, 0]),
    story:
      "Na lenda, a gralha enterra os pinhões para esconder dos inimigos o sangue do amado. Aqui, o vermelho fica por baixo das escamas e só aparece no movimento, pela fenda. Quem vê, sabe.",
    composition: `${COMPOSITION} Franjas internas em sarja vermelha.`,
    care: CARE,
    tags: ["PEÇA-HERÓI", "VERMELHO POR DENTRO"],
    badge: "Peça-herói",
    readyToShip: false,
    redDetail: true,
    rating: 4.9,
    reviews: 12,
    weight: 3,
    featured: true,
    createdAt: "2026-04-15",
  },
  {
    slug: "jaqueta-raiz",
    code: "RMN-05-JAQ",
    name: "Jaqueta Raiz",
    category: "jaquetas",
    look: 5,
    short: "Bomber cropped de gola alta e mangas bufantes, com losangos vermelhos embutidos nas costuras.",
    price: 119000,
    color: "Índigo profundo · losangos em vermelho pinhão",
    images: lookImages(5, "Jaqueta Raiz", "50% 30%", 1.4, "50% 32%", 1.5),
    sizes: letters([1, 3, 3, 2, 2]),
    story:
      "O vermelho corre pelas costuras como seiva. Os losangos ficam embutidos, só aparecem quando o braço se move: o que passa de geração em geração não se mostra inteiro de uma vez.",
    composition: COMPOSITION,
    care: CARE,
    tags: ["VERMELHO POR DENTRO"],
    badge: "Vermelho por dentro",
    readyToShip: true,
    redDetail: true,
    rating: 4.8,
    reviews: 21,
    weight: 2,
    featured: true,
    createdAt: "2026-05-04",
  },
  {
    slug: "top-faixa-raiz",
    code: "RMN-05-FAI",
    name: "Top Faixa Raiz",
    category: "tops",
    look: 5,
    short: "Bandeau de denim com pesponto aparente.",
    price: 28900,
    color: "Índigo profundo · pesponto cobre",
    images: lookImages(5, "Top Faixa Raiz", "50% 29%", 2),
    sizes: letters([4, 6, 6, 5, 3]),
    story:
      "A peça mais simples da coleção, e por isso a base de tudo. O pesponto aparente é a costura que normalmente se esconde: aqui, a estrutura vira desenho.",
    composition: COMPOSITION,
    care: CARE,
    tags: ["100% DENIM"],
    badge: null,
    readyToShip: true,
    redDetail: false,
    rating: 4.5,
    reviews: 38,
    weight: 1,
    featured: false,
    createdAt: "2026-05-04",
  },
  {
    slug: "calca-raiz",
    code: "RMN-05-CAL",
    name: "Calça Raiz",
    category: "calcas",
    look: 5,
    short: "Wide leg com recortes em losango vermelho ao longo das laterais, presos por travetes de metal.",
    price: 99000,
    color: "Índigo profundo · recortes em vermelho pinhão",
    images: lookImages(5, "Calça Raiz", "30% 70%", 1.5, "70% 72%", 1.5),
    sizes: numbers([0, 2, 3, 3, 2, 1, 1]),
    story:
      "Os recortes abrem a lateral e mostram o vermelho que corre por dentro, preso por travetes de metal, como sementes alinhadas na terra. Uma calça para atravessar o tempo.",
    composition: `${COMPOSITION} Travetes metálicos.`,
    care: CARE,
    tags: ["VERMELHO POR DENTRO", "PLANTA 1 ARAUCÁRIA"],
    badge: "Vermelho por dentro",
    readyToShip: true,
    redDetail: true,
    rating: 4.7,
    reviews: 16,
    weight: 2,
    featured: false,
    createdAt: "2026-05-04",
  },
  {
    slug: "jaqueta-gralha",
    code: "RMN-06-JAQ",
    name: "Jaqueta Gralha",
    category: "jaquetas",
    look: 6,
    short: "Cropped de gola alta com zíper, ombros vazados e mangas inteiras de escamas forradas de vermelho.",
    price: 139000,
    color: "Índigo profundo · forro em vermelho pinhão",
    images: lookImages(6, "Jaqueta Gralha", "50% 30%", 1.4, "30% 40%", 1.6),
    sizes: letters([1, 2, 2, 1, 1]),
    story:
      "Mangas de escama como asas. Cada escama é forrada de vermelho: quando o braço levanta, o forro aparece, como a gralha que abre as asas e revela o que leva consigo.",
    composition: `${COMPOSITION} Forro em sarja vermelha.`,
    care: CARE,
    tags: ["PEÇA-HERÓI", "ÚLTIMAS UNIDADES"],
    badge: "Últimas unidades",
    readyToShip: false,
    redDetail: true,
    rating: 4.9,
    reviews: 11,
    weight: 3,
    featured: true,
    createdAt: "2026-05-20",
  },
  {
    slug: "saia-pinha",
    code: "RMN-06-SAI",
    name: "Saia Pinha",
    category: "saias",
    look: 6,
    short: "Mini de escamas em camadas com pontas vermelhas aparecendo entre elas.",
    price: 69000,
    color: "Índigo profundo · pontas em vermelho pinhão",
    images: lookImages(6, "Saia Pinha", "50% 52%", 1.8, "50% 52%", 1.8),
    sizes: letters([2, 3, 3, 2, 1]),
    story:
      "A pinha inteira, em miniatura. Camadas de escamas com pontas vermelhas entre elas, como pinhões maduros prestes a cair.",
    composition: COMPOSITION,
    care: CARE,
    tags: ["VERMELHO POR DENTRO"],
    badge: null,
    readyToShip: true,
    redDetail: true,
    rating: 4.6,
    reviews: 19,
    weight: 1,
    featured: false,
    createdAt: "2026-05-20",
  },
  {
    slug: "lenco-escama",
    code: "RMN-00-ACE",
    name: "Lenço Escama",
    category: "acessorios",
    look: null,
    short: "Lenço de retalhos de denim da coleção, borda desfiada, com um losango vermelho bordado.",
    price: 18900,
    color: "Retalhos de índigo · losango em vermelho pinhão",
    images: {
      front: { src: asset("/images/produtos/lenco-escama-frente.svg"), kind: "look", alt: "Lenço Escama aberto em losango, com borda desfiada e um losango vermelho bordado" },
      back: { src: asset("/images/produtos/lenco-escama-dobrado.svg"), kind: "look", alt: "Lenço Escama dobrado em triângulo" },
      details: [
        {
          src: asset("/images/produtos/lenco-escama-frente.svg"),
          kind: "detalhe",
          alt: "Detalhe do losango vermelho bordado",
          objectPosition: "50% 70%",
          zoom: 2,
        },
        {
          src: asset("/images/produtos/lenco-escama-frente.svg"),
          kind: "detalhe",
          alt: "Detalhe da borda desfiada",
          objectPosition: "85% 50%",
          zoom: 2.2,
        },
      ],
    },
    sizes: [{ label: "Único", stock: 14 }],
    story:
      "Feito das sobras de corte da coleção: nenhum retalho se perde. Cada lenço é único, porque junta pedaços de peças diferentes, e leva um losango vermelho bordado à mão.",
    composition: "100% algodão, retalhos de denim 12 oz. Bordado em linha vermelha.",
    care: CARE,
    tags: ["PLANTA 1 ARAUCÁRIA"],
    badge: "Pronta entrega",
    readyToShip: true,
    redDetail: true,
    rating: 4.8,
    reviews: 42,
    weight: 1,
    featured: true,
    createdAt: "2026-06-01",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getProductByCode = (code: string) => products.find((p) => p.code.toLowerCase() === code.toLowerCase());
export const productsByLook = (n: number) => products.filter((p) => p.look === n);
export const categoryLabel = (key: Category) => categories.find((c) => c.key === key)?.label ?? key;
export const totalStock = (p: Product) => p.sizes.reduce((n, s) => n + s.stock, 0);
