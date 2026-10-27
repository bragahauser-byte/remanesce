# PROMPT PARA O CLAUDE CODE — Site + E-commerce da REMANESCE

> Cole este arquivo inteiro no Claude Code, com o terminal aberto na pasta do projeto
> (`C:\Users\Pichau\Desktop\Projetos Github\Remanesce`). Ele é longo de propósito: tudo o que
> importa para o projeto está aqui. Antes de qualquer código, leia também `docs/briefing.md`,
> `docs/conceito.md` e veja as imagens em `public/images/`.

---

## 0. Seu papel e como trabalhar

Você é um(a) designer-desenvolvedor(a) sênior de experiências digitais de moda de luxo, no nível
de AKQA e Work & Co. Vai construir o site institucional + e-commerce funcional da marca
**Remanesce** e de sua coleção **"O Renascer da Permanência"**.

Regras de trabalho:
1. **Planeje primeiro.** Leia este prompt inteiro, os arquivos em `docs/` e as imagens. Depois
   me mostre um plano curto por fases (seção 13) e comece pela Fase 1 sem esperar aprovação.
2. **Trabalhe em fases e faça commit ao fim de cada uma**, com mensagens claras em português
   (ex.: `feat: sacola com persistência local`).
3. **Não apague** `docs/`, `public/images/`, `PROMPT.md`, `CLAUDE.md` nem `README.md`.
4. Todo o conteúdo visível do site em **português do Brasil**. Código, nomes de variáveis e
   componentes em inglês.
5. Ao terminar cada fase, rode `npm run build` e `npm run lint` e corrija tudo antes do commit.
6. Abra o site no navegador, olhe cada página em **1440px, 768px e 390px** e corrija o que
   estiver quebrado ou feio. Não declare uma página pronta sem ter olhado.
7. Quando eu precisar decidir algo (ex.: chave do Stripe), pergunte em uma linha e siga com o
   restante enquanto isso.

---

## 1. A marca em uma frase

**Remanesce** é uma marca de denim autoral que transforma a pinha da araucária em roupa:
peças que guardam memória, atravessam gerações e renascem em novas formas.

- **Assinatura:** _O que permanece, renasce._
- **Nome da coleção:** O Renascer da Permanência
- **Matéria:** 100% denim (jeans), com **pontos de vermelho** pontuais.
- **Causa:** replantio de araucárias (ação social ligada a cada compra).
- **Tom de voz:** poético, contido, sensorial e afetivo, nunca piegas. Frases curtas. Fala de
  memória, raiz, ciclo, semente, tempo. Nada de jargão de marketing ("imperdível", "arrase").

### O conceito em três camadas (base de toda a narrativa do site)
Leia `docs/conceito.md` (texto original da equipe). Resumo para estruturar a narrativa:

1. **Natureza / Biologia:** a araucária vive mais de 200 anos. A árvore masculina e a feminina só
   se reproduzem juntas: o pólen encontra a pinha, nasce o **pinhão**, que na terra vira nova
   árvore. → _permanência + renascimento._
2. **Paraná / Memória:** símbolo de identidade do Paraná desde antes da colonização, presente na
   paisagem, nas tradições e nas receitas de pinhão passadas de geração em geração.
   → _a cultura renasce a cada geração, com outras formas._
3. **Lenda:** Curiaçu vira araucária, Guacira vira **gralha-azul**. Ao enterrar os pinhões, a
   gralha continua escondendo o sangue do amado dos inimigos: o amor permanece em outra forma.
   → _transformação não é ruptura; é outra maneira de existir._

**Leitura visual da coleção (veja as imagens):** escamas de denim sobrepostas imitam as brácteas
da pinha; losangos e recortes em ponta; pespontos cor de cobre; barras desfiadas; o **vermelho**
aparece por dentro, nas fendas, nos forros e nos losangos, como o "sangue de Curiaçu" escondido
sob as escamas. **Use essa ideia como regra de design do site inteiro: o vermelho quase nunca é
superfície; ele aparece por baixo, nas aberturas, nos detalhes revelados.**

---

## 2. O que tirar de cada referência

Não copie nenhum site. Extraia princípios:

| Referência | O que levar para a Remanesce |
|---|---|
| **AKQA × LOEWE (Casa LOEWE)** | UX/UI inspirada em **galeria de arte**: interface mínima, muito respiro, o produto é a obra. Narrativa da marca e e-commerce funcional convivendo no mesmo sistema. Artesania em primeiro plano. |
| **AKQA × Louis Vuitton (LV App)** | Três pilares: **personalização, imersão, exclusividade**. Navegação clara (Explorar · Loja · Serviços · Minha conta · Sacola). **Serviços** como parte da marca (reparo, customização, agendamento). Sistema de design modular e diretrizes de apresentação dos looks. |
| **AKQA × Dior (The Maison Dior)** | **Serifa editorial** de alto contraste como voz da marca. **Fundo que muda de tom** enquanto se navega. **Motion** que conduz o olhar de um ponto focal para o próximo. Camadas translúcidas (vidro) sobre imagem, ecoando profundidade. |
| **Work & Co × JW Anderson** | Convite a **vagar**: descoberta acima de categorias rígidas. **Grade variada** (tamanhos e tipos de imagem alternando: detalhe × look inteiro). **PDP abrindo como painel grande** sobre a grade, com entrar e sair sem perder o lugar. **Type tags**: etiquetas tipográficas com humor e surpresa apontando peças-herói. "Ver, clicar, comprar" sem atrito. |

---

## 3. Stack técnica

- **Next.js 15+ (App Router) + TypeScript + React 19**
- **Tailwind CSS v4** com tokens da marca em CSS variables (seção 4)
- **GSAP + ScrollTrigger** para a narrativa em scroll; **Lenis** para scroll suave (desligar com
  `prefers-reduced-motion`)
- **Zustand** (com `persist`) para sacola, guardados e pedidos
- **React Hook Form + Zod** para checkout e formulários
- **next/font** para as fontes do Google (seção 5)
- **next/image** para todas as imagens
- Ícones: **SVG próprios** em componentes React (seção 7). Não usar biblioteca de ícones pronta,
  exceto como fallback temporário.
- Deploy: **Vercel**. Repositório: GitHub `bragahauser-byte/remanesce`.

### Iniciar o projeto nesta pasta
A pasta já tem arquivos (`docs/`, `public/images/`, `.md`). O `create-next-app` pode recusar
pasta não vazia. Então: crie o app numa pasta temporária (`npx create-next-app@latest tmp-app
--ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm`), mova o conteúdo para a
raiz **sem sobrescrever** os arquivos existentes (mescle o `.gitignore` e o `public/`) e apague a
pasta temporária.

### Estrutura sugerida
```
src/
  app/
    (site)/page.tsx                 → Início
    colecao/page.tsx                → O Renascer da Permanência (narrativa)
    loja/page.tsx                   → Loja (grade de descoberta)
    loja/[slug]/page.tsx            → PDP (página cheia; também abre como painel)
    @modal/(.)loja/[slug]/page.tsx  → PDP como painel sobre a grade (intercepting route)
    looks/page.tsx                  → Os 6 looks
    raiz/page.tsx                   → Raiz (araucária, replantio, sustentabilidade)
    servicos/page.tsx               → Serviços de Permanência
    marca/page.tsx                  → Identidade (brandbook vivo: itens 8–12)
    sacola/page.tsx                 → Sacola
    checkout/page.tsx               → Checkout (3 passos)
    pedido/[id]/page.tsx            → Confirmação do pedido
    passaporte/[codigo]/page.tsx    → Passaporte da Peça (QR da etiqueta)
    conta/page.tsx                  → Minha Remanesce (pedidos, guardados, árvores)
    sobre/page.tsx                  → Sobre a marca
    not-found.tsx
  components/  (ui/, layout/, shop/, story/, brand/, icons/)
  data/products.ts  data/looks.ts  data/copy.ts
  lib/  (cart store, format BRL, shipping, cep, order)
  styles/tokens.css
```

---

## 4. Família de cores (item 9)

Cores extraídas do próprio line-up. Defina como CSS variables e tokens do Tailwind.

| Token | Nome | HEX | Uso |
|---|---|---|---|
| `--linho` | Linho | `#F1EDE4` | Fundo principal (igual ao fundo do line-up) |
| `--linho-escuro` | Linho cru | `#E4DDD0` | Fundos secundários, cards, divisórias |
| `--indigo` | Índigo Remanescente | `#161B27` | Texto principal, fundos escuros, o denim |
| `--denim` | Denim lavado | `#2B3445` | Superfícies escuras secundárias, hover |
| `--casca` | Casca de araucária | `#391502` | Títulos sobre linho (o marrom dos slides da equipe) |
| `--pinhao` | Vermelho pinhão | `#650410` | O vermelho da coleção. Uso **raro**: revelações, preço em promoção, badge da sacola, foco |
| `--pinhao-vivo` | Vermelho brasa | `#8E1420` | Hover/estado ativo do vermelho |
| `--cobre` | Pesponto | `#B9763E` | Linhas de costura, sublinhados, divisórias tracejadas, detalhes |
| `--gralha` | Azul gralha | `#2F5D9E` | Acento raríssimo, só na seção da lenda (a gralha-azul) |
| `--araucaria` | Verde araucária | `#34402E` | Só na página Raiz / replantio |

Regras:
- Proporção geral: ~70% linho, ~25% índigo/denim, ~5% cobre + vermelho.
- Contraste AA mínimo em todo texto. Nunca texto vermelho pequeno sobre índigo.
- O **fundo muda de tom com o scroll** em páginas narrativas (linho → linho cru → denim → índigo),
  interpolando suavemente: a página "escurece como o tempo passando" e "clareia ao renascer".

---

## 5. Família de fontes (item 10): três fontes

| Papel | Fonte (Google Fonts) | Por quê |
|---|---|---|
| **Títulos** | **Bodoni Moda** (variável; use itálico em palavras-chave) | Serifa de alto contraste, editorial, linhagem de maison. As hastes finas e grossas lembram o pesponto sobre o denim. |
| **Subtítulos, rótulos, etiquetas, preços** | **IBM Plex Mono** (400/500, sempre em caixa alta com tracking 0.08em) | Voz de **etiqueta, arquivo e catalogação**: memória registrada, código da peça, tag de jeans. É a fonte das type tags. |
| **Texto corrido** | **Instrument Sans** (400/500) | Sans contemporânea, legível, neutra, que deixa a serifa e a mono brilharem. |

Escala (desktop; reduza ~30% no mobile, use `clamp()`):
- Display hero: Bodoni Moda 160–220px, entrelinha 0.9, tracking −0.02em
- H1: 96px · H2: 64px · H3: 40px · H4: 28px
- Rótulo mono: 12–13px caixa alta
- Corpo: 17px / 1.6 · Pequeno: 14px

O logotipo **REMANESCE** é em Bodoni Moda caixa alta, tracking largo (0.18em).

---

## 6. Kit de texturas (item 11)

Crie como **SVG/CSS reutilizáveis** (componentes ou classes utilitárias), leves e sutis:

1. **Sarja (twill):** linhas diagonais finas a 63°, como o tecido do jeans. `repeating-linear-gradient`
   em opacidade 4–6% sobre índigo. Fundo das seções escuras.
2. **Escamas da pinha:** padrão de escamas pontudas sobrepostas (como as brácteas e as peças do
   line-up). SVG `<pattern>` com stroke cobre fino. É a **textura-assinatura**.
3. **Pesponto:** linha tracejada cor cobre (`stroke-dasharray: 6 4`), usada como divisória,
   contorno de cards em hover e sublinhado de links.
4. **Losango vermelho:** losango alongado vertical em `--pinhao`, como os recortes da calça do
   look 5. Usado como marcador, bullet e "ponto vermelho" de destaque.
5. **Desfiado:** borda inferior irregular (máscara SVG com franjas) para terminar seções, como as
   barras desfiadas da saia do look 1.
6. **Grão de papel:** ruído muito sutil (SVG `feTurbulence`, 3% de opacidade) sobre o linho, para
   o fundo não parecer digital demais.

Monte uma página `/marca` mostrando cada textura com nome e uso.

---

## 7. Ícones da marca (item 12)

Conjunto **próprio** em SVG, 24×24, stroke 1.25px, cantos levemente arredondados, cor `currentColor`.
Desenhe à mão em código (paths limpos), com o mesmo vocabulário geométrico das escamas:

**Símbolo da marca:** uma **pinha geométrica** formada por escamas em ponta (chevrons sobrepostos)
dentro de um losango vertical, com um **pequeno pinhão vermelho** no centro. Versões: símbolo
sozinho, símbolo + logotipo horizontal, símbolo + logotipo empilhado. Favicon a partir do símbolo.

**Ícones de interface (com metáfora da marca):**
- Sacola → sacola de papel com alça de cordão
- Guardar (favoritos) → **pinhão** (contorno; preenchido em vermelho quando guardado) — "guardar
  como a gralha guarda a semente"
- Conta → silhueta simples
- Busca → lupa
- Menu → duas linhas de pesponto tracejadas
- Fechar → X fino
- Seta → seta fina longa (estilo editorial)
- Mais / menos → para quantidade

**Ícones narrativos:** pinha, pinhão, escama, araucária (silhueta em taça), gralha-azul, broto/muda,
agulha e linha, gerações (três anéis concêntricos como anéis de árvore), regador, mapa do Paraná
(contorno simplificado), etiqueta, QR.

Componente `<Icon name="pinhao" />` com todos os ícones; mostrar a grade completa em `/marca`.

---

## 8. Motion e interações-assinatura

Princípio: **o motion conduz o olhar** (Dior) e **sempre conta a ideia de revelar o que estava
guardado** (escamas que abrem, vermelho que aparece por baixo). Easing padrão:
`cubic-bezier(0.22, 1, 0.36, 1)`. Durações de 400 a 900ms. Nada piscando, nada saltitante.

1. **Hero "a pinha que abre":** na Início, uma pinha em SVG feita de ~40 escamas. No scroll
   (ScrollTrigger com pin), as escamas se abrem e se afastam em espiral; no centro aparece um
   pinhão vermelho; ele "cai" e a tela transita para o primeiro look da coleção. Texto que
   acompanha, em três tempos: _"Tudo muda."_ → _"Nada se perde."_ → _"O que permanece, renasce."_
2. **Transição entre páginas "escama":** um painel índigo com borda inferior em escamas pontudas
   desce e sobe (600ms) entre rotas. Respeitar `prefers-reduced-motion` (vira fade simples).
3. **Revelação vermelha no hover:** cards de produto: ao passar o mouse, troca a foto
   frente → costas e uma faixa fina vermelha aparece na base, "por baixo" do card, como o forro.
4. **Fundo que muda de tom** conforme as seções (seção 4).
5. **Títulos que entram linha a linha** (máscara de baixo para cima), com uma palavra em itálico.
6. **Cursor personalizado** (só desktop, pointer fine): círculo fino; sobre produto vira um
   pequeno losango com "VER"; sobre link de lenda vira um pinhão.
7. **Contador de araucárias** que conta até o número ao entrar na tela.
8. Tudo com fallback acessível: `prefers-reduced-motion` desliga pin, Lenis e parallax.

---

## 9. Arquitetura e páginas

### Navegação
- **Header** fixo, mínimo, fundo transparente que vira linho com blur ao rolar (vidro, Dior).
  Esquerda: menu. Centro: logotipo REMANESCE. Direita: busca, conta, guardados (pinhão), sacola
  com contador (badge vermelho).
- **Menu** em tela cheia (índigo com textura sarja) com links grandes em Bodoni Moda: Coleção ·
  Loja · Looks · Raiz · Serviços · Marca · Sobre. Ao passar o mouse num link, aparece a imagem de
  um look ao lado.
- **Barra inferior mobile** (inspiração LV): Explorar · Loja · Serviços · Conta · Sacola.
- **Footer** índigo com borda superior desfiada: newsletter "Receba as próximas sementes",
  links, contador de araucárias plantadas, redes, CNPJ fictício, aviso "Projeto acadêmico".

### 9.1 Início `/`
1. Hero "a pinha que abre" (seção 8.1).
2. Manifesto curto (texto da seção 10).
3. **Os seis looks** em faixa horizontal (scroll lateral preso ao scroll vertical), cada um com
   número em mono (`LOOK 01 / 06`) e nome.
4. **Três camadas** do conceito: Natureza · Memória · Lenda, cada uma com ícone, título e uma
   frase; link para `/colecao`.
5. Seção **Raiz**: "Cada peça planta uma araucária." Contador + CTA para `/raiz`.
6. **Serviços de Permanência** (3 cards).
7. Destaques da loja (4 produtos, grade variada).
8. Footer.

### 9.2 Coleção `/colecao`: "O Renascer da Permanência"
Narrativa longa em scroll, como um livro editorial. Fundo muda de tom por capítulo.
- Abertura: título grande + subtítulo "Coleção 01 · Denim e vermelho".
- **Capítulo I: Natureza.** Texto sobre os 200 anos, o pólen, a pinha, o pinhão. Ilustração SVG
  do ciclo (pólen → pinha → pinhão → muda → árvore) animada no scroll, desenhada como diagrama
  circular (a vida é cíclica).
- **Capítulo II: Memória.** Paraná, identidade, receitas de pinhão passadas entre gerações.
  Bloco "Memórias que permanecem": 4 cards de memórias curtas (ex.: "A sapecada de pinhão na casa
  da avó em Curitiba"), com nome e cidade fictícios, marcados no código como conteúdo de exemplo.
- **Capítulo III: Lenda.** Curiaçu e Guacira em três quadros. Aqui entra o **azul gralha**. A
  gralha (ícone SVG) atravessa a tela e "enterra" pinhões; cada pinhão enterrado, ao entrar na
  tela, revela uma pequena mancha vermelha que vira um broto. Texto da lenda reescrito a partir
  de `docs/conceito.md`, com crédito à tradição oral paranaense.
- **Do conceito à peça:** como a pinha virou roupa: escamas → brácteas; vermelho por dentro →
  sangue escondido; losangos → sementes. Mostrar detalhes recortados das imagens dos looks
  (zoom com `object-position`).
- **Line-up completo:** as duas imagens originais (frente e costas) lado a lado, com alternância
  frente/costas e cada look clicável para o produto.
- CTA: "Entrar na loja".

### 9.3 Loja `/loja`: grade de descoberta (JW Anderson + galeria LOEWE)
- **Grade variada:** 12 colunas no desktop; cada produto tem um `weight` (1 a 3) em
  `data/products.ts` que define se ocupa 3, 4 ou 6 colunas. Alterne foto de look inteiro com foto
  de detalhe (recorte via `object-position` + `scale`). Ordem com leve aleatoriedade
  determinística (seed por dia) para parecer sempre fresca, mas estável no SSR.
- Entre os produtos, **inserções editoriais**: uma frase do conceito em Bodoni gigante, uma
  textura, uma citação.
- **Type tags** sobre produtos-herói: etiquetas mono com fundo de cor e leve rotação (−3° a 3°):
  `PEÇA-HERÓI`, `VERMELHO POR DENTRO`, `ÚLTIMAS UNIDADES`, `100% DENIM`, `PLANTA 1 ARAUCÁRIA`.
- Filtros discretos em linha (mono): Tudo · Tops · Saias · Calças · Vestidos · Jaquetas;
  ordenar por Destaque / Menor preço / Maior preço. Alternar visualização "Galeria" (grande) e
  "Arquivo" (grade densa, só fotos e códigos). Filtros refletidos na URL (`?cat=calcas`).
- Clicar num produto **abre a PDP como painel grande** deslizando da direita, cobrindo ~85% da
  tela, com a grade visível ao fundo (intercepting route `@modal`). ESC, clique fora ou seta
  "Voltar à loja" fecham sem perder o scroll. Acessar a URL direto abre a página cheia.
- Busca: overlay com input grande, resultados instantâneos por nome, categoria, look e cor.

### 9.4 Produto (PDP) `/loja/[slug]`
- Galeria: frente, costas e 2 detalhes (recortes). Desktop: imagens empilhadas à esquerda,
  informações fixas (sticky) à direita. Mobile: carrossel com swipe e indicadores em pesponto.
- Zoom ao clicar (lightbox).
- Informações: código mono (`RMN-01-TOP`), nome em Bodoni, preço em BRL, parcelamento
  ("ou 6× de R$ X sem juros"), cor ("Índigo profundo · detalhes em vermelho pinhão").
- **Seletor de tamanho** (PP, P, M, G, GG; calças 34–46) com estados indisponíveis riscados e
  link "Guia de medidas" (modal com tabela).
- Quantidade, botão **"Adicionar à sacola"** (índigo; ao adicionar, microanimação: o ícone da
  sacola recebe um pinhão que "cai" nele, e abre o mini-carrinho lateral).
- Botão guardar (pinhão).
- Acordeões: **A história da peça** (como ela traduz a pinha), **Composição e cuidados**
  (100% algodão denim 12oz; lavar do avesso, água fria, secar à sombra; "Quanto menos lavar, mais
  ela guarda sua forma."), **Entrega e trocas**, **Passaporte da Peça e replantio**.
- Bloco "Completa o look": outras peças do mesmo look.
- Bloco "Esta peça planta uma araucária" com ícone de muda.
- Dados estruturados `Product` (JSON-LD) para SEO.

### 9.5 Looks `/looks`
Os 6 looks em tela cheia, um por vez (scroll snap). Cada look: imagem frente, toggle
frente/costas, nome do look, frase poética, peças listadas com preço e botão "Comprar o look"
(adiciona todas as peças com tamanho M por padrão e abre a sacola para ajuste de tamanhos).

### 9.6 Raiz `/raiz`: sustentabilidade e ação social
- Título: "Cada peça, uma araucária."
- Explicação do compromisso: **a cada peça vendida, uma muda de araucária é plantada** em
  parceria com projetos de reflorestamento no Paraná. Deixe claro no código e numa nota de
  rodapé discreta que a parceria e os números são **exemplos do projeto acadêmico**.
- **Contador** de araucárias plantadas (valor base em `data/copy.ts` + vendas feitas no site via
  store local).
- **Mapa do Paraná** em SVG simplificado com 5 pontos de plantio fictícios; hover mostra cidade e
  número de mudas.
- **Ciclo do denim:** escolha de algodão, aproveitamento de retalhos (as escamas usam sobras de
  corte), lavagem com menos água, embalagem de papel-semente.
- Programa **"Devolva e Renasça"**: traga um jeans antigo; ele vira escamas de novas peças e você
  ganha crédito. Formulário simples (nome, e-mail, peça) com confirmação na tela.
- Seção curta sobre a araucária ser espécie ameaçada e por que replantar importa (texto
  factual, sem números inventados; se usar dados, cite fonte real).

### 9.7 Serviços de Permanência `/servicos` (inspiração LV)
Três serviços, cada um com card, descrição e formulário de agendamento (data, horário, contato,
descrição) que gera um protocolo na tela e salva em "Minha Remanesce":
1. **Reparo para sempre:** costura, troca de escamas danificadas, botões e zíperes, por toda a
   vida da peça.
2. **Ajuste sob medida:** barra, cintura, comprimento.
3. **Ressignificar:** transformar uma peça antiga sua (ou de alguém da família) em uma peça
   Remanesce, com escamas e detalhes em vermelho. "A memória da sua família, em outra forma."

### 9.8 Marca `/marca`: brandbook vivo (itens 8 a 12)
Página que funciona como manual de identidade navegável (âncoras laterais):
- **Logo:** versões (horizontal, empilhada, símbolo), área de proteção, tamanho mínimo, usos
  incorretos (4 exemplos riscados).
- **Cores (item 9):** amostras grandes com nome, HEX, RGB, CMYK aproximado, uso e proporção. Clique
  copia o HEX.
- **Fontes (item 10):** as três fontes com especímenes, pesos, escala e exemplo aplicado.
- **Texturas (item 11):** as 6 texturas com nome e uso.
- **Ícones (item 12):** grade completa de ícones, nome em mono, clique copia o SVG.
- **Modos de aplicação e mockups (item 8):** construa **mockups ilustrados em SVG/CSS** (não fotos):
  - **Sacola** de papel kraft cru com símbolo em índigo, alça de cordão vermelho.
  - **Caixa/embalagem** índigo com textura de escamas em relevo e interior vermelho (a caixa
    "abre" no hover, revelando o vermelho, como a pinha).
  - **Tag de papel-semente** pendurada por cordão: frente com logo; verso "Plante esta etiqueta."
    + QR do Passaporte.
  - **Etiqueta interna bordada** (tecida): REMANESCE + "O que permanece, renasce." + código.
  - **Etiqueta de couro/patch** da cintura do jeans com o símbolo gravado.
  - **Cartão de agradecimento** com texto manuscrito simulado e o número da araucária plantada.
  - **Cartão de visita** (frente índigo com símbolo; verso linho com dados).
  - **Papel de seda** com padrão de escamas.
  - **Post de Instagram** (feed e story) com a identidade aplicada.
  Cada mockup com legenda explicando materiais e uso. Botão "Baixar PDF do manual" pode imprimir
  a página com CSS `@media print` bem feito.

### 9.9 Passaporte da Peça `/passaporte/[codigo]`
Página que o QR da etiqueta abre. Mostra: foto da peça, nome, look, data de criação, "Esta peça
plantou a araucária nº ___", mapa do ponto de plantio, a história da peça e um espaço
**"Memórias desta peça"** onde o dono pode registrar (localStorage) onde a usou e o que viveu
com ela, para passar adiante. Use os códigos dos produtos (`/passaporte/RMN-01-TOP`).

### 9.10 Sobre `/sobre`
Quem faz a Remanesce, propósito, a escolha do denim ("o tecido que envelhece com quem veste e
guarda a memória do corpo"), equipe (placeholders editáveis), contato.

### 9.11 404
"Esta página voltou à terra. Talvez ela renasça em outro lugar." + link para Início.

---

## 10. Textos principais (use exatamente ou como base)

**Hero:** "Tudo muda. Nada se perde. **O que permanece, renasce.**"

**Manifesto (Início):**
> Somos feitos do que permanece.
> Da árvore que atravessa dois séculos. Da semente guardada na terra. Da receita que a avó
> ensinou sem escrever.
> A Remanesce nasce da pinha da araucária e de tudo que ela ensina: que a permanência não é ficar
> parado, é continuar existindo em outra forma.
> Cada peça é denim. Cada escama, uma memória. E, por dentro, o vermelho que ninguém vê, mas que
> sustenta tudo.

**Três camadas:**
- Natureza: "Duzentos anos de pé. Uma semente de cada vez."
- Memória: "Passada de mão em mão, de geração em geração."
- Lenda: "Curiaçu virou árvore. Guacira virou gralha. O amor virou semente."

**Raiz:** "Cada peça, uma araucária. O que você veste hoje volta à terra como floresta."

**Serviços:** "Uma peça Remanesce não termina. Ela se transforma com você."

**Newsletter:** "Receba as próximas sementes." · placeholder "seu e-mail" · botão "Plantar".

**Microcopy:**
- Sacola vazia: "Sua sacola ainda é semente." + "Explorar a loja"
- Guardados vazio: "Nada guardado ainda. A gralha também começa com um pinhão."
- Adicionado: "Guardado na sacola."
- Pedido confirmado: "Pedido recebido. Uma araucária já tem seu nome."
- Erro de formulário: frases curtas e gentis ("Confira o CEP, por favor.")

---

## 11. Catálogo (`src/data/products.ts`)

13 produtos, 6 looks. Imagens já recortadas em `public/images/looks/look-0X-frente.jpg` e
`look-0X-costas.jpg` (cada arquivo mostra o look inteiro). Para cada **peça**, use a imagem do
look com `object-position`/zoom para focar a peça como "detalhe", e a imagem inteira como "look".
**Preços são sugestões; deixe fáceis de editar.**

| Código | Nome | Categoria | Look | Descrição curta | Preço |
|---|---|---|---|---|---|
| RMN-01-TOP | Top Bráctea | Tops | 01 | Cropped de gola alta com escamas sobrepostas em um ombro só, como a pinha se abrindo de um lado. | R$ 489 |
| RMN-01-SAI | Saia Bráctea | Saias | 01 | Midi assimétrica com cascata de escamas no quadril e barra desfiada em diagonal. | R$ 689 |
| RMN-02-VES | Vestido Semente | Vestidos | 02 | Midi sem mangas em recortes de losango, com pontos de travete vermelho em cada encontro e barra em pontas. | R$ 1.290 |
| RMN-03-TOP | Top Curiaçu | Tops | 03 | Frente única de gola camisa com zíper e barra em escamas. | R$ 449 |
| RMN-03-CAL | Calça Curiaçu | Calças | 03 | Pantalona de cintura alta com escamas descendo pelas laterais, do quadril à barra. | R$ 890 |
| RMN-04-TOP | Top Guacira | Tops | 04 | Ombro único inteiramente coberto de escamas. | R$ 520 |
| RMN-04-SAI | Saia Guacira | Saias | 04 | Longa de escamas com fenda frontal e franjas vermelhas escondidas por baixo: o sangue guardado. | R$ 1.490 |
| RMN-05-JAQ | Jaqueta Raiz | Jaquetas | 05 | Bomber cropped de gola alta e mangas bufantes, com losangos vermelhos embutidos nas costuras. | R$ 1.190 |
| RMN-05-FAI | Top Faixa Raiz | Tops | 05 | Bandeau de denim com pesponto aparente. | R$ 289 |
| RMN-05-CAL | Calça Raiz | Calças | 05 | Wide leg com recortes em losango vermelho ao longo das laterais, presos por travetes de metal. | R$ 990 |
| RMN-06-JAQ | Jaqueta Gralha | Jaquetas | 06 | Cropped de gola alta com zíper, ombros vazados e mangas inteiras de escamas forradas de vermelho. | R$ 1.390 |
| RMN-06-SAI | Saia Pinha | Saias | 06 | Mini de escamas em camadas com pontas vermelhas aparecendo entre elas. | R$ 690 |

Mais um produto acessório para ter variedade de preço:
| RMN-00-ACE | Lenço Escama | Acessórios | — | Lenço de retalhos de denim da coleção, borda desfiada, com um losango vermelho bordado. | R$ 189 |

Para cada produto inclua: `slug`, `code`, `name`, `category`, `look`, `price` (centavos),
`images` (frente, costas, detalhe com `objectPosition` e `zoom`), `sizes` com estoque fictício
(alguns esgotados), `story` (2–3 frases ligando a peça à pinha, à memória ou à lenda),
`composition`, `care`, `tags` (type tags), `weight` (1–3), `featured`.

**Looks (`src/data/looks.ts`):** número, nome e frase:
1. **Bráctea:** "A pinha começa a se abrir."
2. **Semente:** "Cada losango guarda o que vai nascer."
3. **Curiaçu:** "De pé, como a árvore que ele virou."
4. **Guacira:** "O vermelho escondido sob as escamas."
5. **Raiz:** "O que corre por dentro, de geração em geração."
6. **Gralha:** "Asas de escama, levando a semente adiante."

---

## 12. E-commerce funcional (item 14): "o site deve funcionar"

Fluxo completo de ponta a ponta, sem backend obrigatório:

1. **Sacola** (Zustand + persist em localStorage): adicionar, remover, alterar quantidade e
   tamanho, subtotal, contador no header. **Mini-sacola lateral** (drawer) ao adicionar + página
   `/sacola` completa. Limite pelo estoque do tamanho.
2. **Guardados** (favoritos) persistidos, com página em `/conta`.
3. **Cupom:** `PERMANENCIA10` = 10% de desconto; `RENASCER` = frete grátis. Validação com
   mensagem.
4. **Frete:** campo de CEP com busca no **ViaCEP** (`https://viacep.com.br/ws/{cep}/json/`) para
   preencher endereço. Cálculo simulado por região (Sudeste/Sul mais barato), duas opções
   (Padrão e Expressa) com prazo. Frete grátis acima de R$ 1.500.
5. **Checkout** em 3 passos com barra de progresso em pesponto: **Identificação** (nome, e-mail,
   CPF com máscara e validação de dígitos, telefone) → **Entrega** (CEP, endereço autocompletado,
   número, complemento, escolha do frete) → **Pagamento**:
   - **Pix:** gera QR Code (biblioteca `qrcode`) com um payload de exemplo + código copia e cola
     + timer de 15 min + botão "Já paguei" que confirma (simulado).
   - **Cartão:** formulário com máscara, detecção de bandeira, validação Luhn, parcelas até 6×
     sem juros. Aprovação simulada; o cartão de teste `4000 0000 0000 0002` simula recusa, para
     mostrar o estado de erro. **Nunca** salve dados de cartão em lugar nenhum.
   - **Opcional (Fase 7):** se eu fornecer `STRIPE_SECRET_KEY`/`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
     de **modo de teste**, integrar Stripe Checkout via Route Handler. Sem as chaves, o
     pagamento simulado continua funcionando.
   - Aviso discreto no checkout: "Ambiente de demonstração · nenhuma cobrança real é feita."
6. **Revisão do pedido** sempre visível ao lado (resumo, cupom, frete, total, parcelas).
7. **Confirmação** `/pedido/[id]`: número do pedido (`RMN-2026-XXXX`), resumo, previsão de entrega,
   "Uma araucária já tem seu nome: nº ____", link para o Passaporte das peças. Limpa a sacola.
   Dispara a animação do pinhão caindo e virando broto.
8. **Minha Remanesce** `/conta`: login simples simulado (só nome + e-mail, localStorage), com
   abas Pedidos (histórico), Guardados, Serviços agendados, **Minhas araucárias** (uma por peça
   comprada) e Passaportes.
9. Preços sempre em `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`.
10. Estoque decrementa localmente após a compra.

Teste o fluxo inteiro você mesmo no navegador (adicionar → cupom → CEP real, ex. `80010-000` em
Curitiba → Pix → confirmação; e o cartão recusado) antes de fechar a fase.

---

## 13. Fases de entrega

1. **Fundação:** projeto Next, tokens (cores, fontes, espaçamentos), texturas, ícones, logo e
   símbolo, layout (header, menu, footer, barra mobile), transição de página. → commit
2. **Catálogo e loja:** dados, grade de descoberta, filtros, busca, type tags, PDP página +
   painel. → commit
3. **E-commerce:** sacola, guardados, cupom, frete/CEP, checkout, Pix/cartão, confirmação,
   conta. → commit
4. **Narrativa:** Início com a pinha que abre, `/colecao` com os três capítulos, `/looks`. → commit
5. **Raiz, Serviços, Passaporte, Sobre, 404.** → commit
6. **Marca `/marca`:** brandbook vivo com todos os mockups. → commit
7. **Polimento:** acessibilidade, performance, SEO, Stripe opcional, responsividade, revisão de
   textos. → commit e deploy na Vercel.

---

## 14. Qualidade (não negociável)

- **Acessibilidade:** HTML semântico, foco visível (contorno pesponto cobre), navegação por
  teclado no menu, painel da PDP, drawers e modais (focus trap, ESC), `alt` descritivo em toda
  imagem, contraste AA, `prefers-reduced-motion`, `lang="pt-BR"`.
- **Performance:** Lighthouse ≥ 90 em mobile. Imagens com `next/image` e `sizes` corretos, GSAP
  carregado só onde é usado, fontes com `display: swap`.
- **SEO:** metadata por página, Open Graph com imagem do line-up, `sitemap.ts`, `robots.ts`,
  JSON-LD de Product e Organization.
- **Responsivo de verdade:** o mobile não é a versão desktop encolhida; a grade da loja vira 2
  colunas alternando 1 e 2 de largura; o painel da PDP vira tela cheia que sobe de baixo.
- **Código:** componentes pequenos, sem `any`, dados separados da UI, textos em `data/copy.ts`
  para a equipe editar sem mexer em componente.
- **README** atualizado com como rodar, estrutura, onde trocar imagens/preços/textos, e
  créditos (conceito: equipe Remanesce; imagens do line-up: equipe; projeto acadêmico).

---

## 15. Imagens: o que existe e o que fazer

- `public/images/lineup/lineup-frente.jpg` e `lineup-costas.jpg`: line-up completo (1600×900).
- `public/images/looks/look-01..06-frente.jpg` e `-costas.jpg`: um look por arquivo.
- As imagens têm baixa resolução (~260×660 por look). Use-as com elegância: fundo linho
  idêntico ao da imagem (`#F1EDE4`) para a figura "flutuar" na página, nunca esticadas além de
  ~1.5× do tamanho nativo; em áreas grandes, combine com tipografia e texturas em vez de imagem
  gigante.
- Deixe a estrutura pronta para trocar por fotos de editorial depois (mesmos nomes de arquivo ou
  campos em `products.ts`).
- Ilustrações (pinha, ciclo, gralha, mapa, mockups) são **SVG feitos por você**.

---

## 16. Primeiro passo agora

1. Leia `docs/briefing.md`, `docs/conceito.md`, `CLAUDE.md` e olhe as imagens.
2. Me mostre o plano por fases em até 15 linhas.
3. Comece a Fase 1.
