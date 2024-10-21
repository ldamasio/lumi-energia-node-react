// __tests__/db.test.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Prisma Database Connection', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should connect to the database', async () => {
    const result = await prisma.fatura.findMany(); // Tente buscar faturas ou outra operação simples.
    expect(result).toBeDefined(); // Verifica se a conexão retornou um resultado definido.
  });
});