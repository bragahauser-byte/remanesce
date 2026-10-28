import { ScalePattern } from "@/components/brand/textures";
import { Icon } from "@/components/icons/icon";

/** Inserções editoriais entre os produtos da loja: frase, textura, citação. */
export function EditorialPhrase() {
  return (
    <aside className="col-span-2 flex flex-col justify-center py-10 md:col-span-6 md:px-6 md:py-0">
      <p className="label text-cobre">Do conceito</p>
      <p className="serif mt-5 text-h2 text-tinta">
        Cada escama, <em>uma memória.</em>
      </p>
      <p className="mt-6 max-w-sm text-small text-tinta/70">
        As escamas sobrepostas imitam as brácteas da pinha. Por baixo delas, o vermelho que ninguém vê.
      </p>
    </aside>
  );
}

export function EditorialTexture() {
  return (
    <aside className="tex-sarja relative col-span-1 flex aspect-[3/4] flex-col justify-end overflow-hidden bg-tinta p-5 text-branco md:col-span-3">
      <ScalePattern scale={1.6} opacity={0.55} id="escamas-loja" />
      <span aria-hidden className="absolute bottom-[38%] left-1/2 h-10 w-5 -translate-x-1/2 bg-pinhao [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)]" />
      <div className="relative">
        <Icon name="escama" />
        <p className="label mt-3">Sobras de corte</p>
        <p className="mt-1 text-small text-branco/75">Toda escama nasce de um retalho.</p>
      </div>
    </aside>
  );
}

export function EditorialQuote() {
  return (
    <aside className="col-span-2 border-y border-tinta/10 py-14 text-center md:col-span-12 md:py-20">
      <p className="serif mx-auto max-w-4xl text-h3 italic text-tinta">
        “A permanência não é ficar parado. É continuar existindo em outra forma.”
      </p>
      <p className="label mt-6 text-tinta/60">Manifesto Remanesce</p>
    </aside>
  );
}
