import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  cpf: z
    .string()
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => /^\d{11}$/.test(val), {
      message: "CPF deve ter 14 dígitos"
    }),
  id_color: z.coerce.number().int().min(1, "Selecione uma cor"),
  observations: z.string().optional()
});

export type CustomerSchema = z.infer<typeof customerSchema>;
