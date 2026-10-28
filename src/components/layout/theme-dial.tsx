"use client";

import { setTheme, useTheme } from "@/lib/theme";

/**
 * Seletor redondo do canto superior direito. Na referência ele é um mostrador
 * de "viagem no tempo" que escurece a página para a noite; aqui ele alterna entre
 * o tema claro e o tema terra. O ponto percorre meia volta do círculo na troca.
 */
export function ThemeDial({ className = "" }: { className?: string }) {
  const theme = useTheme();
  const terra = theme === "terra";

  return (
    <button
      type="button"
      onClick={() => setTheme(terra ? "claro" : "terra")}
      aria-pressed={terra}
      aria-label={terra ? "Tema terra ativo. Mudar para o tema claro" : "Tema claro ativo. Mudar para o tema terra"}
      className={`group grid size-12 place-items-center rounded-full border border-current ${className}`}
    >
      <span
        aria-hidden
        className="absolute inset-0 transition-transform duration-[900ms] ease-[var(--ease)]"
        style={{ transform: `rotate(${terra ? 180 : 0}deg)` }}
      >
        <span className="absolute right-[10px] top-1/2 size-2 -translate-y-1/2 rounded-full border border-current transition-colors duration-500 group-hover:bg-current" />
      </span>
    </button>
  );
}
