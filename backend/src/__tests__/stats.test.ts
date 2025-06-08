import request from 'supertest';
import app from '../config/app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_TEST_URL || process.env.DATABASE_URL
    }
  }
});

// Test için kullanıcı ve JWT token
let userToken: string;
let userId: string;

describe('Stats API Tests', () => {
  beforeAll(async () => {
    // Test kullanıcısı oluştur
    const testUser = await prisma.user.create({
      data: {
        name: 'Stats User',
        username: 'statsuser',
        password: '$2b$10$example.hashed.password',
        role: 'USER'
      }
    });
    userId = testUser.id;

    // Auth token al
    const authResponse = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'statsuser',
        password: 'password123'
      });

    if (authResponse.status === 200) {
      userToken = authResponse.body.data.token;
    }
  });

  beforeEach(async () => {
    // Her testten önce verilerini temizle
    if (process.env.NODE_ENV === 'test') {
      await prisma.todoCategory.deleteMany({});
      await prisma.todo.deleteMany({});
    }
  });

  afterAll(async () => {
    // Test verilerini temizle
    await prisma.todoCategory.deleteMany({});
    await prisma.todo.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.$disconnect();
  });

  describe('GET /api/stats/todos', () => {
    beforeEach(async () => {
      // Test todo'ları oluştur - farklı statuslar
      await prisma.todo.createMany({
        data: [
          {
            userId,
            title: 'Pending Todo 1',
            description: 'Description 1',
            status: 'PENDING',
            priority: 'HIGH',
            dueDate: new Date('2025-12-31T10:00:00.000Z')
          },
          {
            userId,
            title: 'Pending Todo 2',
            description: 'Description 2',
            status: 'PENDING',
            priority: 'MEDIUM',
            dueDate: new Date('2025-12-30T10:00:00.000Z')
          },
          {
            userId,
            title: 'In Progress Todo',
            description: 'Description 3',
            status: 'IN_PROGRESS',
            priority: 'HIGH',
            dueDate: new Date('2025-12-29T10:00:00.000Z')
          },
          {
            userId,
            title: 'Completed Todo 1',
            description: 'Description 4',
            status: 'COMPLETED',
            priority: 'LOW',
            dueDate: new Date('2025-12-28T10:00:00.000Z')
          },
          {
            userId,
            title: 'Completed Todo 2',
            description: 'Description 5',
            status: 'COMPLETED',
            priority: 'MEDIUM',
            dueDate: new Date('2025-12-27T10:00:00.000Z')
          },
          {
            userId,
            title: 'Cancelled Todo',
            description: 'Description 6',
            status: 'CANCELLED',
            priority: 'LOW',
            dueDate: new Date('2025-12-26T10:00:00.000Z')
          },
          {
            userId,
            title: 'Overdue Todo',
            description: 'Description 7',
            status: 'PENDING',
            priority: 'HIGH',
            dueDate: new Date('2024-12-25T10:00:00.000Z') // Geçmiş tarih
          }
        ]
      });
    });

    it('should get todo statistics', async () => {
      const response = await request(app)
        .get('/api/stats/todos')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data).toHaveProperty('pending');
      expect(response.body.data).toHaveProperty('in_progress');
      expect(response.body.data).toHaveProperty('completed');
      expect(response.body.data).toHaveProperty('cancelled');
      expect(response.body.data).toHaveProperty('total');
      expect(response.body.data).toHaveProperty('overdue');

      // Sayıları kontrol et
      expect(response.body.data.pending).toBe(3); // 2 normal pending + 1 overdue
      expect(response.body.data.in_progress).toBe(1);
      expect(response.body.data.completed).toBe(2);
      expect(response.body.data.cancelled).toBe(1);
      expect(response.body.data.total).toBe(7);
      expect(response.body.data.overdue).toBe(1);
    });

    it('should return zero stats when no todos exist', async () => {
      // Tüm todo'ları sil
      await prisma.todo.deleteMany({});

      const response = await request(app)
        .get('/api/stats/todos')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data.pending).toBe(0);
      expect(response.body.data.in_progress).toBe(0);
      expect(response.body.data.completed).toBe(0);
      expect(response.body.data.cancelled).toBe(0);
      expect(response.body.data.total).toBe(0);
      expect(response.body.data.overdue).toBe(0);
    });
  });

  describe('GET /api/stats/priorities', () => {
    beforeEach(async () => {
      // Test todo'ları oluştur - farklı öncelikler
      await prisma.todo.createMany({
        data: [
          {
            userId,
            title: 'High Priority Todo 1',
            description: 'Description 1',
            status: 'PENDING',
            priority: 'HIGH',
            dueDate: new Date('2025-12-31T10:00:00.000Z')
          },
          {
            userId,
            title: 'High Priority Todo 2',
            description: 'Description 2',
            status: 'COMPLETED',
            priority: 'HIGH',
            dueDate: new Date('2025-12-30T10:00:00.000Z')
          },
          {
            userId,
            title: 'High Priority Todo 3',
            description: 'Description 3',
            status: 'IN_PROGRESS',
            priority: 'HIGH',
            dueDate: new Date('2025-12-29T10:00:00.000Z')
          },
          {
            userId,
            title: 'Medium Priority Todo 1',
            description: 'Description 4',
            status: 'PENDING',
            priority: 'MEDIUM',
            dueDate: new Date('2025-12-28T10:00:00.000Z')
          },
          {
            userId,
            title: 'Medium Priority Todo 2',
            description: 'Description 5',
            status: 'COMPLETED',
            priority: 'MEDIUM',
            dueDate: new Date('2025-12-27T10:00:00.000Z')
          },
          {
            userId,
            title: 'Low Priority Todo',
            description: 'Description 6',
            status: 'PENDING',
            priority: 'LOW',
            dueDate: new Date('2025-12-26T10:00:00.000Z')
          }
        ]
      });
    });

    it('should get priority statistics', async () => {
      const response = await request(app)
        .get('/api/stats/priorities')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data).toHaveProperty('high');
      expect(response.body.data).toHaveProperty('medium');
      expect(response.body.data).toHaveProperty('low');
      expect(response.body.data).toHaveProperty('total');

      // Sayıları kontrol et
      expect(response.body.data.high).toBe(3);
      expect(response.body.data.medium).toBe(2);
      expect(response.body.data.low).toBe(1);
      expect(response.body.data.total).toBe(6);
    });

    it('should return zero priority stats when no todos exist', async () => {
      // Tüm todo'ları sil
      await prisma.todo.deleteMany({});

      const response = await request(app)
        .get('/api/stats/priorities')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data.high).toBe(0);
      expect(response.body.data.medium).toBe(0);
      expect(response.body.data.low).toBe(0);
      expect(response.body.data.total).toBe(0);
    });
  });
}); 