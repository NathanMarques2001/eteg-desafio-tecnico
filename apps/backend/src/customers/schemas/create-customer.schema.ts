import { z } from 'zod';

export const CreateCustomerSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E‑mail inválido'),
  cpf: z.string().regex(/^\d{11}$/, 'CPF deve conter 11 dígitos numéricos'),
  id_color: z.number().int().positive('id_color deve ser inteiro > 0'),
  observations: z.string().optional().default(''),
});

export type CreateCustomerDto = z.infer<typeof CreateCustomerSchema>;
