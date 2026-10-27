import { getProduct, type Product } from "@/data/products";
import type { CartLine } from "./store/cart";

/* ------------------------------------------------------------- cupons */

export type Coupon = { code: string; label: string; percent?: number; freeShipping?: boolean };

export const coupons: Coupon[] = [
  { code: "PERMANENCIA10", label: "10% de desconto", percent: 10 },
  { code: "RENASCER", label: "Frete grátis", freeShipping: true },
];

export const findCoupon = (code: string | null | undefined) =>
  code ? coupons.find((c) => c.code === code.trim().toUpperCase()) : undefined;

/* -------------------------------------------------------------- frete */

export const FREE_SHIPPING_FROM = 150000;

export type ShippingOption = { id: "padrao" | "expressa"; label: string; days: string; maxDays: number; price: number };

const regions: Record<string, { name: string; padrao: [number, number, number]; expressa: [number, number, number] }> = {
  // [preço em centavos, prazo mínimo, prazo máximo] em dias úteis
  sul: { name: "Sul", padrao: [1990, 3, 5], expressa: [3990, 1, 2] },
  sudeste: { name: "Sudeste", padrao: [2490, 4, 6], expressa: [4490, 2, 3] },
  centro: { name: "Centro-Oeste", padrao: [3490, 6, 9], expressa: [5990, 3, 4] },
  nordeste: { name: "Nordeste", padrao: [3990, 7, 11], expressa: [6990, 3, 5] },
  norte: { name: "Norte", padrao: [4490, 9, 14], expressa: [7990, 4, 6] },
};

const ufRegion: Record<string, keyof typeof regions> = {
  PR: "sul", SC: "sul", RS: "sul",
  SP: "sudeste", RJ: "sudeste", MG: "sudeste", ES: "sudeste",
  DF: "centro", GO: "centro", MT: "centro", MS: "centro",
  BA: "nordeste", SE: "nordeste", AL: "nordeste", PE: "nordeste", PB: "nordeste", RN: "nordeste", CE: "nordeste", PI: "nordeste", MA: "nordeste",
  PA: "norte", AM: "norte", AC: "norte", RO: "norte", RR: "norte", AP: "norte", TO: "norte",
};

export function shippingOptions(uf: string, subtotal: number, freeByCoupon = false): ShippingOption[] {
  const region = regions[ufRegion[uf.toUpperCase()] ?? "sudeste"];
  const free = freeByCoupon || subtotal >= FREE_SHIPPING_FROM;
  const make = (id: ShippingOption["id"], label: string, [price, min, max]: [number, number, number]): ShippingOption => ({
    id,
    label,
    days: `${min} a ${max} dias úteis`,
    maxDays: max,
    price: id === "padrao" && free ? 0 : price,
  });
  return [make("padrao", "Padrão", region.padrao), make("expressa", "Expressa", region.expressa)];
}

export function addBusinessDays(from: Date, days: number) {
  const d = new Date(from);
  let left = days;
  while (left > 0) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) left--;
  }
  return d;
}

/* ---------------------------------------------------------------- CEP */

export type Address = { cep: string; street: string; district: string; city: string; state: string };

export const onlyDigits = (s: string) => s.replace(/\D/g, "");
export const maskCep = (s: string) => onlyDigits(s).slice(0, 8).replace(/^(\d{5})(\d)/, "$1-$2");

/** Busca no ViaCEP. Retorna null se o CEP não existir. */
export async function lookupCep(cep: string): Promise<Address | null> {
  const digits = onlyDigits(cep);
  if (digits.length !== 8) return null;
  const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
  if (!res.ok) throw new Error("viacep");
  const data = (await res.json()) as { erro?: boolean | string; logradouro: string; bairro: string; localidade: string; uf: string };
  if (data.erro) return null;
  return { cep: maskCep(digits), street: data.logradouro, district: data.bairro, city: data.localidade, state: data.uf };
}

/* -------------------------------------------------------------- totais */

export type DetailedLine = CartLine & { product: Product; total: number };

export function detailLines(lines: CartLine[]): DetailedLine[] {
  return lines.flatMap((l) => {
    const product = getProduct(l.slug);
    return product ? [{ ...l, product, total: product.price * l.qty }] : [];
  });
}

export function totals(lines: CartLine[], couponCode?: string | null, shipping?: number | null) {
  const detailed = detailLines(lines);
  const subtotal = detailed.reduce((n, l) => n + l.total, 0);
  const coupon = findCoupon(couponCode);
  const discount = coupon?.percent ? Math.round((subtotal * coupon.percent) / 100) : 0;
  const ship = shipping ?? 0;
  const pieces = detailed.reduce((n, l) => n + l.qty, 0);
  return { detailed, subtotal, discount, shipping: ship, total: subtotal - discount + ship, coupon, pieces };
}

/* ------------------------------------------------------- documentos */

export function maskCpf(s: string) {
  return onlyDigits(s)
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

/** Valida os dígitos verificadores do CPF. */
export function isValidCpf(value: string) {
  const cpf = onlyDigits(value);
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  const digit = (len: number) => {
    let sum = 0;
    for (let i = 0; i < len; i++) sum += Number(cpf[i]) * (len + 1 - i);
    const rest = (sum * 10) % 11;
    return rest === 10 ? 0 : rest;
  };
  return digit(9) === Number(cpf[9]) && digit(10) === Number(cpf[10]);
}

export function maskPhone(s: string) {
  const d = onlyDigits(s).slice(0, 11);
  if (d.length <= 10) return d.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d{1,4})$/, "$1-$2");
  return d.replace(/^(\d{2})(\d{5})(\d{1,4})$/, "($1) $2-$3");
}

/* ------------------------------------------------------------- cartão */

export const DECLINED_TEST_CARD = "4000000000000002";

export function maskCard(s: string) {
  return onlyDigits(s)
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");
}

export function maskExpiry(s: string) {
  return onlyDigits(s)
    .slice(0, 4)
    .replace(/^(\d{2})(\d)/, "$1/$2");
}

export function cardBrand(number: string) {
  const n = onlyDigits(number);
  if (/^4/.test(n)) return "Visa";
  if (/^(5[1-5]|2[2-7])/.test(n)) return "Mastercard";
  if (/^3[47]/.test(n)) return "Amex";
  if (/^(4011|4312|4389|4514|4576|5041|5066|5067|509|6277|6362|6363|650|6516|6550)/.test(n)) return "Elo";
  if (/^(606282|3841)/.test(n)) return "Hipercard";
  return null;
}

/** Algoritmo de Luhn. */
export function luhn(number: string) {
  const n = onlyDigits(number);
  if (n.length < 13) return false;
  let sum = 0;
  for (let i = 0; i < n.length; i++) {
    let d = Number(n[n.length - 1 - i]);
    if (i % 2 === 1) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  return sum % 10 === 0;
}

export function validExpiry(value: string, now = new Date()) {
  const [mm, yy] = value.split("/").map(Number);
  if (!mm || !yy || mm < 1 || mm > 12) return false;
  const end = new Date(2000 + yy, mm, 0, 23, 59, 59);
  return end >= now;
}

/* -------------------------------------------------------------- pedido */

export function newOrderId() {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `RMN-${new Date().getFullYear()}-${n}`;
}

/** Payload Pix de exemplo (BR Code estático, sem valor real de cobrança). */
export function pixPayload(orderId: string, amount: number) {
  const field = (id: string, value: string) => `${id}${String(value.length).padStart(2, "0")}${value}`;
  const account = field("00", "br.gov.bcb.pix") + field("01", "demo@remanesce.com.br");
  const body =
    field("00", "01") +
    field("26", account) +
    field("52", "0000") +
    field("53", "986") +
    field("54", (amount / 100).toFixed(2)) +
    field("58", "BR") +
    field("59", "REMANESCE DEMO") +
    field("60", "CURITIBA") +
    field("62", field("05", orderId.replaceAll("-", ""))) +
    "6304";
  return body + crc16(body);
}

function crc16(payload: string) {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
  }
  return (crc & 0xffff).toString(16).toUpperCase().padStart(4, "0");
}
