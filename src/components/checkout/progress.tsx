const steps = ["Identificação", "Entrega", "Pagamento"];

/** Barra de progresso em pesponto: a linha costurada vira contínua a cada passo concluído. */
export function CheckoutProgress({ step, onGo }: { step: number; onGo: (step: number) => void }) {
  return (
    <ol className="grid grid-cols-3 gap-2" aria-label="Etapas do checkout">
      {steps.map((label, i) => {
        const n = i + 1;
        const done = n < step;
        const current = n === step;
        return (
          <li key={label}>
            <button
              type="button"
              onClick={() => done && onGo(n)}
              disabled={!done}
              aria-current={current ? "step" : undefined}
              className="group w-full text-left disabled:cursor-default"
            >
              <span className={`block h-[2px] ${done || current ? "bg-indigo" : "stitch-x"}`} />
              <span className={`label mt-3 flex items-center gap-2 ${current ? "text-indigo" : done ? "text-indigo/70 group-hover:text-cobre" : "text-indigo/40"}`}>
                <span className="tabular-nums">0{n}</span>
                <span className="hidden sm:inline">{label}</span>
                {current && <span className="sm:hidden">{label}</span>}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
