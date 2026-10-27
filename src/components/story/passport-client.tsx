"use client";

import { useSearchParams } from "next/navigation";
import { useState, useSyncExternalStore, type FormEvent } from "react";
import { Icon } from "@/components/icons/icon";
import { formatDate } from "@/lib/format";

const number = new Intl.NumberFormat("pt-BR");

/** Número da araucária: vem do QR / link do pedido (?arvore=) ou um exemplo estável por código. */
export function TreeNumber({ fallback }: { fallback: number }) {
  const param = Number(useSearchParams().get("arvore"));
  const n = Number.isFinite(param) && param > 0 ? param : fallback;
  return <>{number.format(n)}</>;
}

type Memory = { id: string; where: string; text: string; date: string };

const key = (code: string) => `remanesce:passaporte:${code}`;
const listeners = new Set<() => void>();
const cache = new Map<string, { raw: string | null; list: Memory[] }>();

function read(code: string): Memory[] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(key(code));
  } catch {
    raw = null;
  }
  const hit = cache.get(code);
  if (hit && hit.raw === raw) return hit.list;
  let list: Memory[] = [];
  try {
    list = raw ? (JSON.parse(raw) as Memory[]) : [];
  } catch {
    list = [];
  }
  cache.set(code, { raw, list });
  return list;
}

const empty: Memory[] = [];

/** "Memórias desta peça": o dono registra onde usou e o que viveu com ela (fica neste navegador). */
export function PassportMemories({ code }: { code: string }) {
  const memories = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => read(code),
    () => empty,
  );
  const [error, setError] = useState<string | null>(null);

  function save(list: Memory[]) {
    try {
      localStorage.setItem(key(code), JSON.stringify(list));
    } catch {
      setError("Não foi possível guardar neste navegador.");
    }
    listeners.forEach((l) => l());
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const where = String(data.get("onde") ?? "").trim();
    const text = String(data.get("memoria") ?? "").trim();
    if (text.length < 3) {
      setError("Escreva uma memória, por favor.");
      return;
    }
    setError(null);
    save([{ id: crypto.randomUUID(), where, text, date: new Date().toISOString() }, ...memories]);
    e.currentTarget.reset();
  }

  return (
    <div>
      <form onSubmit={onSubmit} noValidate className="grid gap-6">
        <label className="block">
          <span className="label text-linho/70">Onde</span>
          <input name="onde" placeholder="Ex.: casamento da minha irmã, Morretes" className="mt-1.5 block w-full border-b border-linho/30 bg-transparent py-2.5 text-linho placeholder:text-linho/35 focus:border-linho focus:outline-none" />
        </label>
        <label className="block">
          <span className="label text-linho/70">O que vocês viveram</span>
          <textarea name="memoria" rows={3} className="mt-1.5 block w-full resize-y border-b border-linho/30 bg-transparent py-2.5 text-linho focus:border-linho focus:outline-none" />
        </label>
        <div className="flex flex-wrap items-center gap-4">
          <button type="submit" className="label-lg flex h-12 items-center gap-3 bg-linho px-8 text-indigo hover:bg-linho-escuro">
            Guardar memória <Icon name="pinhao" size={18} />
          </button>
          <p role="status" className="label text-pinhao-vivo brightness-150">
            {error}
          </p>
        </div>
      </form>
      <ul className="mt-10 space-y-4">
        {memories.map((m) => (
          <li key={m.id} className="border-l border-dashed border-cobre pl-5">
            <p className="label text-linho/55">
              {formatDate(m.date)}
              {m.where ? ` · ${m.where}` : ""}
            </p>
            <p className="serif mt-1 text-[1.2rem]">{m.text}</p>
            <button type="button" onClick={() => save(memories.filter((x) => x.id !== m.id))} className="label mt-2 text-linho/45 hover:text-linho">
              Apagar
            </button>
          </li>
        ))}
      </ul>
      {memories.length === 0 && <p className="mt-8 text-small text-linho/55">Nenhuma memória ainda. A primeira é sempre a mais difícil de escolher.</p>}
    </div>
  );
}
