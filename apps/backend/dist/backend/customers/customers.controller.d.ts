import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
export declare class CustomersController {
    private readonly customersService;
    constructor(customersService: CustomersService);
    create(createCustomerDto: CreateCustomerDto): Promise<{
        id: number;
        name: string;
        email: string;
        cpf: string;
        id_color: number;
        observations: string;
        createdAt: Date;
    }>;
}
