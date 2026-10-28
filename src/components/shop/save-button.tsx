"use client";

import { Icon } from "@/components/icons/icon";
import { useHydrated } from "@/lib/hooks";
import { useSaved } from "@/lib/store/saved";

/** Favoritar a peça: o coração preenche em vermelho pinhão. */
export function SaveButton({
  slug,
  name,
  className = "",
  withLabel = false,
  size = 20,
}: {
  slug: string;
  name: string;
  className?: string;
  withLabel?: boolean;
  size?: number;
}) {
  const hydrated = useHydrated();
  const saved = useSaved((s) => s.slugs.includes(slug));
  const toggle = useSaved((s) => s.toggle);
  const on = hydrated && saved;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      aria-pressed={on}
      aria-label={on ? `Remover ${name} dos favoritos` : `Favoritar ${name}`}
      className={`group/save flex items-center gap-2 ${className}`}
    >
      <Icon name="coracao" size={size} filled={on} className="transition-transform duration-500 ease-remanesce group-active/save:scale-90" />
      {withLabel && <span className="text-small">{on ? "Favoritado" : "Favoritar"}</span>}
    </button>
  );
}
