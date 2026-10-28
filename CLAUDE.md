# CLAUDE.md — Remanesce

Contexto permanente para o Claude Code. A especificação completa está em `PROMPT.md` (v2).

## Projeto
Site + e-commerce funcional da marca de denim autoral **Remanesce**, coleção
**"O Renascer da Permanência"** (tema: pinha da araucária). Projeto acadêmico.

## Direção de arte (v2)
- Coleção, loader, Índice e páginas de look: estilo **a24.raviklaassens.com** (carrossel 3D
  diagonal guiado pelo scroll, ficha técnica no canto, linhas que se desenham).
- Início, Conceito e Raiz: estilo **gracefashion.ai** (hero de ponta a ponta, moldura sticky,
  glifo gigante, grade de pontos, blur → foco, FAQ com "+").
- Loja, cards, PDP, sacola, checkout: padrão **FARM Rio** (pasta `organizacao imagens/`).
- Cores FARM: preto quente `#181508`, tinta `#111111`, branco `#FFFFFF`, papel `#F4F2EE`,
  linho `#F1EDE4`, cinza `#8C8A85`, linha `#D9D6D0`. Acentos raros: vermelho pinhão
  `#650410`, índigo `#161B27`, cobre `#B9763E`.
- Fontes: Bodoni Moda (títulos) · Instrument Serif Italic (subtítulos) · Instrument Sans (texto/UI).

## Fontes de verdade
`PROMPT.md` · `docs/conceito.md` · `docs/briefing.md` · `organizacao imagens/` · `public/images/`

## Regras rápidas
- Conteúdo em pt-BR; código em inglês. Preços e textos em `src/data/`.
- O vermelho aparece por baixo/por dentro, nunca como fundo de seção.
- `prefers-reduced-motion` em toda animação; 3D com fallback.
- `npm run build` e `npm run lint` antes de cada commit; olhar em 1440/768/390px.
- Nunca salvar dados de cartão. Pagamento simulado (Stripe só em modo teste, opcional).
- Não apagar `docs/`, `public/images/`, `organizacao imagens/`, `PROMPT.md`, `CLAUDE.md`.
