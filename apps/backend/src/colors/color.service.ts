import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ColorService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.color.findMany({
      orderBy: { id: 'asc' },
    });
  }
}
