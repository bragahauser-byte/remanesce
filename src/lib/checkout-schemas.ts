import { z } from "zod";
import { cardBrand, isValidCpf, luhn, onlyDigits, validExpiry } from "./checkout";

export const identitySchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Conte seu nome, por favor.")
    .refine((v) => v.split(/\s+/).length >= 2, "Nome e sobrenome, por favor."),
  email: z.string().trim().email("Confira o e-mail, por favor."),
  cpf: z.string().refine(isValidCpf, "Confira o CPF, por favor."),
  phone: z.string().refine((v) => onlyDigits(v).length >= 10, "Confira o telefone, com DDD."),
});

export const deliverySchema = z.object({
  cep: z.string().refine((v) => onlyDigits(v).length === 8, "Confira o CEP, por favor."),
  street: z.string().trim().min(2, "Qual é a rua?"),
  number: z.string().trim().min(1, "Falta o número."),
  complement: z.string().trim().optional(),
  district: z.string().trim().min(2, "Qual é o bairro?"),
  city: z.string().trim().min(2, "Qual é a cidade?"),
  state: z.string().trim().length(2, "UF com duas letras."),
  shipping: z.enum(["padrao", "expressa"], { message: "Escolha a forma de entrega." }),
});

export const cardSchema = z.object({
  holder: z.string().trim().min(3, "Nome como está no cartão, por favor."),
  number: z
    .string()
    .refine((v) => onlyDigits(v).length >= 13, "Confira o número do cartão.")
    .refine(luhn, "Esse número não parece válido. Confira, por favor.")
    .refine((v) => !!cardBrand(v), "Aceitamos Visa, Mastercard, Elo, Amex e Hipercard."),
  expiry: z.string().refine((v) => validExpiry(v), "Confira a validade (MM/AA)."),
  cvv: z.string().refine((v) => /^\d{3,4}$/.test(v), "Código de 3 ou 4 números."),
  installments: z.coerce.number().int().min(1).max(6),
});

export type Identity = z.infer<typeof identitySchema>;
export type Delivery = z.infer<typeof deliverySchema>;
export type CardInput = z.input<typeof cardSchema>;
export type Card = z.output<typeof cardSchema>;
