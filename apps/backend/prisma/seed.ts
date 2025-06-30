import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rainbowColors = [
  'Vermelho',
  'Laranja',
  'Amarelo',
  'Verde',
  'Azul',
  'Anil',
  'Violeta',
];

async function main() {
  console.log('Iniciando o script de seed...');

  for (const colorName of rainbowColors) {
    await prisma.color.upsert({
      where: { name: colorName },

      // Nao faz nada se ja existir
      update: {},

      // Cria um registro se nao existir
      create: { name: colorName },
    });
  }

  console.log('Seed finalizado!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
