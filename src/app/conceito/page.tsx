import type { Metadata } from "next";
import { Redirect } from "./redirect";

export const metadata: Metadata = { title: "Sobre nós", robots: { index: false } };

/** A página Conceito virou "Sobre nós": links antigos continuam chegando ao lugar certo. */
export default function ConceptRedirect() {
  return <Redirect to="/sobre" />;
}
