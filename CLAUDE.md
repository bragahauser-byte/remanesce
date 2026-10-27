# CLAUDE.md — Remanesce

Contexto permanente para o Claude Code neste repositório. A especificação completa está em `PROMPT.md`.

## Projeto
Site institucional + e-commerce funcional da marca de denim autoral **Remanesce**, coleção
**"O Renascer da Permanência"** (tema: pinha da araucária). Projeto acadêmico.

## Fontes de verdade
- `PROMPT.md`: especificação completa (páginas, design system, catálogo, fases).
- `docs/conceito.md`: texto do conceito da equipe. Não alterar o sentido.
- `docs/briefing.md`: briefing da cliente e entregáveis (itens 8–12 e 14).
- `public/images/`: line-up original e recortes por look.

## Regras rápidas
- Conteúdo visível em pt-BR; código em inglês.
- Cores: linho `#F1EDE4`, índigo `#161B27`, denim `#2B3445`, casca `#391502`,
  vermelho pinhão `#650410`, cobre `#B9763E`, azul gralha `#2F5D9E` (só na lenda),
  verde araucária `#34402E` (só em Raiz).
- Fontes: Bodoni Moda (títulos) · IBM Plex Mono (subtítulos/rótulos, caixa alta) · Instrument Sans (texto).
- O vermelho aparece **por baixo/por dentro** (revelações, forros, fendas), quase nunca como superfície.
- Respeitar `prefers-reduced-motion` em toda animação.
- Preços e textos editáveis em `src/data/`.
- Rodar `npm run build` e `npm run lint` antes de cada commit; olhar as páginas em 1440/768/390px.
- Nunca salvar dados de cartão. Pagamento é simulado (Stripe só em modo teste, opcional).
- Não apagar `docs/`, `public/images/`, `PROMPT.md`, `CLAUDE.md`.
