# PROMPT PARA O CLAUDE CODE — Site + E-commerce da REMANESCE (v2)

> Cole este arquivo inteiro no Claude Code, com o terminal aberto na pasta do projeto.
> Esta é a **v2** e substitui qualquer instrução anterior sobre estilo, cores e estrutura.
> Ela é longa de propósito: tudo o que importa está aqui.

---

## 0. Antes de tudo

### 0.1 Seu papel
Você é um(a) designer-desenvolvedor(a) sênior de experiências digitais de moda (nível AKQA,
Work & Co, Locomotive). Vai construir o site + e-commerce **funcional** da marca de denim
**Remanesce** e da coleção **"O Renascer da Permanência"**.

### 0.2 Onde está o projeto
A pasta pode estar em um destes caminhos (confira qual existe e use como raiz):
- `C:\Users\Pichau\Desktop\Projetos Github\Remanesce\remanesce\`
- `C:\Users\Pichau\Desktop\Projetos Github\Remanesce\`

A raiz certa é a que contém `PROMPT.md`, `CLAUDE.md`, `docs/` e `public/images/`.

### 0.3 Leia nesta ordem, antes de escrever código
1. `docs/briefing.md` (pedido da cliente e entregáveis 8–12 e 14)
2. `docs/conceito.md` (conceito da coleção, texto da equipe; não altere o sentido)
3. **`organizacao imagens/`** (e as cópias em `docs/referencias/farm-*.png`) (pasta da Malu com a organização das imagens): liste **todos** os
   arquivos, abra cada imagem e leia qualquer texto. Essa pasta é a **referência visual da
   estrutura dos cards de produto, da listagem e da página de produto** (estilo FARM Rio).
   Me descreva em 5 a 10 linhas o que encontrou antes de começar. Se algo nela contradisser
   este prompt, a pasta vence no que diz respeito a cards e organização da loja.
4. `public/images/` (line-up e recortes)

### 0.4 Regras de trabalho
1. Me mostre um plano curto por fases (seção 14) e comece pela **Tarefa 1** sem esperar.
2. **Commit ao fim de cada fase**, mensagens claras em português.
3. Não apague `docs/`, `public/images/`, `organizacao imagens/`, `PROMPT.md`, `CLAUDE.md`.
4. Conteúdo visível em **pt-BR**; código em inglês.
5. Antes de cada commit: `npm run build` e `npm run lint` sem erros.
6. Abra o site no navegador e olhe cada página em **1440px, 768px e 390px**. Não declare nada
   pronto sem ter olhado.
7. Se precisar de uma decisão minha, pergunte em uma linha e siga com o resto.

---

## TAREFA 1 (primeiro de tudo): pastas de roupas recortadas, frente e verso

O line-up tem **6 modelos de roupa**. Crie uma pasta com cada roupa recortada certinho, frente e
verso:

```
public/images/roupas/
  roupa-1/  frente.jpg  verso.jpg   → Look Bráctea
  roupa-2/  frente.jpg  verso.jpg   → Look Semente
  roupa-3/  frente.jpg  verso.jpg   → Look Curiaçu
  roupa-4/  frente.jpg  verso.jpg   → Look Guacira
  roupa-5/  frente.jpg  verso.jpg   → Look Raiz
  roupa-6/  frente.jpg  verso.jpg   → Look Gralha
```

- Fontes: `public/images/lineup/lineup-frente.jpg` (frente) e `lineup-costas.jpg` (verso),
  1600×900, seis figuras lado a lado sobre fundo `#F1EDE4`.
- **Essas pastas já vêm pré-geradas** neste pacote (recorte automático pela caixa delimitadora
  da figura + 16px de margem). Sua tarefa: **conferir cada uma** (abrir e olhar), corrigir
  qualquer recorte que corte pé, cabelo ou mão ou que pegue pedaço da figura vizinha, e
  **refazer em resolução maior** se houver versões melhores das imagens em
  `organizacao imagens/`.
- Faça o recorte com um script reproduzível (`scripts/recortar-roupas.mjs` com `sharp`, ou
  Python com Pillow) e registre no README como rodar de novo.
- Gere também, para cada roupa, uma versão **com fundo removido** (`frente.png` / `verso.png`
  transparentes). O fundo é quase liso (`#F1EDE4`): use limiar de cor + suavização da borda, ou
  `@imgly/background-removal-node`. Esses PNGs serão usados no carrossel 3D (seção 6.1).
  Confira visualmente que a borda ficou limpa.
- Gere variações otimizadas (`.webp`, 2 larguras) para o site.

Commit: `feat: roupas recortadas frente e verso`.

---

## 1. A marca

**Remanesce**: denim autoral que transforma a pinha da araucária em roupa. Peças que guardam
memória, atravessam gerações e renascem em outra forma.

- **Assinatura:** _O que permanece, renasce._
- **Coleção:** O Renascer da Permanência
- **Matéria:** 100% denim, com **pontos de vermelho**.
- **Causa:** replantio de araucárias (cada peça vendida planta uma muda).
- **Tom de voz:** poético, contido, sensorial, afetivo. Frases curtas. Memória, raiz, ciclo,
  semente, tempo. Sem jargão de marketing.

**Conceito em três camadas** (de `docs/conceito.md`):
1. **Natureza:** a araucária vive mais de 200 anos; masculina e feminina só se reproduzem juntas;
   o pólen encontra a pinha, nasce o pinhão, que na terra vira árvore.
2. **Memória:** símbolo do Paraná desde antes da colonização; receitas de pinhão passadas de
   geração em geração.
3. **Lenda:** Curiaçu vira araucária, Guacira vira gralha-azul; ao enterrar os pinhões, a gralha
   segue escondendo o sangue do amado. O amor permanece em outra forma.

**Leitura visual da coleção:** escamas de denim sobrepostas (as brácteas da pinha), losangos,
recortes em ponta, pesponto cobre, barras desfiadas e o **vermelho aparecendo por dentro**
(fendas, forros, losangos): o sangue de Curiaçu escondido. **Regra do site: o vermelho quase
nunca é superfície; ele aparece no detalhe, por baixo, revelado.**

---

## 2. Direção de arte: a mistura das três referências

O site é **exatamente no estilo** de **a24.raviklaassens.com** misturado com **gracefashion.ai**,
com os **cards de produto, listagem e página de produto no padrão FARM Rio** (imagens da pasta
`organizacao imagens/`) e **as cores da FARM**. Estudei os dois sites; este é o mapa:

### 2.1 A24 (Ravi Klaassens): a espinha dorsal da navegação da coleção
O que observei:
- Fundo claro de papel com **grão sutil** em toda a página.
- **Loader**: logotipo + palavra de estado com spinner pequeno ("Projecting ◌") e um
  **contador grande 0→100** em serifa fina, com o primeiro objeto já girando no centro.
- **Home = carrossel de objetos 3D em diagonal**: cada filme é um disco em perspectiva. O
  **scroll do mouse avança** para o próximo: os objetos deslizam em diagonal (do canto inferior
  esquerdo para o superior direito), o atual fica no centro, o anterior encolhe à esquerda e o
  próximo aparece grande cortado à direita.
- **Ficha técnica no canto superior esquerdo**: título em **serifa caixa alta** grande
  (BACKROOMS), embaixo uma tabela com linhas finas: rótulo em versalete minúsculo à esquerda
  (DIRECTED BY, YEAR, STARRING) e valor alinhado à direita. Ao trocar de item, os textos saem e
  entram com **máscara linha a linha** e as linhas da tabela "redesenham".
- **Embaixo**: duas citações de imprensa lado a lado (estrelas, veículo em versalete, frase em
  serifa caixa alta entre aspas), que trocam junto com o item.
- **Nav central mínima**: logo · Films · Television · **Index ▾**. O Index abre um **painel
  branco** com a lista de todos os títulos; o ativo fica numa **barra preta** com o ano à
  direita; o fundo escurece levemente.
- **Clique no objeto → página de detalhe** com transição: palavra de estado ("Developing ◌"),
  **linhas horizontais que se desenham** de largura total, título gigante em serifa caixa alta
  entrando por máscara, o objeto girando, ficha técnica completa, uma **frase-manchete enorme
  em caixa alta** quebrada em linhas, sinopse, botão de ação e, no fim, o **título do próximo
  item** gigante: continuar rolando leva ao próximo.
- Rodapé discreto: "an experiment by".
- Fontes do site: serifa display fina de alto contraste, grotesca neutra e versalete
  minúsculo espaçado para rótulos. WebGL num canvas para os objetos.

### 2.2 Grace (gracefashion.ai): o ritmo editorial e as transições
O que observei:
- **Hero foto de ponta a ponta** (retrato com luz dramática) com uma frase curta centralizada
  em sans; ao rolar, a frase é **substituída pelo logotipo** grande no mesmo lugar.
- Nav transparente: logo à esquerda, 3 links em caixa alta pequena no centro, CTA sublinhado à
  direita.
- **Manifesto**: tela branca inteira com uma única frase grande centralizada.
- **Moldura quadrada fixa no centro (sticky)** sobre fundo branco: enquanto se rola, o conteúdo
  da moldura troca: um retrato → uma **grade 2×2** (look, look, detalhe, acessório) → outro
  retrato. Muito branco ao redor.
- **Transição de glifo gigante**: uma frase "We got the [glifo] covered" em que o glifo é uma
  letra em blocos arredondados com textura de pontinhos; ao rolar, o glifo **cresce até cobrir
  a tela inteira** e a página vira **preta com grade de pontos**.
- Seção escura com **grade de pontos**: produto em still (flat lay) numa moldura, depois
  grade com tecido em close + grade 2×2 de modelos.
- **Vídeo/foto de ponta a ponta** com texto que entra **desfocado e fica nítido** (blur → foco).
- Bloco de números (3 colunas: valor grande + legenda pequena) com o mesmo blur → foco, e um
  botão pílula escuro à direita.
- Logos "em produção em" em linha + **depoimento** em que as palavras importantes ficam pretas
  e o resto cinza, com indicador de slides em traços.
- **FAQ** em duas colunas: título grande à esquerda, acordeões à direita com **"+" em círculo**.
- Rodapé com faixa de foto em gradiente quente.
- Fontes: **Instrument Sans** (400/500) em quase tudo; logotipo pixelado.

### 2.3 FARM Rio (pasta `organizacao imagens/`): cards, loja e produto
O que está nas imagens de referência:
- **Moldura do site / fundo de apresentação** preto quente; superfícies **brancas**; botões
  **pretos em pílula**; chips de filtro em **pílula com contorno fino**.
- **Listagem**: breadcrumb (Home › Roupas), título grande ("Vestidos"), linha de **chips**
  (Tamanho · Coleção · Estilo · Receba hoje) com scroll horizontal, **grade de 2 colunas
  quase sem espaço** entre fotos; foto em fundo cinza-claro; **badge pílula branca** pequena no
  canto superior esquerdo ("Receba hoje"); **dois botões circulares brancos** (coração e
  sacola) no canto inferior direito da foto; abaixo, nome em 2 linhas e preço, em sans regular.
- **Desktop**: chips no topo, grade com **imagem editorial grande** ocupando 2 linhas ao lado
  dos produtos; bloco de collab com foto grande à esquerda e carrossel com setas à direita.
- **Hero desktop**: foto inteira, nav transparente (logo · links · chip "50% off" num link ·
  busca · sacola · menu), **kicker em serifa itálica pequena** ("Nova coleção"), título em sans
  grande, **botão pílula translúcida** (vidro) "Explorar coleção".
- **PDP mobile**: foto ocupa ~60% da tela; botões circulares **voltar, compartilhar, favoritar**
  sobre a foto; badge "Receba hoje"; **paginação em pílula** com traço ativo e pontos; nome
  centralizado, "R$ 279 ou 10x 27,90"; **tamanhos em círculos** com o primeiro círculo sendo um
  **ícone de régua** (guia de medidas), selecionado = círculo preto; botão **"Comprar 🛍" preto
  em pílula** de largura total.
- **Card de story/produto** em tela cheia com nome e preço numa faixa branca embaixo.
- **"Para _completar o look_"**: título misturando **sans + serifa itálica**, carrossel
  horizontal de produtos.
- **"Opinião _de quem comprou_"**: estrelas, "78 avaliações", nota grande "4,7 / 5.0".
- **Barra fixa inferior** no mobile: nome + preço, botão circular coração, botão preto sacola.
- Cantos arredondados nos "telefones"/cards (~32px nos containers, pílulas totalmente
  arredondadas).

### 2.4 Como as três se juntam na Remanesce
| Área | Base | Como fica |
|---|---|---|
| Loader, Home da coleção, Índice, página de cada look | **A24** | Os 6 looks como objetos 3D num carrossel diagonal guiado pelo scroll, ficha técnica no canto, frases do conceito no lugar das críticas, Índice em painel branco, página de detalhe com linhas que se desenham e "próximo look" no fim. |
| Abertura da marca, manifesto, narrativa do conceito, Raiz, números, depoimentos, FAQ | **Grace** | Hero de ponta a ponta com frase que vira logotipo, frase-manifesto sozinha na tela, moldura quadrada sticky trocando imagens, glifo gigante (o **símbolo-pinha**) que cresce e escurece a página, blur → foco, FAQ com "+" em círculo. |
| Loja, cards, PDP, sacola, checkout, conta | **FARM** | Chips em pílula, grade 2 colunas, badges brancas, botões circulares coração/sacola, PDP com tamanhos em círculo e botão "Comprar" preto em pílula, barra fixa no mobile, "Para completar o look", avaliações. |
| Cores | **FARM** | Preto quente + branco + cinza-claro de foto; o **vermelho pinhão** e o **índigo** da coleção só como acentos raros. |

---

## 3. Stack

- **Next.js 15+ (App Router), TypeScript, React 19**
- **Tailwind CSS v4** com tokens em CSS variables
- **GSAP + ScrollTrigger** (narrativa, pins, máscaras, glifo) e **Lenis** (scroll suave)
- **React Three Fiber + drei** para o carrossel 3D dos looks (com fallback CSS 3D; ver 6.1)
- **Zustand** (`persist`) para sacola, favoritos, pedidos e conta
- **React Hook Form + Zod**, **qrcode**
- **next/font** e **next/image**
- Ícones SVG próprios (seção 5.4)
- Deploy **Vercel**; repositório GitHub `bragahauser-byte/remanesce`

**Iniciar nesta pasta (que já tem arquivos):** crie o app numa pasta temporária
(`npx create-next-app@latest tmp-app --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm`),
mova o conteúdo para a raiz **sem sobrescrever** o que existe (mescle `.gitignore` e `public/`),
apague a temporária. Se já existir um app Next aqui de uma tentativa anterior, **reaproveite**
e adapte para esta v2.

Estrutura:
```
src/app/
  page.tsx                         → Início (abertura Grace + entrada da coleção)
  colecao/page.tsx                 → Carrossel A24 dos 6 looks
  colecao/[look]/page.tsx          → Página de detalhe do look (A24)
  loja/page.tsx                    → Listagem FARM
  loja/[slug]/page.tsx             → PDP FARM
  conceito/page.tsx                → O Renascer da Permanência (narrativa Grace)
  raiz/page.tsx                    → Replantio e sustentabilidade
  servicos/page.tsx                → Serviços de Permanência
  marca/page.tsx                   → Brandbook vivo (itens 8–12)
  sacola/page.tsx  checkout/page.tsx  pedido/[id]/page.tsx
  passaporte/[codigo]/page.tsx     → QR da etiqueta
  conta/page.tsx  sobre/page.tsx  not-found.tsx
src/components/ (layout, a24, grace, shop, brand, icons, ui)
src/data/ products.ts looks.ts copy.ts faq.ts
src/lib/ cart, format, shipping, cep, order
scripts/recortar-roupas.mjs
```

---

## 4. Cores (item 9): base FARM + acentos da coleção

| Token | Nome | HEX | Uso |
|---|---|---|---|
| `--preto` | Preto quente | `#181508` | Fundo das seções escuras, moldura, rodapé, texto forte (o preto da apresentação FARM) |
| `--tinta` | Tinta | `#111111` | Botões pílula, texto principal, chip ativo, tamanho selecionado |
| `--branco` | Branco | `#FFFFFF` | Superfície principal: páginas da loja, cards, PDP, painéis |
| `--papel` | Papel | `#F4F2EE` | Fundo das páginas da coleção (A24) com grão; fundo das fotos de produto |
| `--linho` | Linho | `#F1EDE4` | Fundo nativo das imagens do line-up (use atrás das fotos para fundir) |
| `--cinza` | Cinza texto | `#8C8A85` | Textos secundários, parcelamento, rótulos, palavras "apagadas" no depoimento |
| `--linha` | Linha | `#D9D6D0` | Contorno dos chips, divisórias, linhas da ficha técnica |
| `--pinhao` | Vermelho pinhão | `#650410` | **Acento raro**: badge da sacola, favorito ativo, foco, "por dentro" das revelações |
| `--indigo` | Índigo denim | `#161B27` | **Acento raro**: o denim; transição do glifo pode terminar em índigo em vez de preto |
| `--cobre` | Pesponto | `#B9763E` | Detalhes: sublinhado tracejado, linhas de costura nos mockups |

Regras: ~60% branco/papel, ~35% preto/tinta, ~5% acentos. Contraste AA. Os acentos nunca viram
fundo de seção, exceto o índigo no fim da transição do glifo.

---

## 5. Identidade (itens 10, 11, 12 e logo)

### 5.1 Fontes (item 10): três fontes
| Papel | Fonte (Google Fonts) | Uso | Referência |
|---|---|---|---|
| **Títulos** | **Bodoni Moda** (400–500; caixa alta nos títulos de look) | Títulos de look, contador do loader, manchetes enormes, nomes nas fichas técnicas | Serifa display fina de alto contraste da A24 |
| **Subtítulos** | **Instrument Serif** _Italic_ | Kickers ("Nova coleção"), metade itálica dos títulos mistos ("Para _completar o look_"), citações | Serifa itálica da FARM |
| **Texto corrido e interface** | **Instrument Sans** (400/500) | Corpo, nav, cards, preços, botões, chips, formulários | A mesma da Grace; grotesca limpa como a da FARM |

Rótulos da ficha técnica (versalete A24): Instrument Sans 10–11px, caixa alta, tracking 0.14em.
Escala com `clamp()`: display 120–240px; H1 72–112; H2 44–64; H3 28–36; corpo 16/1.55; card 14.

### 5.2 Logo
- Logotipo **REMANESCE** em Bodoni Moda caixa alta, tracking 0.16em.
- **Símbolo-pinha**: pinha geométrica feita de escamas em ponta (chevrons) dentro de um losango
  vertical, com um pequeno pinhão vermelho no centro. Versões: símbolo, horizontal, empilhada.
- **Símbolo em blocos** (para a transição Grace): o mesmo símbolo redesenhado em **blocos
  retangulares com cantos arredondados e textura de pontinhos**, como o glifo da Grace.
- Favicon do símbolo.

### 5.3 Texturas (item 11)
SVG/CSS reutilizáveis: **grão de papel** (feTurbulence ~3%, todas as páginas A24), **grade de
pontos** (seções escuras, estilo Grace), **sarja diagonal** do denim (4–6% sobre índigo),
**escamas da pinha** (pattern com stroke fino; textura-assinatura), **pesponto** (tracejado
cobre), **losango vermelho**, **borda desfiada** (máscara SVG).

### 5.4 Ícones (item 12)
Conjunto próprio SVG 24×24, stroke 1.25px, `currentColor`: sacola, coração/favorito (**pinhão**
como alternativa de marca na página `/marca`), busca, menu (duas linhas), voltar, compartilhar,
fechar, mais, menos, **régua** (guia de medidas), seta, filtro, conta, pinha, pinhão, escama,
araucária, gralha-azul, muda, agulha e linha, anéis de árvore, mapa do Paraná, etiqueta, QR,
caminhão, Pix, cartão. Componente `<Icon name="..." />`.

---

## 6. Páginas

### Elementos globais
- **Nav** (estilo A24 + FARM): fixa, transparente sobre fotos, branca nas páginas da loja.
  Esquerda: **REMANESCE**. Centro: **Coleção · Loja · Conceito · Raiz · Índice ▾**. Direita:
  busca, favoritos, **sacola com badge vermelho pinhão** e menu. Um link pode ter **chip pílula**
  ("novo") como o "50% off" da FARM.
- **Índice ▾** (A24): painel branco com a lista dos 6 looks + seções; item ativo em barra
  preta com número à direita (`03`); fundo escurece 10%.
- **Menu** em tela cheia `--preto` com grade de pontos, links grandes em Bodoni Moda, imagem do
  look ao passar o mouse.
- **Rodapé**: faixa de foto de ponta a ponta com gradiente (Grace) + `--preto` com newsletter
  ("Receba as próximas sementes" / botão pílula "Plantar"), links, contador de araucárias, nota
  "Projeto acadêmico".
- **Barra mobile** inferior fixa com ícones (Coleção · Loja · Favoritos · Sacola · Conta).
- **Transições de rota**: palavra de estado + spinner minúsculo, como na A24 ("Costurando ◌",
  "Revelando ◌", "Plantando ◌") e linhas que se desenham.

### 6.1 Loader + Coleção `/colecao` (A24 fiel)
- **Loader** (1ª visita da sessão): fundo `--papel` com grão; topo central "REMANESCE ·
  Costurando ◌"; contador **0 → 100** gigante em Bodoni Moda; a roupa 1 já girando suave no
  centro. Bordas laterais com "Remanesce Coleção 01" à esquerda e o ano "2026" à direita, como
  na A24.
- **Carrossel diagonal dos 6 looks**: cada look é um objeto 3D. Como a A24 usa um **disco**, a
  Remanesce usa uma **escama**: um painel em forma de **escama/losango alongado com ponta** (a
  bráctea da pinha), levemente espesso, com bordas em **denim** (textura sarja) e o **PNG
  recortado da roupa** (frente) "impresso" nele; o verso do painel mostra o **verso da roupa**
  com um forro **vermelho pinhão** aparecendo na espessura (o vermelho por dentro).
  - O scroll avança/retrocede um look por vez (com inércia, como a A24): o atual centralizado e
    inclinado ~25°, o anterior menor à esquerda-baixo, o próximo grande cortado à direita-cima.
  - Arrastar com o mouse gira o painel no eixo Y e mostra o verso.
  - Implementação: **React Three Fiber** (geometria extrudada a partir do contorno da escama +
    textura do PNG). **Fallback** sem WebGL ou com `prefers-reduced-motion`: cards em CSS 3D
    com `transform: perspective()` e troca frente/verso.
- **Ficha técnica no canto superior esquerdo** (troca por máscara a cada look):
  título em Bodoni caixa alta (`CURIAÇU`) e tabela com linhas finas:
  `LOOK` 03/06 · `PEÇAS` Top Curiaçu, Calça Curiaçu · `TECIDO` Denim índigo 12oz ·
  `DETALHE` Escamas laterais · `A PARTIR DE` R$ 449.
- **Embaixo, duas "críticas"** no lugar das resenhas de imprensa: em vez de estrelas, **cinco
  losangos** (o quinto pela metade, como 4,5 estrelas); fonte em versalete (`A LENDA`,
  `O PARANÁ`, `A ARAUCÁRIA`, `A MEMÓRIA`); frase em Bodoni caixa alta entre aspas, extraída do
  conceito (ex.: “O AMOR VIROU SEMENTE”, “DUZENTOS ANOS DE PÉ”). Cada look tem duas.
- Clique no look → `/colecao/[look]` com a transição da A24.

### 6.2 Página do look `/colecao/[look]` (A24)
- Estado "Revelando ◌", linhas horizontais que se desenham em largura total, título gigante.
- O painel-escama girando devagar no centro; ao rolar ele vira e mostra o verso.
- **Ficha técnica completa**: LOOK, PEÇAS, TECIDO, DETALHES, COR, ORIGEM DO DESENHO (ex.: "As
  escamas laterais traduzem as brácteas que protegem o pinhão"), CUIDADOS.
- **Manchete enorme em caixa alta** quebrada em linhas (ex.: “DE PÉ, / COMO A ÁRVORE / QUE ELE
  VIROU”).
- Texto-sinopse do look (história da peça ligada à pinha, à memória ou à lenda).
- **Peças do look em cards FARM** com botão "Comprar o look" (adiciona todas, tamanho a
  escolher na sacola).
- No fim: título do **próximo look** gigante; continuar rolando leva até ele.

### 6.3 Início `/` (Grace + FARM)
1. **Hero de ponta a ponta**: imagem do line-up ampliada com elegância sobre `--preto`, ou um
   close do detalhe vermelho entre escamas (recorte de roupa 4 ou 6). Frase central em
   Instrument Sans: "Tudo muda. Nada se perde." Ao rolar, a frase vira o **logotipo
   REMANESCE** + "o que permanece, renasce." (como "grace / ai studio.").
   Variante FARM no canto inferior esquerdo: kicker itálico "Nova coleção", título "O Renascer
   da Permanência" e **pílula de vidro** "Explorar coleção".
2. **Manifesto**: tela branca com uma frase só, centralizada: "Você decide o que permanece."
3. **Moldura quadrada sticky** no centro (Grace): ao rolar troca entre roupa 2 → grade 2×2
   (roupa 1, roupa 3, detalhe das escamas, detalhe do vermelho) → roupa 5 → roupa 6.
4. **Glifo gigante**: frase "Tudo o que é raiz [símbolo-pinha em blocos] permanece." O símbolo
   cresce até cobrir a tela e a página vira **`--preto` com grade de pontos** (ou índigo).
5. **Seção escura**: still de uma peça numa moldura; depois grade de **close do denim** +
   2×2 de detalhes das roupas (com opacidade e grade de pontos por cima, como a Grace).
6. **Faixa de ponta a ponta** com texto blur → foco: "Cada peça planta uma araucária."
7. **Números** (blur → foco): `200+` anos de vida de uma araucária · `100%` denim · `1` muda
   por peça vendida. Pílula escura "Conhecer a Raiz".
8. **Destaques da loja**: título "Para _começar_" e carrossel horizontal de cards FARM.
9. **Depoimento** com palavras-chave pretas e o resto cinza, indicador em traços (conteúdo de
   exemplo, marcado no código).
10. **FAQ** (Grace): "Perguntas _que permanecem_" à esquerda; à direita acordeões com "+" em
    círculo: O que é a Remanesce? · Como funciona o replantio? · As peças são 100% denim? ·
    Como cuidar das escamas? · Como funciona o Reparo para sempre? · Trocas e devoluções?
11. Rodapé.

### 6.4 Loja `/loja` (FARM fiel; siga a pasta `organizacao imagens/`)
- Fundo **branco**. Breadcrumb `Início › Coleção`, título grande "Coleção 01".
- **Chips pílula** com contorno fino, scroll horizontal no mobile: **Categoria · Tamanho ·
  Look · Detalhe vermelho · Pronta entrega**. Chip ativo = preto com texto branco. Cada chip
  abre um painel (bottom sheet no mobile, dropdown no desktop). Ordenação no final da linha.
  Filtros refletidos na URL.
- **Grade**: mobile 2 colunas com gap 4px; desktop 4 colunas com gap 4px e, a cada 6 produtos,
  um **bloco editorial** ocupando 2 colunas × 2 linhas (close do look, como a foto grande da
  FARM) com kicker itálico e link.
- **Card de produto** (exatamente o padrão FARM):
  - foto em proporção 3:4, fundo `--linho` (funde com a imagem), `object-fit: contain`;
  - **badge pílula branca** pequena no canto superior esquerdo (`Pronta entrega`,
    `Vermelho por dentro`, `Peça-herói`, `Últimas unidades`);
  - no canto inferior direito, **dois botões circulares brancos** 36px: **coração** (favoritar;
    ativo preenche de vermelho pinhão) e **sacola** (abre seletor rápido de tamanho e adiciona);
    no desktop aparecem no hover, no mobile ficam sempre visíveis;
  - hover desktop: troca frente → verso com fade;
  - abaixo: **nome em até 2 linhas** (Instrument Sans 14px, reticências), **preço** na linha
    seguinte. Sem caixas, sem sombras.
- Bloco "**Collab**" adaptado: "Coleção _O Renascer da Permanência_" com foto grande à esquerda,
  título + link sublinhado e carrossel com setas finas à direita.
- Busca em overlay branco com input grande e resultados em cards.

### 6.5 PDP `/loja/[slug]` (FARM fiel)
**Mobile:**
- Foto ocupando ~60% da altura, fundo `--linho`, swipe entre frente, verso e 2 detalhes;
  **paginação em pílula translúcida** (traço preto ativo + pontos).
- Sobre a foto: botões circulares translúcidos com blur **voltar** (esquerda), **compartilhar**
  e **favoritar** (direita); badge pílula branca.
- Nome centralizado e preço: "R$ 890 ou 10x R$ 89,00".
- **Tamanhos em círculos** 56px com contorno fino, em linha com scroll; o **primeiro círculo é
  o ícone de régua** (abre guia de medidas em bottom sheet); selecionado = círculo preto com
  texto branco; esgotado = riscado em cinza.
- Botão **"Comprar" + ícone sacola**, preto, pílula, largura total.
- **Barra fixa inferior** ao rolar: nome truncado + preço, botão circular coração, botão preto
  sacola.

**Desktop:** galeria em duas colunas à esquerda (imagens empilhadas) e coluna fixa à direita
com o mesmo bloco (nome, preço, círculos de tamanho, botão pílula), mais acordeões:
**A história da peça**, **Composição e cuidados**, **Entrega e trocas**, **Passaporte e
replantio**.

**Abaixo (os dois):**
- "**Para _completar o look_**": carrossel horizontal com as outras peças do mesmo look (cards
  FARM, nome 2 linhas e preço).
- "**Opinião _de quem comprou_**": 5 estrelas finas, "12 avaliações", nota grande "4,8 / 5.0",
  3 avaliações de exemplo (marcadas como conteúdo de exemplo), botão "Avaliar".
- "Esta peça planta uma araucária" com ícone de muda.
- JSON-LD de Product.

### 6.6 Conceito `/conceito` (Grace)
Narrativa em scroll com os três capítulos (Natureza, Memória, Lenda), usando a linguagem Grace:
frases sozinhas na tela, moldura sticky trocando imagens, texto blur → foco, uma seção escura
com grade de pontos para a **Lenda** (a gralha-azul em SVG atravessa a tela e enterra pinhões;
cada pinhão revela uma mancha vermelha que vira broto). Ciclo pólen → pinha → pinhão → muda →
árvore em diagrama circular animado. Bloco "Do conceito à peça": escamas = brácteas, vermelho
por dentro = sangue escondido, losangos = sementes, com recortes das roupas. Termina com o
line-up completo (frente/verso alternando) e link para a loja.

### 6.7 Raiz `/raiz`
"Cada peça, uma araucária." Compromisso de replantio (deixar claro em nota que a parceria e os
números são **exemplos do projeto acadêmico**), contador, mapa SVG do Paraná com 5 pontos
fictícios, ciclo do denim (retalhos viram escamas, menos água, embalagem de papel-semente),
programa **"Devolva e Renasça"** (formulário com confirmação na tela). Linguagem Grace.

### 6.8 Serviços de Permanência `/servicos`
Três cards com formulário de agendamento que gera protocolo e salva na conta:
**Reparo para sempre** · **Ajuste sob medida** · **Ressignificar** (transformar uma peça antiga
da família em peça Remanesce).

### 6.9 Marca `/marca` (itens 8–12)
Brandbook vivo com âncoras: logo e símbolo (versões, área de proteção, usos incorretos), cores
(clique copia HEX), as três fontes com especímenes, texturas, grade de ícones (clique copia SVG)
e **modos de aplicação e mockups em SVG/CSS**: sacola kraft com alça de cordão vermelho, caixa
preta que abre no hover revelando interior vermelho, tag de papel-semente com QR, etiqueta
interna bordada, patch de cintura, cartão de agradecimento com o número da araucária, cartão de
visita, papel de seda com escamas, post e story de Instagram. `@media print` para baixar como PDF.

### 6.10 Passaporte `/passaporte/[codigo]`
Foto da peça, look, "Esta peça plantou a araucária nº ___", ponto no mapa, história e
"Memórias desta peça" (localStorage).

### 6.11 Sobre e 404
Sobre: propósito, por que denim ("o tecido que envelhece com quem veste"), equipe (editável).
404: "Esta página voltou à terra. Talvez ela renasça em outro lugar."

---

## 7. Motion

- Easing padrão `cubic-bezier(0.22, 1, 0.36, 1)`; 400–900ms.
- **Máscara linha a linha** em todos os títulos e na ficha técnica (A24).
- **Linhas que se desenham** (scaleX 0→1) nas divisórias da ficha e nas transições (A24).
- **Blur → foco** (filter blur 12px → 0 + opacidade) nos textos das seções Grace.
- **Glifo crescendo** até cobrir a tela (scale com ScrollTrigger pin).
- **Moldura sticky** com crossfade entre conteúdos.
- Cards FARM: fade frente → verso; botões circulares surgem de baixo.
- Sacola: ao adicionar, o ícone recebe um pinhão que "cai" e o badge pulsa uma vez.
- `prefers-reduced-motion`: desliga pins, Lenis, 3D e blur; mantém fades simples.

---

## 8. Textos principais

- Hero: "Tudo muda. Nada se perde." → "REMANESCE · o que permanece, renasce."
- Manifesto: "Você decide o que permanece."
- Glifo: "Tudo o que é raiz [símbolo] permanece."
- Raiz: "Cada peça, uma araucária. O que você veste hoje volta à terra como floresta."
- Serviços: "Uma peça Remanesce não termina. Ela se transforma com você."
- Manifesto longo (para `/sobre` e `/conceito`):
  > Somos feitos do que permanece. Da árvore que atravessa dois séculos. Da semente guardada na
  > terra. Da receita que a avó ensinou sem escrever. A Remanesce nasce da pinha da araucária e
  > de tudo que ela ensina: permanecer não é ficar parado, é continuar existindo em outra forma.
  > Cada peça é denim. Cada escama, uma memória. E, por dentro, o vermelho que ninguém vê, mas
  > que sustenta tudo.
- Microcopy: sacola vazia "Sua sacola ainda é semente." · favoritos vazio "Nada guardado ainda.
  A gralha também começa com um pinhão." · pedido confirmado "Pedido recebido. Uma araucária já
  tem seu nome." · erros curtos e gentis.

---

## 9. Catálogo (`src/data/products.ts` e `looks.ts`)

Imagens: `public/images/roupas/roupa-N/frente.jpg|verso.jpg|frente.png|verso.png`. Para cada
**peça**, use a imagem do look com `objectPosition` + zoom para focar a peça (foto "detalhe") e
a imagem inteira como foto "look". **Preços são sugestões, fáceis de editar.**

| Código | Nome | Categoria | Roupa | Descrição | Preço |
|---|---|---|---|---|---|
| RMN-01-TOP | Top Bráctea | Tops | 1 | Cropped de gola alta com escamas sobrepostas num ombro só, como a pinha se abrindo de um lado. | R$ 489 |
| RMN-01-SAI | Saia Bráctea | Saias | 1 | Midi assimétrica com cascata de escamas no quadril e barra desfiada em diagonal. | R$ 689 |
| RMN-02-VES | Vestido Semente | Vestidos | 2 | Midi sem mangas em recortes de losango, travetes vermelhos em cada encontro e barra em pontas. | R$ 1.290 |
| RMN-03-TOP | Top Curiaçu | Tops | 3 | Frente única de gola camisa com zíper e barra em escamas. | R$ 449 |
| RMN-03-CAL | Calça Curiaçu | Calças | 3 | Pantalona de cintura alta com escamas descendo pelas laterais. | R$ 890 |
| RMN-04-TOP | Top Guacira | Tops | 4 | Ombro único inteiramente coberto de escamas. | R$ 520 |
| RMN-04-SAI | Saia Guacira | Saias | 4 | Longa de escamas com fenda e franjas vermelhas escondidas por baixo: o sangue guardado. | R$ 1.490 |
| RMN-05-JAQ | Jaqueta Raiz | Jaquetas | 5 | Bomber cropped de gola alta e mangas bufantes com losangos vermelhos nas costuras. | R$ 1.190 |
| RMN-05-FAI | Top Faixa Raiz | Tops | 5 | Bandeau de denim com pesponto aparente. | R$ 289 |
| RMN-05-CAL | Calça Raiz | Calças | 5 | Wide leg com recortes em losango vermelho nas laterais, presos por travetes de metal. | R$ 990 |
| RMN-06-JAQ | Jaqueta Gralha | Jaquetas | 6 | Cropped de gola alta com zíper, ombros vazados e mangas de escamas forradas de vermelho. | R$ 1.390 |
| RMN-06-SAI | Saia Pinha | Saias | 6 | Mini de escamas em camadas com pontas vermelhas entre elas. | R$ 690 |
| RMN-00-ACE | Lenço Escama | Acessórios | — | Lenço de retalhos de denim da coleção, borda desfiada, losango vermelho bordado. | R$ 189 |

Campos por produto: `slug`, `code`, `name`, `category`, `look`, `price` (centavos), `images`,
`sizes` (PP–GG; calças 34–46) com estoque fictício (alguns esgotados), `badge`, `story`,
`composition` (100% algodão, denim 12oz), `care` ("Quanto menos lavar, mais ela guarda sua
forma."), `rating`, `reviews`, `featured`.

Looks (`looks.ts`) com número, nome, frase, ficha técnica, duas "críticas" e manchete:
1. **Bráctea**: "A pinha começa a se abrir."
2. **Semente**: "Cada losango guarda o que vai nascer."
3. **Curiaçu**: "De pé, como a árvore que ele virou."
4. **Guacira**: "O vermelho escondido sob as escamas."
5. **Raiz**: "O que corre por dentro, de geração em geração."
6. **Gralha**: "Asas de escama, levando a semente adiante."

---

## 10. E-commerce funcional (item 14): o site deve funcionar

1. **Sacola** (Zustand + localStorage): adicionar, remover, quantidade, trocar tamanho,
   subtotal, badge. **Drawer lateral** (desktop) / bottom sheet (mobile) ao adicionar + página
   `/sacola`. Respeita estoque.
2. **Favoritos** persistidos (coração dos cards e da PDP).
3. **Cupons**: `PERMANENCIA10` (10%), `RENASCER` (frete grátis).
4. **Frete**: CEP com **ViaCEP** (`https://viacep.com.br/ws/{cep}/json/`), cálculo simulado por
   região, Padrão e Expressa, grátis acima de R$ 1.500.
5. **Checkout** em 3 passos (estilo FARM: branco, campos com contorno fino, botões pílula
   pretos): Identificação (nome, e-mail, CPF com validação, telefone) → Entrega (CEP, endereço
   autocompletado, frete) → Pagamento:
   - **Pix**: QR Code com payload de exemplo, copia e cola, timer 15 min, "Já paguei" (simulado).
   - **Cartão**: máscara, bandeira, Luhn, até 10× sem juros (como a FARM); `4000 0000 0000 0002`
     simula recusa. **Nunca** salve dados de cartão.
   - Opcional (Fase 7): Stripe Checkout em **modo teste** se eu fornecer as chaves.
   - Aviso: "Ambiente de demonstração · nenhuma cobrança real é feita."
6. Resumo do pedido sempre visível.
7. **Confirmação** `/pedido/[id]`: `RMN-2026-XXXX`, resumo, prazo, "Uma araucária já tem seu
   nome: nº ___", links para os Passaportes; limpa a sacola.
8. **Conta** `/conta`: login simulado (nome + e-mail), abas Pedidos, Favoritos, Serviços,
   Minhas araucárias, Passaportes.
9. Preços com `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`.
10. Teste o fluxo inteiro no navegador (adicionar → cupom → CEP `80010-000` → Pix →
    confirmação; e o cartão recusado).

---

## 11. Qualidade

- Acessibilidade: semântica, foco visível, teclado no Índice/drawers/bottom sheets/acordeões
  (focus trap, ESC), `alt` descritivo, AA, `lang="pt-BR"`, `prefers-reduced-motion`. O
  carrossel 3D precisa de alternativa navegável (setas, lista do Índice).
- Performance: Lighthouse mobile ≥ 85 (o 3D é carregado só em `/colecao` e com `dynamic`).
- SEO: metadata por página, Open Graph, `sitemap.ts`, `robots.ts`, JSON-LD.
- Responsivo de verdade (a PDP mobile é o padrão FARM, não o desktop encolhido).
- Dados e textos em `src/data/` para a equipe editar.
- README: como rodar, onde trocar imagens/preços/textos, como refazer os recortes, créditos
  (conceito e line-up: equipe Remanesce; projeto acadêmico).

---

## 12. Imagens

- `public/images/lineup/`: line-up original (frente e costas).
- `public/images/roupas/roupa-1..6/`: frente e verso de cada roupa (Tarefa 1).
- `public/images/looks/`: recortes antigos por look (pode remover depois que `roupas/` estiver
  validada e nada mais apontar para eles).
- `organizacao imagens/`: referência visual da Malu (cards e loja estilo FARM).
- As imagens são pequenas (~250×650 por roupa). Sobre `--linho`/`--papel` elas se fundem ao
  fundo; nunca estique além de ~1.5× o tamanho nativo. No hero e nas seções de ponta a ponta,
  use **closes recortados** (escamas, vermelho) com tratamento (grão, escurecimento) ou
  composições tipográficas, em vez de esticar uma foto pequena.
- Ilustrações (pinha, escama 3D, gralha, mapa, mockups) são SVG/3D feitos por você.

---

## 13. Não fazer

- Não copiar textos, logos ou imagens da A24, da Grace ou da FARM: só a linguagem visual e a
  estrutura.
- Não usar biblioteca de componentes pronta com cara de template (cards com sombra, bordas
  grossas, gradientes genéricos).
- Não usar o vermelho como fundo de seção.
- Não inventar dados factuais sobre araucária sem fonte; números do projeto são exemplos.

---

## 14. Fases

1. **Tarefa 1**: roupas recortadas frente/verso (+ PNG sem fundo). → commit
2. **Fundação**: Next, tokens, fontes, texturas, ícones, logo e símbolos, nav, Índice, menu,
   rodapé, transições de rota. → commit
3. **Loja e PDP FARM**: dados, cards, chips, grade com blocos editoriais, busca, PDP mobile e
   desktop, completar o look, avaliações. → commit
4. **E-commerce**: sacola, favoritos, cupons, CEP/frete, checkout, Pix/cartão, confirmação,
   conta. → commit
5. **Coleção A24**: loader, carrossel 3D de escamas, ficha técnica, críticas, Índice, página de
   cada look. → commit
6. **Início, Conceito e Raiz** (Grace): hero, manifesto, moldura sticky, glifo, seção escura,
   blur → foco, números, depoimento, FAQ. → commit
7. **Serviços, Marca, Passaporte, Sobre, 404** + polimento, acessibilidade, SEO, Stripe
   opcional, deploy Vercel. → commit

**Agora:** leia os arquivos da seção 0.3, me descreva a pasta `organizacao imagens/`, mostre o
plano e comece pela Tarefa 1.
