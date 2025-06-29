"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCustomerSchema = void 0;
const zod_1 = require("zod");
exports.CreateCustomerSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Nome é obrigatório'),
    email: zod_1.z.string().email('E‑mail inválido'),
    cpf: zod_1.z
        .string()
        .regex(/^\d{11}$/, 'CPF deve conter 11 dígitos numéricos'),
    id_color: zod_1.z.number().int().positive('id_color deve ser inteiro > 0'),
    observations: zod_1.z.string().optional().default(''),
});
//# sourceMappingURL=create-customer.schema.js.map