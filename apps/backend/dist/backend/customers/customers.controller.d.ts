import { CreateCustomerDto } from './schemas/create-customer.schema';
import { CustomersService } from './customers.service';
export declare class CustomersController {
    private readonly service;
    constructor(service: CustomersService);
    create(dto: CreateCustomerDto): Promise<{
        id: number;
        name: string;
        email: string;
        cpf: string;
        id_color: number;
        observations: string;
        createdAt: Date;
    }>;
}
