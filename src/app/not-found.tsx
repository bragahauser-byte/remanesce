import Link from "next/link";
import { Icon } from "@/components/icons/icon";
import { microcopy } from "@/data/copy";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[80svh] flex-col justify-center pt-header">
      <svg viewBox="0 0 120 120" className="h-24 w-24" aria-hidden>
        <path d="M10 92h100" stroke="var(--cobre)" strokeDasharray="5 4" />
        <path d="M60 64c4 4.3 6 9.5 5.7 15.5-.3 5.5-2.5 9.8-5.7 11.9-3.2-2.1-5.4-6.4-5.7-11.9C54 73.5 56 68.3 60 64z" fill="var(--pinhao)" />
      </svg>
      <p className="label mt-8 text-cobre">Erro 404</p>
      <h1 className="serif mt-4 max-w-3xl text-h1 text-casca">
        Esta página voltou à terra. <em>Talvez ela renasça em outro lugar.</em>
      </h1>
      <span className="sr-only">{microcopy.notFound}</span>
      <Link href="/" className="label-lg mt-12 inline-flex h-13 w-fit items-center gap-3 bg-indigo px-8 text-linho hover:bg-denim">
        Voltar ao início <Icon name="seta" size={22} />
      </Link>
    </div>
  );
}
