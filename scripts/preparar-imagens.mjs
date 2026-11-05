/*
 * Gera os arquivos do site a partir das pastas de origem da equipe (ficam só na máquina):
 *   modelos e roupas/<look>/*.jpg     → public/images/pecas/<look>/<nome>-{800,1600}.webp
 *   identidade visual/elementos graficos/Sugar apple.png → public/images/marca/sugar-apple.webp
 *   identidade visual/elementos graficos/Bird.svg        → public/images/marca/bird-linha.svg (traço branco)
 *   fotos dos looks                                       → public/images/og.jpg (1200×630)
 *   favcon/favcon.jpg                                     → src/app/icon.png (512) e apple-icon.png (180)
 * Uso: npm run imagens
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const src = (...p) => path.join(root, ...p);
const out = (...p) => path.join(root, "public", "images", ...p);

/* Pasta de origem → pasta publicada. */
const looks = {
  bractea: { from: "bráctea", files: ["frente", "atras", "topo", "inferior"] },
  semente: { from: "semente", files: ["frente", "atras", "peca"] },
  curiacu: { from: "curiaçu", files: ["frente", "atras", "topo", "inferior"] },
  guacira: { from: "guacira", files: ["frente", "atras", "topo", "inferior"] },
  raiz: { from: "raiz", files: ["frente", "atras", "topo", "inferior", ["Top Faixa", "faixa"]] },
  gralha: { from: "gralha", files: ["frente", "atras", "topo", "inferior"] },
};

for (const [slug, { from, files }] of Object.entries(looks)) {
  await mkdir(out("pecas", slug), { recursive: true });
  // Um item pode ser [arquivo de origem, nome publicado] (ex.: "Top Faixa.jpg" → faixa-*.webp).
  for (const entry of files) {
    const [file, name] = Array.isArray(entry) ? entry : [entry, entry];
    const input = src("modelos e roupas", from, `${file}.jpg`);
    for (const width of [800, 1600]) {
      await sharp(input).resize(width).webp({ quality: width > 800 ? 80 : 82 }).toFile(out("pecas", slug, `${name}-${width}.webp`));
    }
  }
  console.log("pecas", slug);
}

await mkdir(out("marca"), { recursive: true });

// Sugar apple: recorta o branco em volta da ilustração (o arquivo é opaco).
await sharp(src("identidade visual", "elementos graficos", "Sugar apple.png"))
  .trim({ background: "#ffffff", threshold: 12 })
  .resize(320)
  .webp({ quality: 90 })
  .toFile(out("marca", "sugar-apple.webp"));

// Pássaro, enquadrado só no desenho (medido: x 22–586, y 61–538) para os pés tocarem a borda de baixo.
const bird = (await readFile(src("identidade visual", "elementos graficos", "Bird.svg"), "utf8")).replace(
  'width="610" height="610" viewBox="0 0 610 610"',
  'width="568" height="480" viewBox="20 59 568 480"',
);
// Original (traço preto) para fundos claros.
await writeFile(out("marca", "bird.svg"), bird);
// Sacola: o traço preto vira branco e os preenchimentos claros viram o azul (#263054).
await writeFile(
  out("marca", "bird-linha.svg"),
  bird.replace(/fill="(white|#E2E3E4)"/g, 'fill="#263054"').replace(/fill="(black|#242122)"/g, 'fill="#FFFFFF"'),
);

// Imagem de compartilhamento: as fotos de frente lado a lado.
const strip = ["raiz", "semente", "curiacu", "guacira", "bractea", "gralha"];
const tiles = await Promise.all(
  strip.map((slug) =>
    sharp(out("pecas", slug, "frente-1600.webp")).resize(200, 630, { fit: "cover", position: "centre" }).toBuffer(),
  ),
);
await sharp({ create: { width: 1200, height: 630, channels: 3, background: "#f2f0ee" } })
  .composite(tiles.map((input, i) => ({ input, left: i * 200, top: 0 })))
  .jpeg({ quality: 82 })
  .toFile(out("og.jpg"));

// Favicon: o "R" da marca sobre branco (arquivo opaco, já quadrado).
const favicon = src("favcon", "favcon.jpg");
await sharp(favicon).resize(512, 512).png().toFile(path.join(root, "src", "app", "icon.png"));
await sharp(favicon).resize(180, 180).png().toFile(path.join(root, "src", "app", "apple-icon.png"));

console.log("ok");
