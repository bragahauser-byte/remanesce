"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/icons/icon";
import { OrderSummary } from "@/components/shop/order-summary";
import { microcopy, raiz } from "@/data/copy";
import { addBusinessDays, newOrderId, shippingOptions, totals } from "@/lib/checkout";
import type { Delivery, Identity } from "@/lib/checkout-schemas";
import { formatBRL } from "@/lib/format";
import { useHydrated } from "@/lib/hooks";
import { useAccount } from "@/lib/store/account";
import { useCart } from "@/lib/store/cart";
import { useOrders, type Order } from "@/lib/store/orders";
import { PaymentStep, type Payment } from "./payment-step";
import { CheckoutProgress } from "./progress";
import { DeliveryStep, IdentityStep } from "./steps";

export function CheckoutView() {
  const hydrated = useHydrated();
  if (!hydrated) return <div className="min-h-[60vh]" aria-busy="true" />;
  return <CheckoutFlow />;
}

function CheckoutFlow() {
  const router = useRouter();
  const lines = useCart((s) => s.lines);
  const coupon = useCart((s) => s.coupon);
  const clear = useCart((s) => s.clear);
  const user = useAccount((s) => s.user);
  const orders = useOrders((s) => s.orders);
  const place = useOrders((s) => s.place);

  const [orderId] = useState(newOrderId);
  const [step, setStep] = useState(1);
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [delivery, setDelivery] = useState<Delivery | null>(null);
  const [ship, setShip] = useState<{ state: string | null; id: Delivery["shipping"] | null }>({ state: null, id: null });
  const [placing, setPlacing] = useState(false);

  const base = totals(lines, coupon);
  const options = ship.state ? shippingOptions(ship.state, base.subtotal, !!base.coupon?.freeShipping) : [];
  const option = options.find((o) => o.id === ship.id) ?? null;
  const t = totals(lines, coupon, option?.price ?? null);

  if (placing) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center" role="status">
        <Icon name="broto" size={40} className="text-tinta" />
        <p className="serif mt-6 text-h3 text-tinta">{microcopy.orderConfirmed}</p>
      </div>
    );
  }

  if (t.detailed.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-start justify-center">
        <h1 className="serif text-h1 text-tinta">{microcopy.emptyBag}</h1>
        <Link href="/" className="label link-stitch mt-8">
          {microcopy.emptyBagCta}
        </Link>
      </div>
    );
  }

  function go(n: number) {
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function pay(payment: Payment) {
    if (!identity || !delivery || !option) return;
    const sold = orders.reduce((n, o) => n + o.items.reduce((m, i) => m + i.qty, 0), 0);
    const first = raiz.treesBase + sold + 1;
    const order: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customer: { name: identity.name, email: identity.email, phone: identity.phone },
      address: {
        cep: delivery.cep,
        street: delivery.street,
        number: delivery.number,
        complement: delivery.complement,
        district: delivery.district,
        city: delivery.city,
        state: delivery.state.toUpperCase(),
      },
      shipping: { id: option.id, label: option.label, days: option.days, price: option.price },
      payment,
      coupon: t.coupon?.code,
      items: t.detailed.map((l) => ({ slug: l.slug, code: l.product.code, name: l.product.name, size: l.size, qty: l.qty, price: l.product.price })),
      subtotal: t.subtotal,
      discount: t.discount,
      total: t.total,
      trees: Array.from({ length: t.pieces }, (_, i) => first + i),
      deliveryBy: addBusinessDays(new Date(), option.maxDays).toISOString(),
    };
    setPlacing(true);
    place(order);
    clear();
    router.push(`/pedido?id=${order.id}`);
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
      <div>
        <div className="flex items-baseline justify-between gap-4">
          <h1 className="label-lg text-cobre">Finalizar compra</h1>
          <span className="label text-tinta/50">Pedido {orderId}</span>
        </div>
        <div className="mt-6">
          <CheckoutProgress step={step} onGo={go} />
        </div>
        <a href="#resumo" className="mt-6 flex items-center justify-between bg-papel/60 px-4 py-3 lg:hidden">
          <span className="label">
            {t.pieces} {t.pieces === 1 ? "peça" : "peças"} · ver resumo
          </span>
          <span className="font-mono text-[14px]">{formatBRL(t.total)}</span>
        </a>
        <div className="mt-12">
          {step === 1 && (
            <IdentityStep
              defaults={identity ?? (user ? { name: user.name, email: user.email } : undefined)}
              onNext={(data) => {
                setIdentity(data);
                go(2);
              }}
            />
          )}
          {step === 2 && (
            <DeliveryStep
              defaults={delivery ?? undefined}
              subtotal={base.subtotal}
              freeByCoupon={!!base.coupon?.freeShipping}
              onShipping={(state, id) => setShip({ state, id })}
              onNext={(data) => {
                setDelivery(data);
                setShip({ state: data.state.toUpperCase(), id: data.shipping });
                go(3);
              }}
            />
          )}
          {step === 3 && identity && delivery && (
            <>
              <div className="mb-10 grid gap-4 text-small sm:grid-cols-2">
                <Recap title="Identificação" onEdit={() => go(1)}>
                  {identity.name}
                  <br />
                  {identity.email}
                </Recap>
                <Recap title="Entrega" onEdit={() => go(2)}>
                  {delivery.street}, {delivery.number}
                  {delivery.complement ? ` · ${delivery.complement}` : ""}
                  <br />
                  {delivery.city} · {delivery.state.toUpperCase()} · {option?.label} ({option?.days})
                </Recap>
              </div>
              <PaymentStep total={t.total} orderId={orderId} onPay={pay} />
            </>
          )}
        </div>
      </div>

      <aside id="resumo" className="scroll-mt-24 lg:sticky lg:top-[calc(var(--spacing-header)+1.5rem)] lg:self-start">
        <OrderSummary t={t} showItems shippingLabel={option ? (option.price === 0 ? "Grátis" : formatBRL(option.price)) : null} />
      </aside>
    </div>
  );
}

function Recap({ title, children, onEdit }: { title: string; children: React.ReactNode; onEdit: () => void }) {
  return (
    <div className="border border-dashed border-cobre/60 p-4">
      <div className="flex items-baseline justify-between">
        <p className="label text-tinta/60">{title}</p>
        <button type="button" onClick={onEdit} className="label link-stitch">
          Editar
        </button>
      </div>
      <p className="mt-2 text-tinta/85">{children}</p>
    </div>
  );
}
