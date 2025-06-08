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

describe('Category API Tests', () => {
  beforeAll(async () => {
    // Test kullanıcısı oluştur
    const testUser = await prisma.user.create({
      data: {
        name: 'Test User',
        username: 'categoryuser',
        password: '$2b$10$example.hashed.password',
        role: 'USER'
      }
    });
    userId = testUser.id;

    // Auth token al
    const authResponse = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'categoryuser',
        password: 'password123'
      });

    if (authResponse.status === 200) {
      userToken = authResponse.body.data.token;
    }
  });

  beforeEach(async () => {
    // Her testten önce category verilerini temizle
    if (process.env.NODE_ENV === 'test') {
      await prisma.todoCategory.deleteMany({});
      await prisma.category.deleteMany({});
    }
  });

  afterAll(async () => {
    // Test verilerini temizle
    await prisma.todoCategory.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.$disconnect();
  });

  describe('POST /api/categories', () => {
    it('should create a new category', async () => {
      const categoryData = {
        name: 'Work',
        color: '#FF5722'
      };

      const response = await request(app)
        .post('/api/categories')
        .set('Authorization', `Bearer ${userToken}`)
        .send(categoryData)
        .expect(201);

      expect(response.body.status).toBe('success');
      expect(response.body.data.name).toBe(categoryData.name);
      expect(response.body.data.color).toBe(categoryData.color);
    });

    it('should return validation error for duplicate category name', async () => {
      // İlk kategoriyi oluştur
      await prisma.category.create({
        data: {
          name: 'Duplicate Category',
          color: '#FF0000'
        }
      });

      // Aynı isimde tekrar kategori oluşturmaya çalış
      const response = await request(app)
        .post('/api/categories')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'Duplicate Category',
          color: '#00FF00'
        })
        .expect(422);

      expect(response.body.status).toBe('error');
    });
  });

  describe('GET /api/categories', () => {
    beforeEach(async () => {
      // Test kategorileri oluştur
      await prisma.category.createMany({
        data: [
          {
            name: 'Personal',
            color: '#2196F3'
          },
          {
            name: 'Work',
            color: '#FF5722'
          },
          {
            name: 'Shopping',
            color: '#4CAF50'
          }
        ]
      });
    });

    it('should get all categories', async () => {
      const response = await request(app)
        .get('/api/categories')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data).toHaveLength(3);
      expect(response.body.data[0]).toHaveProperty('name');
      expect(response.body.data[0]).toHaveProperty('color');
    });
  });

  describe('GET /api/categories/:id', () => {
    let categoryId: string;

    beforeEach(async () => {
      const category = await prisma.category.create({
        data: {
          name: 'Test Category',
          color: '#9C27B0'
        }
      });
      categoryId = category.id;
    });

    it('should get a single category by id', async () => {
      const response = await request(app)
        .get(`/api/categories/${categoryId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data.id).toBe(categoryId);
      expect(response.body.data.name).toBe('Test Category');
      expect(response.body.data.color).toBe('#9C27B0');
    });

    it('should return 404 for non-existent category', async () => {
      const nonExistentId = '123e4567-e89b-12d3-a456-426614174000';
      
      const response = await request(app)
        .get(`/api/categories/${nonExistentId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(404);

      expect(response.body.status).toBe('error');
    });
  });

  describe('PUT /api/categories/:id', () => {
    let categoryId: string;

    beforeEach(async () => {
      const category = await prisma.category.create({
        data: {
          name: 'Original Category',
          color: '#FFEB3B'
        }
      });
      categoryId = category.id;
    });

    it('should update a category', async () => {
      const updateData = {
        name: 'Updated Category',
        color: '#E91E63'
      };

      const response = await request(app)
        .put(`/api/categories/${categoryId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data.name).toBe(updateData.name);
      expect(response.body.data.color).toBe(updateData.color);
    });

    it('should return validation error for invalid color format', async () => {
      const invalidData = {
        name: 'Valid Name',
        color: 'invalid-color-format'
      };

      const response = await request(app)
        .put(`/api/categories/${categoryId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(invalidData)
        .expect(422);

      expect(response.body.status).toBe('error');
    });
  });

  describe('DELETE /api/categories/:id', () => {
    let categoryId: string;

    beforeEach(async () => {
      const category = await prisma.category.create({
        data: {
          name: 'Delete Category',
          color: '#795548'
        }
      });
      categoryId = category.id;
    });

    it('should delete a category', async () => {
      const response = await request(app)
        .delete(`/api/categories/${categoryId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.status).toBe('success');

      // Kategorinin silindiğini kontrol et
      const deletedCategory = await prisma.category.findUnique({
        where: { id: categoryId }
      });
      expect(deletedCategory).toBeNull();
    });
  });

  describe('GET /api/categories/:id/todos', () => {
    let categoryId: string;
    let todoId: string;

    beforeEach(async () => {
      // Test kategorisi oluştur
      const category = await prisma.category.create({
        data: {
          name: 'Category with Todos',
          color: '#607D8B'
        }
      });
      categoryId = category.id;

      // Test todo'su oluştur
      const todo = await prisma.todo.create({
        data: {
          userId,
          title: 'Category Todo',
          description: 'Todo in category',
          status: 'PENDING',
          priority: 'MEDIUM',
          dueDate: new Date('2025-12-31T10:00:00.000Z')
        }
      });
      todoId = todo.id;

      // Todo-Category ilişkisi oluştur
      await prisma.todoCategory.create({
        data: {
          todoId: todoId,
          categoryId: categoryId
        }
      });
    });

    it('should get todos by category id', async () => {
      const response = await request(app)
        .get(`/api/categories/${categoryId}/todos`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].title).toBe('Category Todo');
    });

    it('should return empty array for category with no todos', async () => {
      const emptyCategory = await prisma.category.create({
        data: {
          name: 'Empty Category',
          color: '#9E9E9E'
        }
      });

      const response = await request(app)
        .get(`/api/categories/${emptyCategory.id}/todos`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data).toHaveLength(0);
    });
  });
}); 