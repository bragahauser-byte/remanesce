/*
 * Textos do site. A equipe pode editar aqui sem mexer nos componentes.
 * Tom: poético, contido, sensorial. Frases curtas.
 */

export const brand = {
  name: "Remanesce",
  signature: "O que permanece, renasce.",
  collection: "O Renascer da Permanência",
  collectionLabel: "Coleção 01 · Denim e vermelho",
  description:
    "Denim autoral que transforma a pinha da araucária em roupa: peças que guardam memória, atravessam gerações e renascem em novas formas.",
  // Dados fictícios: projeto acadêmico.
  cnpj: "00.000.000/0001-00",
  city: "Curitiba · Paraná",
  email: "contato@remanesce.com.br",
  instagram: "https://instagram.com/remanesce",
  siteUrl: "https://remanesce.vercel.app",
};

export const navLinks = [
  { href: "/colecao", label: "Coleção", look: 1 },
  { href: "/loja", label: "Loja", look: 4 },
  { href: "/looks", label: "Looks", look: 6 },
  { href: "/raiz", label: "Raiz", look: 3 },
  { href: "/servicos", label: "Serviços", look: 5 },
  { href: "/marca", label: "Marca", look: 2 },
  { href: "/sobre", label: "Sobre", look: 1 },
] as const;

export const mobileNav = [
  { href: "/colecao", label: "Explorar", icon: "pinha" },
  { href: "/loja", label: "Loja", icon: "escama" },
  { href: "/servicos", label: "Serviços", icon: "agulha" },
  { href: "/conta", label: "Conta", icon: "conta" },
  { href: "/sacola", label: "Sacola", icon: "sacola" },
] as const;

export const hero = {
  beats: ["Tudo muda.", "Nada se perde.", "O que permanece, renasce."],
};

export const manifesto = [
  "Somos feitos do que permanece.",
  "Da árvore que atravessa dois séculos. Da semente guardada na terra. Da receita que a avó ensinou sem escrever.",
  "A Remanesce nasce da pinha da araucária e de tudo que ela ensina: que a permanência não é ficar parado, é continuar existindo em outra forma.",
  "Cada peça é denim. Cada escama, uma memória. E, por dentro, o vermelho que ninguém vê, mas que sustenta tudo.",
];

export const layers = [
  {
    key: "natureza",
    label: "I · Natureza",
    title: "Natureza",
    icon: "araucaria",
    line: "Duzentos anos de pé. Uma semente de cada vez.",
  },
  {
    key: "memoria",
    label: "II · Memória",
    title: "Memória",
    icon: "geracoes",
    line: "Passada de mão em mão, de geração em geração.",
  },
  {
    key: "lenda",
    label: "III · Lenda",
    title: "Lenda",
    icon: "gralha",
    line: "Curiaçu virou árvore. Guacira virou gralha. O amor virou semente.",
  },
] as const;

export const raiz = {
  title: "Cada peça, uma araucária.",
  line: "O que você veste hoje volta à terra como floresta.",
  // Exemplo do projeto acadêmico: valor base do contador de araucárias plantadas.
  treesBase: 1284,
};

export const servicesIntro = "Uma peça Remanesce não termina. Ela se transforma com você.";

export const newsletter = {
  title: "Receba as próximas sementes.",
  placeholder: "seu e-mail",
  button: "Plantar",
  success: "Semente plantada. Até breve.",
  invalid: "Confira o e-mail, por favor.",
};

export const microcopy = {
  emptyBag: "Sua sacola ainda é semente.",
  emptyBagCta: "Explorar a loja",
  emptySaved: "Nada guardado ainda. A gralha também começa com um pinhão.",
  added: "Guardado na sacola.",
  orderConfirmed: "Pedido recebido. Uma araucária já tem seu nome.",
  notFound: "Esta página voltou à terra. Talvez ela renasça em outro lugar.",
  academic: "Projeto acadêmico. Marca, preços, parcerias e números são exemplos.",
  demo: "Ambiente de demonstração · nenhuma cobrança real é feita.",
};
