import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
export declare class CustomersService {
    private prisma;
    constructor(prisma: PrismaService);
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
