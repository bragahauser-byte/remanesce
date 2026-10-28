"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/icons/icon";
import { mobileNav } from "@/data/copy";
import { useHydrated } from "@/lib/hooks";
import { selectCount, useCart } from "@/lib/store/cart";
import { useSaved } from "@/lib/store/saved";

/** Barra inferior no celular: Coleção · Loja · Favoritos · Sacola · Conta. */
export function MobileNav() {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const count = useCart(selectCount);
  const saved = useSaved((s) => s.slugs.length);
  if (pathname.startsWith("/checkout") || pathname.startsWith("/loja/")) return null;

  return (
    <nav
      aria-label="Navegação inferior"
      className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-linha bg-branco/92 pb-[env(safe-area-inset-bottom)] text-tinta backdrop-blur-lg md:hidden"
    >
      <ul className="grid grid-cols-5">
        {mobileNav.map((item) => {
          const path = item.href.split("?")[0];
          const current = !item.href.includes("?") && (pathname === path || pathname.startsWith(`${path}/`));
          const badge = item.icon === "sacola" ? count : 0;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={current ? "page" : undefined}
                className="relative flex h-15 flex-col items-center justify-center gap-1 text-cinza aria-[current=page]:text-tinta"
              >
                <span className="relative">
                  <Icon name={item.icon} size={22} filled={item.icon === "coracao" && hydrated && saved > 0} />
                  {hydrated && badge > 0 && (
                    <span className="absolute -right-2 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-pinhao px-1 text-[9px] font-medium leading-none text-branco">
                      {badge}
                    </span>
                  )}
                </span>
                <span className="text-[10px]">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
