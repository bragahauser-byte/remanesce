/*
 * Avaliações de EXEMPLO (projeto acadêmico): textos e nomes fictícios.
 */

export type Review = { name: string; city: string; rating: number; text: string; size: string };

const pool: Review[] = [
  { name: "Helena M.", city: "Curitiba", rating: 5, size: "M", text: "O denim é pesado do jeito certo e as escamas não pesam no corpo. Parece que a peça já tinha história." },
  { name: "Joana R.", city: "São Paulo", rating: 5, size: "P", text: "Quando me mexo o vermelho aparece por dentro. Ninguém espera, todo mundo pergunta." },
  { name: "Camila T.", city: "Florianópolis", rating: 4, size: "G", text: "Veste bem, mas o denim é firme: nos primeiros usos fica mais estruturado. Depois amolece." },
  { name: "Bruna K.", city: "Ponta Grossa", rating: 5, size: "M", text: "Recebi com a tag de papel-semente e plantei no vaso. A araucária do passaporte já tem número." },
  { name: "Luiza A.", city: "Rio de Janeiro", rating: 5, size: "PP", text: "Usei no casamento da minha irmã e anotei no Passaporte. Vou passar para minha filha." },
  { name: "Rafaela S.", city: "Londrina", rating: 4, size: "GG", text: "Caimento lindo. Pedi um ajuste de barra no serviço e voltou perfeita." },
];

/** Três avaliações estáveis por produto (escolhidas pelo código). */
export function reviewsFor(code: string): Review[] {
  const seed = [...code].reduce((n, c) => n + c.charCodeAt(0), 0);
  return [0, 1, 2].map((i) => pool[(seed + i * 2) % pool.length]);
}
