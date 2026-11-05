// Imagens da atualização de novembro (pasta local "updates novembro/", fora do git):
// fotos do Sobre nós, quadros dos futuros vídeos de cada look e a gralha voando.
// Uso: node scripts/preparar-novembro.mjs
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import path from "node:path";

const SRC = "updates novembro";
const OUT = "public/images";

async function webp(input, output, width, quality = 82) {
  await sharp(input).rotate().resize({ width, withoutEnlargement: true }).webp({ quality, effort: 6 }).toFile(output);
}

// Sobre nós: nove quadros editoriais (retratos, um horizontal e a embalagem).
mkdirSync(`${OUT}/sobre`, { recursive: true });
for (let i = 1; i <= 9; i++) {
  const input = path.join(SRC, "fotos tela sobre nos", `Frame ${i}.jpg`);
  for (const w of [800, 1600]) await webp(input, `${OUT}/sobre/frame-${i}-${w}.webp`, w);
}

// Quadro de cada look até os vídeos chegarem (1600 e 2400 px, tela cheia).
const films = ["bractea", "semente", "curiacu", "raiz", "guacira", "gralha"];
for (const [i, look] of films.entries()) {
  const input = path.join(SRC, "futuros videos tela de produto", `${i + 1}.jpg`);
  for (const w of [1600, 2400]) await webp(input, `${OUT}/pecas/${look}/filme-${w}.webp`, w, 80);
}

// Gralha voando: traço preto com fundo transparente (a luminância vira a máscara).
const bird = path.join(SRC, "Bird Flying.jpg");
const { data, info } = await sharp(bird).resize(480).greyscale().raw().toBuffer({ resolveWithObject: true });
const rgba = Buffer.alloc(info.width * info.height * 4);
for (let p = 0; p < info.width * info.height; p++) {
  const a = Math.max(0, Math.min(255, Math.round((235 - data[p]) * (255 / 200))));
  rgba[p * 4 + 3] = a; // preto (0,0,0) com alfa
}
await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
  .trim()
  .webp({ quality: 90, alphaQuality: 100 })
  .toFile(`${OUT}/marca/bird-flying.webp`);

console.log("ok");
