import type { TypeTag as Tag } from "@/data/products";

const styles: Record<Tag, string> = {
  "PEÇA-HERÓI": "bg-indigo text-linho",
  "VERMELHO POR DENTRO": "bg-pinhao text-linho",
  "ÚLTIMAS UNIDADES": "bg-linho text-indigo ring-1 ring-indigo/70",
  "100% DENIM": "bg-denim text-linho",
  "PLANTA 1 ARAUCÁRIA": "bg-linho-escuro text-araucaria ring-1 ring-araucaria/40",
};

// Rotações fixas por etiqueta (−3° a 3°): estáveis entre servidor e cliente.
const rotation: Record<Tag, number> = {
  "PEÇA-HERÓI": -2.5,
  "VERMELHO POR DENTRO": 2,
  "ÚLTIMAS UNIDADES": -1.5,
  "100% DENIM": 3,
  "PLANTA 1 ARAUCÁRIA": -3,
};

/** Type tag: etiqueta tipográfica que aponta as peças-herói, com leve rotação. */
export function TypeTag({ tag, className = "" }: { tag: Tag; className?: string }) {
  return (
    <span
      className={`label inline-block whitespace-nowrap px-2 py-1 text-[10px] shadow-[0_1px_0_rgb(22_27_39/0.08)] md:text-[11px] ${styles[tag]} ${className}`}
      style={{ transform: `rotate(${rotation[tag]}deg)` }}
    >
      {tag}
    </span>
  );
}
