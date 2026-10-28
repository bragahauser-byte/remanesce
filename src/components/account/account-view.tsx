"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons/icon";
import { ProductCard } from "@/components/shop/product-card";
import { microcopy } from "@/data/copy";
import { getProduct, getProductByCode } from "@/data/products";
import { formatBRL, formatDate } from "@/lib/format";
import { useHydrated } from "@/lib/hooks";
import { useAccount } from "@/lib/store/account";
import { useOrders } from "@/lib/store/orders";
import { useSaved } from "@/lib/store/saved";

const tabs = [
  { key: "pedidos", label: "Pedidos" },
  { key: "guardados", label: "Guardados" },
  { key: "servicos", label: "Serviços" },
  { key: "araucarias", label: "Minhas araucárias" },
  { key: "passaportes", label: "Passaportes" },
] as const;
type Tab = (typeof tabs)[number]["key"];

const number = new Intl.NumberFormat("pt-BR");

export function AccountView() {
  const hydrated = useHydrated();
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const requested = params.get("aba");
  const tab: Tab = tabs.some((t) => t.key === requested) ? (requested as Tab) : "pedidos";
  const user = useAccount((s) => s.user);
  const logout = useAccount((s) => s.logout);

  if (!hydrated) return <div className="min-h-[60vh]" aria-busy="true" />;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="label text-cobre">Minha Remanesce</p>
          <h1 className="serif mt-3 text-h1 text-tinta">{user ? <>Olá, <em>{user.name.split(" ")[0]}</em>.</> : <>O que você <em>guarda</em>.</>}</h1>
        </div>
        {user && (
          <div className="text-right">
            <p className="text-small text-tinta/70">{user.email}</p>
            <button type="button" onClick={logout} className="label link-stitch mt-2">
              Sair
            </button>
          </div>
        )}
      </div>

      {!user && <LoginCard />}

      <div role="tablist" aria-label="Seções da conta" className="mt-12 flex gap-6 overflow-x-auto border-b border-tinta/10 [scrollbar-width:none]">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            id={`aba-${t.key}`}
            aria-selected={tab === t.key}
            aria-controls="painel-conta"
            onClick={() => router.replace(`${pathname}?aba=${t.key}`, { scroll: false })}
            className="label relative shrink-0 whitespace-nowrap pb-3 text-tinta/55 aria-selected:text-tinta"
          >
            {t.label}
            {tab === t.key && <span aria-hidden className="absolute inset-x-0 -bottom-px h-0.5 bg-pinhao" />}
          </button>
        ))}
      </div>

      <div id="painel-conta" role="tabpanel" aria-labelledby={`aba-${tab}`} className="pt-10">
        {tab === "pedidos" && <OrdersTab />}
        {tab === "guardados" && <SavedTab />}
        {tab === "servicos" && <ServicesTab />}
        {tab === "araucarias" && <TreesTab />}
        {tab === "passaportes" && <PassportsTab />}
      </div>
    </div>
  );
}

function LoginCard() {
  const login = useAccount((s) => s.login);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("nome") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    if (name.length < 2) return setError("Conte seu nome, por favor.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return setError("Confira o e-mail, por favor.");
    setError(null);
    login({ name, email });
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-10 grid gap-6 border border-dashed border-cobre/60 p-6 md:grid-cols-[1fr_1fr_auto] md:items-end md:p-8">
      <p className="text-small text-tinta/70 md:col-span-3">
        Entre com seu nome e e-mail para acompanhar pedidos, serviços e araucárias. Sem senha: fica tudo neste navegador.
      </p>
      <label className="block">
        <span className="label text-tinta/70">Nome</span>
        <input name="nome" autoComplete="name" className="mt-1.5 block w-full border-b border-tinta/30 bg-transparent py-2.5 focus:border-tinta focus:outline-none" />
      </label>
      <label className="block">
        <span className="label text-tinta/70">E-mail</span>
        <input name="email" type="email" autoComplete="email" className="mt-1.5 block w-full border-b border-tinta/30 bg-transparent py-2.5 focus:border-tinta focus:outline-none" />
      </label>
      <button type="submit" className="label-lg h-12 bg-tinta px-8 text-branco hover:bg-preto">
        Entrar
      </button>
      <p role="status" className="label text-pinhao md:col-span-3">
        {error}
      </p>
    </form>
  );
}

function Empty({ icon, children, cta }: { icon: IconName; children: ReactNode; cta?: { href: string; label: string } }) {
  return (
    <div className="flex flex-col items-start py-10">
      <Icon name={icon} size={36} className="text-tinta/40" />
      <p className="serif mt-5 max-w-lg text-h4 text-tinta">{children}</p>
      {cta && (
        <Link href={cta.href} className="label link-stitch mt-6">
          {cta.label}
        </Link>
      )}
    </div>
  );
}

function OrdersTab() {
  const orders = useOrders((s) => s.orders);
  if (!orders.length) return <Empty icon="sacola" cta={{ href: "/loja", label: "Explorar a loja" }}>Nenhum pedido por aqui ainda.</Empty>;
  return (
    <ul className="divide-y divide-dashed divide-cobre/40 border-y border-dashed border-cobre/40">
      {orders.map((o) => (
        <li key={o.id}>
          <Link href={`/pedido?id=${o.id}`} className="group grid gap-2 py-5 sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-10">
            <div>
              <p className="label text-cobre">{o.id}</p>
              <p className="serif mt-1 text-[1.25rem] group-hover:text-tinta">{o.items.map((i) => i.name).join(" · ")}</p>
            </div>
            <p className="label text-tinta/60">{formatDate(o.createdAt)}</p>
            <p className="label flex items-center gap-3">
              {formatBRL(o.total)} <Icon name="seta" size={18} className="transition-transform group-hover:translate-x-1" />
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function SavedTab() {
  const slugs = useSaved((s) => s.slugs);
  const products = slugs.flatMap((s) => getProduct(s) ?? []);
  if (!products.length) return <Empty icon="pinhao" cta={{ href: "/loja", label: "Explorar a loja" }}>{microcopy.emptySaved}</Empty>;
  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-6">
      {products.map((p) => (
        <li key={p.slug}>
          <ProductCard product={p} showTags={false} sizes="(min-width: 768px) 22vw, 46vw" />
        </li>
      ))}
    </ul>
  );
}

function ServicesTab() {
  const bookings = useAccount((s) => s.bookings);
  if (!bookings.length)
    return (
      <Empty icon="agulha" cta={{ href: "/servicos", label: "Conhecer os Serviços de Permanência" }}>
        Nenhum serviço agendado. Uma peça Remanesce não termina: ela se transforma com você.
      </Empty>
    );
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {bookings.map((b) => (
        <li key={b.protocol} className="border border-tinta/15 p-6">
          <p className="label text-cobre">Protocolo {b.protocol}</p>
          <p className="serif mt-2 text-h4">{b.serviceLabel}</p>
          <p className="label mt-3 flex items-center gap-2 text-tinta/70">
            <Icon name="calendario" size={16} /> {formatDate(b.date)} · {b.time}
          </p>
          {b.description && <p className="mt-3 text-small text-tinta/75">{b.description}</p>}
        </li>
      ))}
    </ul>
  );
}

function useTrees() {
  const orders = useOrders((s) => s.orders);
  return orders.flatMap((o) => {
    let n = o.trees[0];
    return o.items.flatMap((item) =>
      Array.from({ length: item.qty }, () => ({ number: n++, item, order: o })),
    );
  });
}

function TreesTab() {
  const trees = useTrees();
  if (!trees.length)
    return (
      <Empty icon="araucaria" cta={{ href: "/raiz", label: "Conhecer a Raiz" }}>
        Cada peça planta uma araucária. A sua primeira ainda é semente.
      </Empty>
    );
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {trees.map((t) => (
        <li key={t.number} className="flex items-start gap-4 bg-preto p-6 text-branco">
          <Icon name="araucaria" size={32} className="shrink-0" />
          <div>
            <p className="label text-branco/65">Araucária nº</p>
            <p className="serif text-h3 leading-none">{number.format(t.number)}</p>
            <p className="mt-3 text-small text-branco/75">
              Plantada pela {t.item.name} · {formatDate(t.order.createdAt, { month: "long", year: "numeric" })}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function PassportsTab() {
  const trees = useTrees();
  if (!trees.length)
    return (
      <Empty icon="qr" cta={{ href: "/passaporte/RMN-04-SAI", label: "Ver um Passaporte de exemplo" }}>
        Cada peça comprada ganha um Passaporte: a história dela e as memórias que vocês viverem juntas.
      </Empty>
    );
  return (
    <ul className="divide-y divide-dashed divide-cobre/40 border-y border-dashed border-cobre/40">
      {trees.map((t) => {
        const product = getProductByCode(t.item.code);
        return (
          <li key={t.number}>
            <Link href={`/passaporte/${t.item.code}?arvore=${t.number}`} className="group flex items-center justify-between gap-6 py-5">
              <div className="flex items-center gap-4">
                <Icon name="qr" size={28} />
                <div>
                  <p className="label text-tinta/55">{t.item.code}</p>
                  <p className="serif text-[1.2rem] group-hover:text-tinta">{product?.name ?? t.item.name}</p>
                </div>
              </div>
              <p className="label flex items-center gap-3 text-tinta/70">
                Araucária nº {number.format(t.number)} <Icon name="seta" size={18} />
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
