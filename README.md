# Remanesce

**O que permanece, renasce.**

Site e e-commerce da Remanesce, marca de denim autoral, e da coleção **O Renascer da Permanência**,
inspirada na pinha da araucária. Projeto acadêmico.

Site no ar: https://bragahauser-byte.github.io/remanesce/

## Como rodar

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # build normal (Vercel / next start)
npm run build:pages  # export estático para o GitHub Pages (basePath /remanesce)
npm run lint
```

Cada push na `main` publica o site no GitHub Pages pelo workflow `.github/workflows/pages.yml`.

## Onde editar

| O quê | Onde |
|---|---|
| Produtos, preços, estoques, histórias | `src/data/products.ts` |
| Looks e frases | `src/data/looks.ts` |
| Textos do site, serviços, equipe, cores do manual | `src/data/copy.ts` |
| Cores e tipografia (tokens) | `src/styles/tokens.css` |
| Imagens | `public/images/` |

## Roupas recortadas (frente e verso)

As 6 roupas do line-up ficam em `public/images/roupas/roupa-1` … `roupa-6`, cada uma com:

| Arquivo | O que é |
|---|---|
| `frente.jpg` / `verso.jpg` | recorte com o fundo linho (caixa da figura + 16px) |
| `frente.png` / `verso.png` | mesmo recorte com fundo transparente (usado no carrossel 3D) |
| `frente.webp` / `verso.webp` | versão otimizada com transparência, largura nativa |
| `frente-160.webp` / `verso-160.webp` | miniatura com 160px de largura |

Para refazer tudo a partir de `public/images/lineup/` (por exemplo, se o line-up for trocado por
uma versão em resolução maior com os mesmos seis looks lado a lado):

```bash
npm run recortar
```

O script `scripts/recortar-roupas.mjs` (com `sharp`) acha cada figura pelo perfil de colunas,
separa figuras quase encostadas pelo vale de menor tinta e remove o fundo por preenchimento a
partir das bordas, mais os vãos internos (entre pernas e braços), com a borda descontaminada do
linho para não deixar halo.

## Estrutura

```
PROMPT.md             especificação (v2)
CLAUDE.md             contexto permanente
docs/                 briefing e conceito da equipe
public/images/        line-up, roupas recortadas, ilustrações
scripts/              recorte das roupas e build do Pages
src/app/              páginas
src/components/       layout, loja, checkout, narrativa, marca, ícones
src/data/             catálogo e textos
src/lib/              sacola, pedidos, checkout, utilidades
```

As referências visuais da FARM Rio usadas na direção de arte (`organizacao imagens/`) ficam só
na máquina da equipe e não entram no repositório.

## Créditos

Conceito e line-up: equipe Remanesce. Projeto acadêmico: marca, preços, parcerias e números são
exemplos.
