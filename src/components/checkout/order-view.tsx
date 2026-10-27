"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Stitch } from "@/components/brand/textures";
import { Icon } from "@/components/icons/icon";
import { ProductImage } from "@/components/shop/product-image";
import { microcopy } from "@/data/copy";
import { getProduct } from "@/data/products";
import { formatBRL, formatDate } from "@/lib/format";
import { useHydrated } from "@/lib/hooks";
import { useOrders } from "@/lib/store/orders";

const number = new Intl.NumberFormat("pt-BR");

export function OrderView() {
  const id = useSearchParams().get("id") ?? "";
  const hydrated = useHydrated();
  const order = useOrders((s) => s.orders.find((o) => o.id === id));

  if (!hydrated) return <div className="min-h-[60vh]" aria-busy="true" />;
  if (!order) {
    return (
      <div className="min-h-[50vh] py-10">
        <p className="label text-cobre">Pedido {id}</p>
        <h1 className="serif mt-4 text-h2 text-casca">Não encontramos este pedido neste navegador.</h1>
        <p className="mt-4 max-w-md text-indigo/70">Os pedidos ficam guardados no aparelho em que foram feitos.</p>
        <Link href="/conta" className="label link-stitch mt-8 inline-block">
          Ir para Minha Remanesce
        </Link>
      </div>
    );
  }

  // Primeira araucária de cada item, na ordem do pedido.
  const firstTree = order.items.reduce<number[]>((acc, item, i) => {
    acc.push(i === 0 ? order.trees[0] : acc[i - 1] + order.items[i - 1].qty);
    return acc;
  }, []);

  return (
    <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
      <div>
        <SeedToSprout />
        <p className="label mt-10 text-cobre">Pedido {order.id}</p>
        <h1 className="serif mt-4 text-h1 text-casca">
          Pedido recebido. <em>Uma araucária já tem seu nome.</em>
        </h1>
        <p className="mt-6 max-w-lg text-body text-indigo/80">
          Obrigado, {order.customer.name.split(" ")[0]}. A confirmação vai para {order.customer.email}. Previsão de entrega:{" "}
          <strong className="font-medium">{formatDate(order.deliveryBy, { weekday: "long", day: "numeric", month: "long" })}</strong>.
        </p>
        <div className="mt-10 bg-araucaria p-6 text-linho md:p-8">
          <p className="label text-linho/70">Minhas araucárias</p>
          <p className="serif mt-3 text-h3">
            {order.trees.length === 1 ? "Araucária nº " : "Araucárias nº "}
            {order.trees.map((n) => number.format(n)).join(", ")}
          </p>
          <p className="mt-3 text-small text-linho/75">
            Cada peça planta uma muda no Paraná. O número fica registrado no Passaporte de cada peça.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/conta" className="label-lg flex h-13 items-center gap-3 bg-indigo px-8 text-linho hover:bg-denim">
            Minha Remanesce <Icon name="seta" size={22} />
          </Link>
          <Link href="/loja" className="label-lg flex h-13 items-center border border-indigo/25 px-8 hover:border-indigo">
            Continuar explorando
          </Link>
        </div>
      </div>

      <aside className="bg-linho-escuro/60 p-6 md:p-8 lg:self-start">
        <h2 className="label-lg">Resumo</h2>
        <ul className="mt-5 space-y-5">
          {order.items.map((item, i) => {
            const product = getProduct(item.slug);
            return (
              <li key={`${item.slug}:${item.size}`} className="flex gap-4">
                <div className="relative h-20 w-15 shrink-0 overflow-hidden bg-linho">
                  {product && <ProductImage image={product.images.details[0]} alt="" sizes="60px" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="serif text-[1.1rem] leading-tight">{item.name}</p>
                  <p className="label mt-1 text-indigo/55">
                    Tam. {item.size} · {item.qty}× {formatBRL(item.price)}
                  </p>
                  <Link
                    href={`/passaporte/${item.code}?arvore=${firstTree[i]}`}
                    className="label link-stitch mt-2 inline-flex items-center gap-1.5"
                  >
                    <Icon name="qr" size={14} /> Passaporte da Peça
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="my-5">
          <Stitch />
        </div>
        <dl className="space-y-2 text-small">
          <Line label="Subtotal" value={formatBRL(order.subtotal)} />
          {order.discount > 0 && <Line label={`Cupom ${order.coupon}`} value={`− ${formatBRL(order.discount)}`} />}
          <Line label={`Frete · ${order.shipping.label}`} value={order.shipping.price ? formatBRL(order.shipping.price) : "Grátis"} />
          <Line label="Total" value={formatBRL(order.total)} strong />
          <Line
            label="Pagamento"
            value={
              order.payment.method === "pix"
                ? "Pix"
                : `${order.payment.brand ?? "Cartão"} final ${order.payment.last4} · ${order.payment.installments}×`
            }
          />
        </dl>
        <div className="my-5">
          <Stitch />
        </div>
        <p className="text-small text-indigo/75">
          {order.address.street}, {order.address.number}
          {order.address.complement ? ` · ${order.address.complement}` : ""} · {order.address.district}
          <br />
          {order.address.city} · {order.address.state} · {order.address.cep}
        </p>
        <p className="label mt-6 text-indigo/50">{microcopy.demo}</p>
      </aside>
    </div>
  );
}

function Line({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex justify-between gap-4 ${strong ? "pt-1 font-medium" : ""}`}>
      <dt className="text-indigo/75">{label}</dt>
      <dd className="font-mono text-[13px]">{value}</dd>
    </div>
  );
}

/** O pinhão cai na terra e vira broto. Com movimento reduzido, aparece só o broto. */
function SeedToSprout() {
  return (
    <svg viewBox="0 0 120 120" className="h-28 w-28" aria-hidden>
      <path d="M20 100h80" stroke="var(--cobre)" strokeWidth="1.2" strokeDasharray="5 4" />
      <path
        className="seed-fall motion-reduce:hidden"
        d="M60 74c4 4.3 6 9.5 5.7 15.5-.3 5.5-2.5 9.8-5.7 11.9-3.2-2.1-5.4-6.4-5.7-11.9C54 83.5 56 78.3 60 74z"
        fill="var(--pinhao)"
      />
      <g stroke="var(--araucaria)" strokeWidth="1.6" strokeLinecap="round">
        <path className="sprout-stem" pathLength={1} d="M60 100V62" fill="none" />
        <path
          className="sprout-leaf"
          style={{ transformOrigin: "100% 100%", animationDelay: "1.9s" }}
          d="M60 72c-9 .3-14.8-5.4-15-14.4 8.7-.2 14.8 5.6 15 14.4z"
          fill="var(--araucaria)"
          fillOpacity=".15"
        />
        <path
          className="sprout-leaf"
          style={{ transformOrigin: "0% 100%", animationDelay: "2.1s" }}
          d="M60 66c.2-8.7 6.2-14.6 15-14.6-.2 8.7-6.1 14.4-15 14.6z"
          fill="var(--araucaria)"
          fillOpacity=".15"
        />
      </g>
    </svg>
  );
}
