import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const levels = [
    {'title': 'Aprendiz', 'order': 0, 'totalXP': 0, 'multiplierFactor': 1.0},
    {'title': 'Novato', 'order': 1, 'totalXP': 100, 'multiplierFactor': 1.2},
    {'title': 'Aventureiro dos Céus', 'order': 2, 'totalXP': 250, 'multiplierFactor': 1.5},
    {'title': 'Explorador Celestial', 'order': 3, 'totalXP': 500, 'multiplierFactor': 2.0},
    {'title': 'Piloto Cadete', 'order': 4, 'totalXP': 1000, 'multiplierFactor': 2.5},
    {'title': 'Alto Voo', 'order': 5, 'totalXP': 2000, 'multiplierFactor': 3.0},
    {'title': 'Navegador Intrépido', 'order': 6, 'totalXP': 3500, 'multiplierFactor': 3.5},
    {'title': 'Dominador do Céu', 'order': 7, 'totalXP': 5000, 'multiplierFactor': 4.0},
    {'title': 'Comandante Júnior', 'order': 8, 'totalXP': 7500, 'multiplierFactor': 4.5},
    {'title': 'Comandante Sênior', 'order': 9, 'totalXP': 10000, 'multiplierFactor': 5.0},
    {'title': 'Senhor dos Ventos', 'order': 10, 'totalXP': 15000, 'multiplierFactor': 6.0},
    {'title': 'Navegador Virtuoso', 'order': 11, 'totalXP': 20000, 'multiplierFactor': 7.0},
    {'title': 'Especialista Aéreo', 'order': 12, 'totalXP': 25000, 'multiplierFactor': 8.0},
    {'title': 'Mestre de Esquadrilha', 'order': 13, 'totalXP': 30000, 'multiplierFactor': 9.0},
    {'title': 'Legado Celestial', 'order': 14, 'totalXP': 40000, 'multiplierFactor': 10.0},
    {'title': 'Piloto Instrutor', 'order': 15, 'totalXP': 50000, 'multiplierFactor': 11.0},
    {'title': 'Comandante Instrutor', 'order': 16, 'totalXP': 65000, 'multiplierFactor': 12.0},
    {'title': 'Mestre da Aviação', 'order': 17, 'totalXP': 80000, 'multiplierFactor': 13.0},
    {'title': 'Lenda dos Céus', 'order': 18, 'totalXP': 100000, 'multiplierFactor': 15.0},
    {'title': 'Supremo dos Céus', 'order': 19, 'totalXP': 150000, 'multiplierFactor': 20.0},
  ];

  for (const levelData of levels) {
    await prisma.userLevel.create({
      data: levelData,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
