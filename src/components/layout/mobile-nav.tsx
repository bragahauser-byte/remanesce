"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/icons/icon";
import { mobileNav } from "@/data/copy";
import { useHydrated } from "@/lib/hooks";
import { selectCount, useCart } from "@/lib/store/cart";

/** Barra inferior no celular: Explorar · Loja · Serviços · Conta · Sacola. */
export function MobileNav() {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const count = useCart(selectCount);
  if (pathname.startsWith("/checkout")) return null;

  return (
    <nav
      aria-label="Navegação inferior"
      className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-indigo/10 bg-linho/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
    >
      <ul className="grid grid-cols-5">
        {mobileNav.map((item) => {
          const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={current ? "page" : undefined}
                className="relative flex h-16 flex-col items-center justify-center gap-1 text-indigo/60 aria-[current=page]:text-indigo"
              >
                <span className="relative">
                  <Icon name={item.icon} size={22} />
                  {item.href === "/sacola" && hydrated && count > 0 && (
                    <span className="absolute -right-2 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-pinhao px-1 font-mono text-[9px] leading-none text-linho">
                      {count}
                    </span>
                  )}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.06em]">{item.label}</span>
                {current && <span aria-hidden className="absolute top-0 h-0.5 w-6 bg-pinhao" />}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
