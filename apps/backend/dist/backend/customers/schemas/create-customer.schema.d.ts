import { z } from 'zod';
export declare const CreateCustomerSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    cpf: z.ZodString;
    id_color: z.ZodNumber;
    observations: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    cpf: string;
    id_color: number;
    observations: string;
}, {
    name: string;
    email: string;
    cpf: string;
    id_color: number;
    observations?: string | undefined;
}>;
export type CreateCustomerDto = z.infer<typeof CreateCustomerSchema>;
