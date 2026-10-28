// Recorta as 6 roupas do line-up (frente e verso) em public/images/roupas/roupa-N/.
//
//   npm run recortar
//
// Para cada roupa gera:
//   frente.jpg / verso.jpg        recorte com fundo linho (caixa da figura + 16px)
//   frente.png / verso.png        mesmo recorte com o fundo removido (transparente)
//   frente.webp / verso.webp      versão otimizada com transparência, largura nativa
//   frente-160.webp / verso-160.webp  miniatura com 160px de largura
//
// Como funciona: o fundo do line-up é quase liso (#F1EDE4). As figuras são achadas pelo
// perfil de colunas com "tinta" (pixels longe da cor do fundo), abaixo do título do slide.
// O fundo é removido por preenchimento a partir das bordas: só some o linho ligado à borda,
// então partes claras dentro da figura (pele, reflexos) não viram buraco.

import { mkdirSync } from "node:fs";
import sharp from "sharp";

const SRC = { frente: "public/images/lineup/lineup-frente.jpg", verso: "public/images/lineup/lineup-costas.jpg" };
const OUT = "public/images/roupas";
const TITLE_BOTTOM = 130; // abaixo do "LINE-UP DA COLEÇÃO"
const MARGIN = 16;
const INK = 34; // distância de cor a partir da qual o pixel é figura
const FEATHER = [16, 46]; // transição da borda (distância de cor)

const dist = (d, i, bg) => Math.max(Math.abs(d[i] - bg[0]), Math.abs(d[i + 1] - bg[1]), Math.abs(d[i + 2] - bg[2]));

async function load(file) {
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  return { data, w: info.width, h: info.height };
}

function background({ data, w, h }) {
  // Média de amostras nas laterais, abaixo do título.
  const acc = [0, 0, 0];
  let n = 0;
  for (let y = TITLE_BOTTOM; y < h - 10; y += 20) {
    for (const x of [4, 10, w - 11, w - 5]) {
      const i = (y * w + x) * 3;
      acc[0] += data[i];
      acc[1] += data[i + 1];
      acc[2] += data[i + 2];
      n++;
    }
  }
  return acc.map((v) => v / n);
}

function figures(img, bg) {
  const { data, w, h } = img;
  const cols = new Array(w).fill(0);
  for (let y = TITLE_BOTTOM; y < h; y++) for (let x = 0; x < w; x++) if (dist(data, (y * w + x) * 3, bg) > INK) cols[x]++;
  // Faixas de colunas com figura, unindo vãos pequenos.
  const runs = [];
  let start = -1;
  for (let x = 0; x <= w; x++) {
    const on = x < w && cols[x] > 3;
    if (on && start < 0) start = x;
    if (!on && start >= 0) {
      const last = runs[runs.length - 1];
      if (last && start - last[1] < 14) last[1] = x;
      else runs.push([start, x]);
      start = -1;
    }
  }
  // Figuras quase encostadas (barra do vestido 2 e calça 3) viram uma faixa larga demais:
  // divide no vale de menor tinta no miolo da faixa.
  const widths = runs.map(([a, b]) => b - a).filter((n) => n > 80).sort((p, q) => p - q);
  const typical = widths[Math.floor(widths.length / 2)] ?? 260;
  for (let r = 0; r < runs.length; r++) {
    const [a, b] = runs[r];
    if (b - a < typical * 1.6) continue;
    let cut = a;
    let low = Infinity;
    for (let x = a + Math.round((b - a) * 0.3); x < a + Math.round((b - a) * 0.7); x++) {
      if (cols[x] < low) {
        low = cols[x];
        cut = x;
      }
    }
    runs.splice(r, 1, [a, cut], [cut + 1, b]);
    r++;
  }
  const six = runs
    .map(([a, b]) => ({ a, b, mass: cols.slice(a, b).reduce((s, v) => s + v, 0) }))
    .sort((p, q) => q.mass - p.mass)
    .slice(0, 6)
    .sort((p, q) => p.a - q.a);
  if (six.length !== 6) throw new Error(`esperava 6 figuras, achei ${six.length}`);
  return six.map(({ a, b }) => {
    let top = h;
    let bottom = 0;
    for (let y = TITLE_BOTTOM; y < h; y++) {
      for (let x = a; x < b; x++) {
        if (dist(data, (y * w + x) * 3, bg) > INK) {
          if (y < top) top = y;
          if (y > bottom) bottom = y;
          break;
        }
      }
    }
    const left = Math.max(0, a - MARGIN);
    const right = Math.min(w, b + MARGIN);
    const y0 = Math.max(TITLE_BOTTOM - 10, top - MARGIN);
    const y1 = Math.min(h, bottom + MARGIN);
    return { left, top: y0, width: right - left, height: y1 - y0 };
  });
}

function alphaMask(img, box, bg) {
  const { data, w } = img;
  const { left, top, width, height } = box;
  const alpha = new Uint8Array(width * height).fill(255);
  const seen = new Uint8Array(width * height);
  const stack = [];
  const push = (x, y) => {
    const k = y * width + x;
    if (seen[k]) return;
    seen[k] = 1;
    const d = dist(data, ((top + y) * w + (left + x)) * 3, bg);
    if (d > FEATHER[1]) return; // chegou na figura
    const t = Math.max(0, Math.min(1, (d - FEATHER[0]) / (FEATHER[1] - FEATHER[0])));
    alpha[k] = Math.round(255 * t * t * (3 - 2 * t));
    stack.push(k);
  };
  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }
  const flood = () => {
    while (stack.length) {
      const k = stack.pop();
      const x = k % width;
      const y = (k - x) / width;
      if (x > 0) push(x - 1, y);
      if (x < width - 1) push(x + 1, y);
      if (y > 0) push(x, y - 1);
      if (y < height - 1) push(x, y + 1);
    }
  };
  flood();
  // Vãos fechados (entre as pernas, entre braço e corpo): manchas grandes de fundo puro
  // que não tocam a borda também somem. Manchas mínimas (brilho na pele) ficam.
  const near = (k) => dist(data, ((top + Math.floor(k / width)) * w + (left + (k % width))) * 3, bg) < 26;
  const visited = new Uint8Array(width * height);
  for (let k = 0; k < width * height; k++) {
    if (seen[k] || visited[k] || !near(k)) continue;
    const region = [k];
    visited[k] = 1;
    for (let i = 0; i < region.length; i++) {
      const q = region[i];
      const x = q % width;
      const y = (q - x) / width;
      for (const [nx, ny] of [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]) {
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        const n = ny * width + nx;
        if (!seen[n] && !visited[n] && near(n)) {
          visited[n] = 1;
          region.push(n);
        }
      }
    }
    if (region.length > 40) {
      for (const q of region) {
        stack.push(q);
        seen[q] = 1;
        alpha[q] = 0;
      }
      flood();
    }
  }
  return alpha;
}

/** Mantém só a maior mancha opaca (a figura); some com lascas das figuras vizinhas. */
function keepLargest(alpha, width, height) {
  const label = new Int32Array(alpha.length).fill(-1);
  const sizes = [];
  for (let start = 0; start < alpha.length; start++) {
    if (alpha[start] < 128 || label[start] >= 0) continue;
    const id = sizes.length;
    let size = 0;
    const stack = [start];
    label[start] = id;
    while (stack.length) {
      const k = stack.pop();
      size++;
      const x = k % width;
      const y = (k - x) / width;
      for (const [nx, ny] of [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]) {
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        const n = ny * width + nx;
        if (alpha[n] >= 128 && label[n] < 0) {
          label[n] = id;
          stack.push(n);
        }
      }
    }
    sizes.push(size);
  }
  const main = sizes.indexOf(Math.max(...sizes));
  const out = new Uint8Array(alpha);
  for (let k = 0; k < alpha.length; k++) {
    // Pixels opacos de outras manchas somem; a borda suave da figura principal fica.
    if (label[k] >= 0 && label[k] !== main) out[k] = 0;
  }
  return out;
}

/** Encolhe a máscara 1px (mínimo 3×3) para tirar o contorno claro que sobra na borda. */
function erode(alpha, width, height) {
  const out = new Uint8Array(alpha.length);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let min = 255;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const xx = Math.min(width - 1, Math.max(0, x + dx));
          const yy = Math.min(height - 1, Math.max(0, y + dy));
          min = Math.min(min, alpha[yy * width + xx]);
        }
      }
      out[y * width + x] = min;
    }
  }
  return out;
}

/** Suaviza a borda do alfa com uma média 3×3 (sem abrir buracos dentro da figura). */
function soften(alpha, width, height) {
  const out = new Uint8Array(alpha.length);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let sum = 0;
      let n = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const xx = x + dx;
          const yy = y + dy;
          if (xx < 0 || yy < 0 || xx >= width || yy >= height) continue;
          sum += alpha[yy * width + xx];
          n++;
        }
      }
      out[y * width + x] = Math.round(sum / n);
    }
  }
  return out;
}

for (const [side, file] of Object.entries(SRC)) {
  const img = await load(file);
  const bg = background(img);
  const boxes = figures(img, bg);
  for (const [i, box] of boxes.entries()) {
    const dir = `${OUT}/roupa-${i + 1}`;
    mkdirSync(dir, { recursive: true });
    const crop = sharp(file).extract(box);
    await crop.clone().jpeg({ quality: 92, mozjpeg: true }).toFile(`${dir}/${side}.jpg`);

    const { data: rgb, info } = await crop.clone().removeAlpha().raw().toBuffer({ resolveWithObject: true });
    const mask = soften(erode(keepLargest(alphaMask(img, box, bg), box.width, box.height), box.width, box.height), box.width, box.height);
    const px = new Uint8Array(info.width * info.height * 4);
    for (let p = 0; p < info.width * info.height; p++) {
      // Tira o linho misturado nas bordas semitransparentes (evita halo claro).
      const a = mask[p] / 255;
      for (let c = 0; c < 3; c++) {
        const v = rgb[p * info.channels + c];
        px[p * 4 + c] = a > 0.02 && a < 1 ? Math.max(0, Math.min(255, Math.round((v - bg[c] * (1 - a)) / a))) : v;
      }
      px[p * 4 + 3] = mask[p];
    }
    const rgba = sharp(Buffer.from(px), { raw: { width: info.width, height: info.height, channels: 4 } });
    await rgba.clone().png({ compressionLevel: 9 }).toFile(`${dir}/${side}.png`);
    await rgba.clone().webp({ quality: 86, alphaQuality: 90 }).toFile(`${dir}/${side}.webp`);
    await rgba.clone().resize({ width: 160 }).webp({ quality: 82 }).toFile(`${dir}/${side}-160.webp`);
    console.log(`roupa-${i + 1}/${side}: ${box.width}×${box.height} (x ${box.left}, y ${box.top})`);
  }
}
