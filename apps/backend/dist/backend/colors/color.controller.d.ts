import { ColorService } from './color.service';
export declare class ColorController {
    private readonly service;
    constructor(service: ColorService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
    }[]>;
}
