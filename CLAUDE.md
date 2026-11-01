# CLAUDE.md — Remanesce

Contexto permanente para o Claude Code. A especificação completa está em `PROMPT.md` (v2; a direção de arte atual é a v3, abaixo).

## Projeto
Site + e-commerce funcional da marca de denim autoral **Remanesce**, coleção
**"O Renascer da Permanência"** (tema: pinha da araucária). Projeto acadêmico.

## Direção de arte (v3, 28/10/2026)
- Estudo de interação a partir de **brandonyasin.com**, adaptado para moda (a v2, com A24,
  gracefashion e FARM, foi substituída).
- Só três páginas principais: **Início** (galeria horizontal de looks), **Sobre nós** (`/sobre`, com a
  lenda da Araucária da RPC; `/conceito` redireciona) e **Raiz**.
  Cada look abre em `/looks/[slug]` (hero dividido, peças alternando imagem/texto, próximo look).
  Sacola, checkout, pedido, passaporte e marca continuam como páginas utilitárias, fora do menu.
- Menu = páginas em cartões sobre o azul **#263054** (`components/layout/menu.tsx`): a página atual
  encolhe até virar cartão com escala UNIFORME + clip-path (`coverFrom`). Nunca usar scaleX/scaleY
  diferentes: isso esticava os pôsteres. Pôsteres com logotipo e a Sugar apple no alto.
- Header: uma linha na grade do site, tudo alinhado pela linha de base (`barClass`/`logoClass` em
  `components/layout/header.tsx`, reusados no menu aberto): logotipo na coluna 1, rótulo na coluna 9,
  Menu/Sacola na margem direita; textos em Plus Jakarta 16 px/400. Sem relógio e sem seletor de tema.
  Na sacola o header fica branco, sem `mix-blend-difference`.
- Eixos das páginas: coluna 1 (margem) e coluna 9 (grade de 14). Hero, blocos de peça e header usam
  esses dois; a sacola usa subgrid (miniatura na coluna 1, texto na seguinte, preço na margem direita).
- Logotipo e "Início" saem com `TransitionLink` (`components/layout/page-transition.tsx`): opacidade
  e deslocamento, sem escala.
- Card → look: a imagem voa até a foto da página (`lib/store/flight.ts` + `flight-layer.tsx`).
  O hero do look mostra frente e costas (empilhadas no desktop, carrossel no celular).
- Ordem da vitrine em `data/collection.ts` (`showcase`): Raiz, Semente, Curiaçu, Guacira, Bráctea,
  Gralha; os números exibidos (01–06) são a posição na vitrine, os códigos RMN-0N não mudam.
- Tipografia: **PP Pangaia** (`src/fonts/`, Ultralight/UltralightItalic/Medium, `font-display`,
  utilities `headline` e `title-display`) nos títulos grandes, nomes das peças e páginas do menu;
  **Plus Jakarta Sans** no resto; tamanhos em múltiplos de 4/8
  (12 · 16 · 24 · 32 · 40 · 48 · 64 · 96 · 120), variando peso (300–700) e cor (fg, soft, muted).
- Tema único claro. Sacola em `surface-azul` (#263054, texto branco), com a gralha (`bird-linha.svg`)
  pousada no fio, como na referência `sacola/image 4135`.
- Grade de 6/14 colunas com gap de 8 px e margem de 8/16 px (utility `grid-site`).
- Imagens das peças: `public/images/pecas/<look>/` (WebP 800/1600), geradas por `npm run imagens`
  a partir de `modelos e roupas/` (pasta local, fora do git); o favicon (`src/app/icon.png` e
  `apple-icon.png`) sai de `favcon/favcon.jpg`. O Lenço Escama saiu do catálogo. `referencias/`, `sacola/`, `identidade visual/` e `tipografia/` ficam fora do repositório.

## Fontes de verdade
`PROMPT.md` · `docs/conceito.md` · `docs/briefing.md` · `organizacao imagens/` · `public/images/`

## Regras rápidas
- Conteúdo em pt-BR; código em inglês. Preços e textos em `src/data/`.
- O vermelho aparece por baixo/por dentro, nunca como fundo de seção.
- `prefers-reduced-motion` em toda animação; 3D com fallback.
- `npm run build` e `npm run lint` antes de cada commit; olhar em 360/390/768/1280/1440/1920px.
- Nunca salvar dados de cartão. Pagamento simulado (Stripe só em modo teste, opcional).
- Não apagar `docs/`, `public/images/`, `organizacao imagens/`, `PROMPT.md`, `CLAUDE.md`.
