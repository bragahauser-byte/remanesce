"use client";

import { useRef } from "react";
import { Icon } from "@/components/icons/icon";

const letters = [
  ["PP", "78–82", "60–64", "86–90"],
  ["P", "83–87", "65–69", "91–95"],
  ["M", "88–93", "70–75", "96–101"],
  ["G", "94–100", "76–82", "102–108"],
  ["GG", "101–107", "83–89", "109–115"],
];

const numbers = [
  ["34", "60–63", "86–89"],
  ["36", "64–67", "90–93"],
  ["38", "68–71", "94–97"],
  ["40", "72–75", "98–101"],
  ["42", "76–80", "102–106"],
  ["44", "81–85", "107–111"],
  ["46", "86–90", "112–116"],
];

/** Link "Guia de medidas" + modal com a tabela (medidas do corpo, em cm). */
export function SizeGuide({ numeric }: { numeric: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  const head = numeric ? ["Tamanho", "Cintura", "Quadril"] : ["Tamanho", "Busto", "Cintura", "Quadril"];
  const rows = numeric ? numbers : letters;

  return (
    <>
      <button type="button" onClick={() => ref.current?.showModal()} className="label link-stitch">
        Guia de medidas
      </button>
      <dialog
        ref={ref}
        onClick={(e) => e.target === ref.current && ref.current?.close()}
        className="m-auto w-[min(560px,calc(100vw-2rem))] bg-linho p-0 text-indigo backdrop:bg-indigo/60"
        aria-labelledby="guia-titulo"
      >
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="label text-cobre">Medidas do corpo, em centímetros</p>
              <h2 id="guia-titulo" className="serif mt-2 text-h4">
                Guia de medidas
              </h2>
            </div>
            <button type="button" onClick={() => ref.current?.close()} aria-label="Fechar guia" className="-mr-2 p-2 hover:text-cobre" autoFocus>
              <Icon name="fechar" />
            </button>
          </div>
          <table className="mt-6 w-full text-left text-small">
            <thead>
              <tr className="border-b border-indigo/20">
                {head.map((h) => (
                  <th key={h} scope="col" className="label py-2 font-normal text-indigo/60">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([size, ...cells]) => (
                <tr key={size} className="border-b border-dashed border-cobre/40">
                  <th scope="row" className="label py-2.5 font-medium">
                    {size}
                  </th>
                  {cells.map((c, i) => (
                    <td key={i} className="py-2.5 tabular-nums">
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-5 text-small text-indigo/70">
            Entre dois tamanhos? O denim cede com o uso e guarda a forma do corpo. Prefira o menor para um caimento justo.
          </p>
        </div>
      </dialog>
    </>
  );
}
