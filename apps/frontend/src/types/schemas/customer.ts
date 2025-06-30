import { z } from "zod";
import { cpf } from "cpf-cnpj-validator";

export const customerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  cpf: z
    .string()
    .min(11, "CPF deve conter 11 dígitos")
    .refine((val) => cpf.isValid(val), {
      message: "CPF inválido"
    }),
  id_color: z.coerce.number().int().min(1, "Selecione uma cor"),
  observations: z.string().optional()
});

export type CustomerSchema = z.infer<typeof customerSchema>;
