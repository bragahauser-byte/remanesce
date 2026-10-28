# CLAUDE.md — Remanesce

Contexto permanente para o Claude Code. A especificação completa está em `PROMPT.md` (v2; a direção de arte atual é a v3, abaixo).

## Projeto
Site + e-commerce funcional da marca de denim autoral **Remanesce**, coleção
**"O Renascer da Permanência"** (tema: pinha da araucária). Projeto acadêmico.

## Direção de arte (v3, 28/10/2026)
- Estudo de interação a partir de **brandonyasin.com**, adaptado para moda (a v2, com A24,
  gracefashion e FARM, foi substituída).
- Só três páginas principais: **Início** (galeria horizontal de looks), **Conceito** e **Raiz**.
  Cada look abre em `/looks/[slug]` (hero dividido, peças alternando imagem/texto, próximo look).
  Sacola, checkout, pedido, passaporte e marca continuam como páginas utilitárias, fora do menu.
- Menu = páginas em cartões: a página atual encolhe até virar cartão (`components/layout/menu.tsx`).
- Card → look: a imagem voa até a foto da página (`lib/store/flight.ts` + `flight-layer.tsx`).
- Tipografia: **Plus Jakarta Sans** em tudo; tamanhos em múltiplos de 4/8
  (12 · 16 · 24 · 32 · 40 · 48 · 64 · 96 · 120), variando peso (300–700) e cor (fg, soft, muted).
- Temas: **claro** (branco, padrão) e **terra** (#2C2922, neutros quentes da noite da referência),
  trocados pelo seletor redondo do canto superior direito e salvos em `localStorage`.
- Grade de 6/14 colunas com gap de 8 px e margem de 8/16 px (utility `grid-site`).
- Imagens das peças e do site: só as da equipe (`public/images/`). `referencias/` são prints da
  referência, ficam fora do repositório.

## Fontes de verdade
`PROMPT.md` · `docs/conceito.md` · `docs/briefing.md` · `organizacao imagens/` · `public/images/`

## Regras rápidas
- Conteúdo em pt-BR; código em inglês. Preços e textos em `src/data/`.
- O vermelho aparece por baixo/por dentro, nunca como fundo de seção.
- `prefers-reduced-motion` em toda animação; 3D com fallback.
- `npm run build` e `npm run lint` antes de cada commit; olhar em 360/390/768/1280/1440/1920px.
- Nunca salvar dados de cartão. Pagamento simulado (Stripe só em modo teste, opcional).
- Não apagar `docs/`, `public/images/`, `organizacao imagens/`, `PROMPT.md`, `CLAUDE.md`.
