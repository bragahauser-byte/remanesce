const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

/** Centavos → "R$ 1.290,00". */
export const formatBRL = (cents: number) => brl.format(cents / 100);

const brlShort = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

/** Preço de vitrine (FARM): "R$ 1.290" quando não há centavos. */
export const formatPrice = (cents: number) => (cents % 100 === 0 ? brlShort.format(cents / 100) : formatBRL(cents));

export const MAX_INSTALLMENTS = 10;
/** Parcela mínima de R$ 20,00. */
const MIN_INSTALLMENT = 2000;

export function installments(cents: number, max = MAX_INSTALLMENTS) {
  const n = Math.max(1, Math.min(max, Math.floor(cents / MIN_INSTALLMENT)));
  return { n, value: Math.ceil(cents / n) };
}

export function installmentsLabel(cents: number) {
  const { n, value } = installments(cents);
  return n > 1 ? `ou ${n}x ${formatBRL(value)}` : "à vista";
}

/** Remove acentos e caixa para busca. */
export const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

export const formatDate = (iso: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }) =>
  new Date(iso.length === 10 ? `${iso}T12:00:00` : iso).toLocaleDateString("pt-BR", opts);
