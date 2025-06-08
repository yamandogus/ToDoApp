import { PrismaClient } from '@prisma/client';

// Test ortamı için Prisma client
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_TEST_URL || process.env.DATABASE_URL
    }
  }
});

// Test ortamını set et
process.env.NODE_ENV = 'test';

// Jest global teardown
afterAll(async () => {
  await prisma.$disconnect();
});

export { prisma }; 