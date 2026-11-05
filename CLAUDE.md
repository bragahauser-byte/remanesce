# CLAUDE.md — Remanesce

Contexto permanente para o Claude Code. A especificação completa está em `PROMPT.md` (v2; a direção de arte atual é a v4, abaixo).

## Projeto
Site + e-commerce funcional da marca de denim autoral **Remanesce**, coleção
**"O Renascer da Permanência"** (tema: pinha da araucária). Projeto acadêmico.

## Direção de arte (v4, novembro de 2026)
- Telas de referência da equipe em `updates novembro/` (pasta local, fora do git): HOME, HOME - HOVER
  MOUSE, MENU, PRODUTO e PRODUTO SCROLL 1–5, SACOLA, CONTATO. Prancha de 1728 × 1117. Interação
  estudada no **brandonyasin.com** (menu, câmera, rolagem horizontal).
- Três páginas no menu: **Início** (galeria horizontal), **Sobre nós** (`/sobre`, edição de revista) e
  **Contato** (`/contato`). Raiz (`/raiz`), sacola, checkout, pedido, passaporte e marca ficam fora do
  menu (o rodapé leva a Raiz e à marca). Cada look abre em `/looks/[slug]`.
- Grade: 14 colunas no desktop com margem e gap de 24 px (`--pad`, `--gap` em `styles/tokens.css`);
  6 colunas no celular (16/12). `--card-w`/`--card-h` = card da vitrine (596 × 719 na prancha), usado no
  início, no menu (pôsteres) e no contato.
- Tipografia: **PP Pangaia** (títulos, nomes das peças, pôsteres do menu, colunas do rodapé) e
  **Instrument Sans** no resto (substituiu a Plus Jakarta Sans). Navegação do topo em `nav-text`
  (24 px na prancha, caixa alta); textos grandes de interface em `ui-lg` (28,8 px na prancha).
- Header (`components/layout/header.tsx`): logotipo grande (`--logo-h`, 317 px na prancha) e SACOLA /
  MENU à direita. Nos looks e na sacola aparece FECHAR (volta à página anterior).
- Menu (`components/layout/menu.tsx`), como no brandonyasin: cada cartão é a tela inteira em escala
  UNIFORME com clip-path no canto de cima à esquerda (nada estica). A página atual é sempre o primeiro
  cartão; ao abrir, o `#stage` real encolhe pela mesma conta e se dissolve no pôster. Escolher ou fechar
  = movimento de câmera (a fileira inteira se aproxima até o cartão ocupar a tela). Curva expo.inOut.
  Fileira rola com roda/arraste/toque. Os contêineres usam `overflow: clip` (o foco não pode rolá-los).
- Início: cards rentes ao pé; nome e "a partir de" sobem no hover (sempre visíveis no toque); parallax
  dentro das fotos. Card → look: a imagem voa até a foto da página (`lib/store/flight.ts`).
- Look: título preso à esquerda, foto nas colunas 8–14 (frente/costas), texto longo (`manifesto` em
  `data/looks.ts`) que acende palavra por palavra, peças alternando em telas inteiras, filme em tela
  cheia (`film.poster`; quando houver vídeo, preencher `film.video` com o .mp4) e rodapé branco.
- Movimento por rolagem: `components/motion/scroll-motion.tsx` (atributos `data-reveal`,
  `data-parallax`, `data-zoom`, `data-words`), sempre com `prefers-reduced-motion`.
- Sacola (`surface-azul`, #263054): "Sua seleção", peça sobre branco nas colunas 1–3, Editar/Remover,
  quadro QTD, gralha pousada no último fio, total e COMPRAR no eixo do texto.
- Imagens novas: `npm run imagens:novembro` (`scripts/preparar-novembro.mjs`) gera
  `public/images/sobre/frame-1…9`, `pecas/<look>/filme-1600|2400` e `marca/bird-flying.webp`.
  Quadros dos filmes: 1 Bráctea, 2 Semente, 3 Curiaçu, 4 Raiz, 5 Guacira, 6 Gralha.
- Ordem da vitrine em `data/collection.ts` (`showcase`): Raiz, Semente, Curiaçu, Guacira, Bráctea, Gralha.
- O vermelho aparece por baixo/por dentro, nunca como fundo de seção. Sem bege: fundos brancos ou azul.

## Fontes de verdade
`PROMPT.md` · `docs/conceito.md` · `docs/briefing.md` · `organizacao imagens/` · `public/images/`

## Regras rápidas
- Conteúdo em pt-BR; código em inglês. Preços e textos em `src/data/`.
- O vermelho aparece por baixo/por dentro, nunca como fundo de seção.
- `prefers-reduced-motion` em toda animação; 3D com fallback.
- `npm run build` e `npm run lint` antes de cada commit; olhar em 360/390/768/1280/1440/1920px.
- Nunca salvar dados de cartão. Pagamento simulado (Stripe só em modo teste, opcional).
- Não apagar `docs/`, `public/images/`, `organizacao imagens/`, `PROMPT.md`, `CLAUDE.md`.
