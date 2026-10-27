/*
 * Textos do site. A equipe pode editar aqui sem mexer nos componentes.
 * Tom: poético, contido, sensorial. Frases curtas.
 */

import { SITE_URL } from "@/lib/paths";

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
  siteUrl: SITE_URL,
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

export const services = [
  {
    key: "reparo",
    title: "Reparo para sempre",
    icon: "agulha",
    line: "Costura, troca de escamas danificadas, botões e zíperes, por toda a vida da peça.",
    detail:
      "Toda peça Remanesce tem reparo gratuito enquanto existir. Uma escama que se soltou, um zíper cansado, uma costura aberta: a peça volta ao ateliê e retorna inteira, com a marca do tempo preservada.",
  },
  {
    key: "ajuste",
    title: "Ajuste sob medida",
    icon: "etiqueta",
    line: "Barra, cintura e comprimento ajustados ao seu corpo.",
    detail:
      "O denim guarda a memória do corpo. Ajustamos barra, cintura e comprimento para que a peça acompanhe você, e não o contrário. O primeiro ajuste está incluído na compra.",
  },
  {
    key: "ressignificar",
    title: "Ressignificar",
    icon: "geracoes",
    line: "A memória da sua família, em outra forma.",
    detail:
      "Traga uma peça antiga sua, ou de alguém da família. Nós a transformamos em uma peça Remanesce, com escamas e detalhes em vermelho. O que foi vivido não se perde: renasce.",
  },
] as const;

/*
 * Conteúdo de exemplo (projeto acadêmico): memórias fictícias de clientes.
 */
export const memories = [
  { text: "A sapecada de pinhão na casa da avó em Curitiba, todo mês de maio.", name: "Helena M.", city: "Curitiba, PR" },
  { text: "Meu pai guardava pinhões no bolso do casaco para plantar na beira da estrada.", name: "Rafael T.", city: "Guarapuava, PR" },
  { text: "A receita de paçoca de pinhão que ninguém escreveu, mas todo mundo lembra.", name: "Lúcia A.", city: "União da Vitória, PR" },
  { text: "A araucária do quintal que meu bisavô plantou e que ainda faz sombra para nós.", name: "Bruno K.", city: "Ponta Grossa, PR" },
];

export const chapters = {
  natureza: {
    label: "Capítulo I",
    title: "Natureza",
    lead: "Duzentos anos de pé. Uma semente de cada vez.",
    body: [
      "A araucária pode viver mais de dois séculos. Atravessa gerações, mudanças de paisagem, invernos e queimadas, e continua ali.",
      "Mas sozinha ela não continua. A árvore masculina e a feminina só se reproduzem juntas: o pólen encontra a pinha, e nasce o pinhão. Na terra, a semente vira outra árvore.",
      "É assim que a permanência acontece: não por ficar igual, mas por renascer.",
    ],
    cycle: ["Pólen", "Pinha", "Pinhão", "Muda", "Araucária"],
  },
  memoria: {
    label: "Capítulo II",
    title: "Memória",
    lead: "Passada de mão em mão, de geração em geração.",
    body: [
      "Antes da colonização, a araucária já era identidade no território que hoje é o Paraná. Está na paisagem, nas tradições, no nome das coisas.",
      "Está também na cozinha: o pinhão cozido no inverno, a sapecada, a paçoca, receitas que passam de geração em geração sem nunca serem escritas.",
      "A cultura muda de forma a cada geração. E renasce em cada uma delas.",
    ],
  },
  lenda: {
    label: "Capítulo III",
    title: "Lenda",
    lead: "Curiaçu virou árvore. Guacira virou gralha. O amor virou semente.",
    frames: [
      {
        title: "O amor",
        text: "Curiaçu e Guacira se amavam. Quando inimigos chegaram, Curiaçu desapareceu, e parecia que o amor dos dois tinha acabado ali.",
      },
      {
        title: "A transformação",
        text: "Mas eles renasceram na natureza: Curiaçu se transformou em araucária, de pé sobre a terra. Guacira se transformou na gralha-azul.",
      },
      {
        title: "A semente",
        text: "Desde então, a gralha enterra os pinhões, escondendo dos inimigos o sangue do amado. De cada semente guardada nasce outra araucária. O amor permanece, em outra forma.",
      },
    ],
    credit: "Lenda da tradição oral paranaense, recontada a partir do conceito da equipe Remanesce.",
  },
};

export const conceptToPiece = [
  { from: "Brácteas da pinha", to: "Escamas de denim sobrepostas", look: 4, focus: "50% 60%", zoom: 1.3 },
  { from: "Sangue escondido", to: "Vermelho por dentro, nas fendas e forros", look: 6, focus: "50% 55%", zoom: 1.4 },
  { from: "Sementes", to: "Losangos e travetes vermelhos", look: 2, focus: "50% 45%", zoom: 1.4 },
];

/*
 * Raiz: parceria, pontos de plantio e números são EXEMPLOS do projeto acadêmico.
 */
export const plantingPoints = [
  { city: "Curitiba", lon: -49.27, lat: -25.43, trees: 212 },
  { city: "Ponta Grossa", lon: -50.16, lat: -25.09, trees: 268 },
  { city: "Guarapuava", lon: -51.46, lat: -25.39, trees: 301 },
  { city: "União da Vitória", lon: -51.09, lat: -26.23, trees: 247 },
  { city: "General Carneiro", lon: -51.32, lat: -26.43, trees: 256 },
];

export const denimCycle = [
  { title: "O algodão", text: "Denim 100% algodão, escolhido pela durabilidade: uma peça que dura é a forma mais simples de gastar menos.", icon: "agulha" },
  { title: "Os retalhos", text: "As escamas são cortadas das sobras do corte principal. O que seria resto vira a parte mais importante da peça.", icon: "escama" },
  { title: "A lavagem", text: "Lavagens com menos água e sem estonagem química. O tempo de uso cuida do desbotado.", icon: "regador" },
  { title: "A embalagem", text: "Papel-semente: a tag e o envelope podem ser plantados. A embalagem também volta à terra.", icon: "broto" },
] as const;

export const team = [
  // Placeholders editáveis: troque pelos nomes e papéis reais da equipe.
  { name: "Maria Fernanda", role: "Conceito e direção criativa" },
  { name: "Integrante 2", role: "Modelagem e line-up" },
  { name: "Integrante 3", role: "Identidade visual" },
  { name: "Integrante 4", role: "Pesquisa e sustentabilidade" },
];

export const palette = [
  { token: "linho", name: "Linho", hex: "#F1EDE4", rgb: "241 237 228", cmyk: "0 2 5 5", use: "Fundo principal, como o fundo do line-up.", share: 70 },
  { token: "linho-escuro", name: "Linho cru", hex: "#E4DDD0", rgb: "228 221 208", cmyk: "0 3 9 11", use: "Fundos secundários, cards e divisórias.", share: 0 },
  { token: "indigo", name: "Índigo Remanescente", hex: "#161B27", rgb: "22 27 39", cmyk: "44 31 0 85", use: "Texto principal, fundos escuros, o denim.", share: 25 },
  { token: "denim", name: "Denim lavado", hex: "#2B3445", rgb: "43 52 69", cmyk: "38 25 0 73", use: "Superfícies escuras secundárias e hover.", share: 0 },
  { token: "casca", name: "Casca de araucária", hex: "#391502", rgb: "57 21 2", cmyk: "0 63 96 78", use: "Títulos sobre linho.", share: 0 },
  { token: "pinhao", name: "Vermelho pinhão", hex: "#650410", rgb: "101 4 16", cmyk: "0 96 84 60", use: "Uso raro: revelações, badge da sacola, foco. Sempre por dentro.", share: 3 },
  { token: "pinhao-vivo", name: "Vermelho brasa", hex: "#8E1420", rgb: "142 20 32", cmyk: "0 86 77 44", use: "Hover e estado ativo do vermelho.", share: 0 },
  { token: "cobre", name: "Pesponto", hex: "#B9763E", rgb: "185 118 62", cmyk: "0 36 66 27", use: "Costuras, sublinhados, divisórias tracejadas.", share: 2 },
  { token: "gralha", name: "Azul gralha", hex: "#2F5D9E", rgb: "47 93 158", cmyk: "70 41 0 38", use: "Acento raríssimo: só na lenda.", share: 0 },
  { token: "araucaria", name: "Verde araucária", hex: "#34402E", rgb: "52 64 46", cmyk: "19 0 28 75", use: "Só na Raiz e no replantio.", share: 0 },
] as const;
