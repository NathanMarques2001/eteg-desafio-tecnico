import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.color.createMany({
    data: [
      { name: 'Vermelho' },
      { name: 'Laranja' },
      { name: 'Amarelo' },
      { name: 'Verde' },
      { name: 'Azul' },
      { name: 'Anil' },
      { name: 'Violeta' },
    ],
    skipDuplicates: true,
  });

  console.log('Cores do arco-íris inseridas!');
}

main().finally(() => prisma.$disconnect());
