/** PRNG determinístico (mulberry32): mesma semente, mesma sequência no servidor e no cliente. */
export function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Embaralha sem mutar, de forma estável para a semente dada. */
export function shuffle<T>(list: readonly T[], seed: number): T[] {
  const rand = seeded(seed);
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Semente que muda uma vez por dia (fuso de Brasília). */
export function daySeed(date = new Date()) {
  const key = date.toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });
  return Number(key.replaceAll("-", ""));
}
