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
let categoryId: string;

describe('Todo API Tests', () => {
  beforeAll(async () => {
    // Test kullanıcısı oluştur
    const testUser = await prisma.user.create({
      data: {
        name: 'Test User',
        username: 'testuser',
        password: '$2b$10$example.hashed.password', // Hashed password
        role: 'USER'
      }
    });
    userId = testUser.id;

    // Auth token al
    const authResponse = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'password123'
      });

    if (authResponse.status === 200) {
      userToken = authResponse.body.data.token;
    }

    // Test kategorisi oluştur
    const testCategory = await prisma.category.create({
      data: {
        name: 'Test Category',
        color: '#FF0000'
      }
    });
    categoryId = testCategory.id;
  });

  beforeEach(async () => {
    // Her testten önce todo verilerini temizle
    if (process.env.NODE_ENV === 'test') {
      await prisma.todoCategory.deleteMany({});
      await prisma.todo.deleteMany({});
    }
  });

  afterAll(async () => {
    // Test verilerini temizle ve bağlantıyı kapat
    await prisma.todoCategory.deleteMany({});
    await prisma.todo.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.$disconnect();
  });

  describe('POST /api/todos', () => {
    it('should create a new todo', async () => {
      const todoData = {
        title: 'Test Todo',
        description: 'Test Description',
        priority: 'HIGH',
        dueDate: new Date('2025-12-31T10:00:00.000Z').toISOString(),
        category_ids: [categoryId]
      };

      const response = await request(app)
        .post('/api/todos')
        .set('Authorization', `Bearer ${userToken}`)
        .send(todoData)
        .expect(201);

      expect(response.body.status).toBe('success');
      expect(response.body.data.title).toBe(todoData.title);
      expect(response.body.data.description).toBe(todoData.description);
      expect(response.body.data.priority).toBe(todoData.priority);
    });

    it('should return validation error for invalid todo data', async () => {
      const invalidTodoData = {
        title: 'A', // Too short
        description: 'A'.repeat(501), // Too long  
        priority: 'INVALID_PRIORITY'
      };

      const response = await request(app)
        .post('/api/todos')
        .set('Authorization', `Bearer ${userToken}`)
        .send(invalidTodoData)
        .expect(422);

      expect(response.body.status).toBe('error');
      expect(response.body.errors).toBeDefined();
    });
  });

  describe('GET /api/todos', () => {
    beforeEach(async () => {
      // Test todo'ları oluştur
      await prisma.todo.createMany({
        data: [
          {
            userId,
            title: 'Todo 1',
            description: 'Description 1',
            status: 'PENDING',
            priority: 'HIGH',
            dueDate: new Date('2025-12-31T10:00:00.000Z')
          },
          {
            userId,
            title: 'Todo 2', 
            description: 'Description 2',
            status: 'COMPLETED',
            priority: 'LOW',
            dueDate: new Date('2025-12-30T10:00:00.000Z')
          }
        ]
      });
    });

    it('should get all todos with pagination', async () => {
      const response = await request(app)
        .get('/api/todos?page=1&limit=10')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data).toHaveLength(2);
      expect(response.body.meta.pagination).toBeDefined();
      expect(response.body.meta.pagination.total).toBe(2);
    });

    it('should filter todos by status', async () => {
      const response = await request(app)
        .get('/api/todos?status=PENDING')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].status).toBe('PENDING');
    });

    it('should sort todos by due date', async () => {
      const response = await request(app)
        .get('/api/todos?sort=dueDate&order=asc')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.status).toBe('success');
      const todos = response.body.data;
      expect(new Date(todos[0].dueDate) <= new Date(todos[1].dueDate)).toBe(true);
    });
  });

  describe('GET /api/todos/:id', () => {
    let todoId: string;

    beforeEach(async () => {
      const todo = await prisma.todo.create({
        data: {
          userId,
          title: 'Single Todo',
          description: 'Single Description',
          status: 'PENDING',
          priority: 'MEDIUM',
          dueDate: new Date('2025-12-31T10:00:00.000Z')
        }
      });
      todoId = todo.id;
    });

    it('should get a single todo by id', async () => {
      const response = await request(app)
        .get(`/api/todos/${todoId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data.id).toBe(todoId);
      expect(response.body.data.title).toBe('Single Todo');
    });

    it('should return 404 for non-existent todo', async () => {
      const nonExistentId = '123e4567-e89b-12d3-a456-426614174000';
      
      const response = await request(app)
        .get(`/api/todos/${nonExistentId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(404);

      expect(response.body.status).toBe('error');
    });
  });

  describe('PUT /api/todos/:id', () => {
    let todoId: string;

    beforeEach(async () => {
      const todo = await prisma.todo.create({
        data: {
          userId,
          title: 'Original Todo',
          description: 'Original Description',
          status: 'PENDING',
          priority: 'MEDIUM',
          dueDate: new Date('2025-12-31T10:00:00.000Z')
        }
      });
      todoId = todo.id;
    });

    it('should update a todo', async () => {
      const updateData = {
        title: 'Updated Todo',
        description: 'Updated Description',
        status: 'IN_PROGRESS',
        priority: 'HIGH'
      };

      const response = await request(app)
        .put(`/api/todos/${todoId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data.title).toBe(updateData.title);
      expect(response.body.data.status).toBe(updateData.status);
    });
  });

  describe('PATCH /api/todos/:id/status', () => {
    let todoId: string;

    beforeEach(async () => {
      const todo = await prisma.todo.create({
        data: {
          userId,
          title: 'Status Todo',
          description: 'Status Description',
          status: 'PENDING',
          priority: 'MEDIUM',
          dueDate: new Date('2025-12-31T10:00:00.000Z')
        }
      });
      todoId = todo.id;
    });

    it('should update todo status', async () => {
      const response = await request(app)
        .patch(`/api/todos/${todoId}/status`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ status: 'COMPLETED' })
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data.status).toBe('COMPLETED');
    });

    it('should return validation error for invalid status', async () => {
      const response = await request(app)
        .patch(`/api/todos/${todoId}/status`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ status: 'INVALID_STATUS' })
        .expect(422);

      expect(response.body.status).toBe('error');
    });
  });

  describe('DELETE /api/todos/:id', () => {
    let todoId: string;

    beforeEach(async () => {
      const todo = await prisma.todo.create({
        data: {
          userId,
          title: 'Delete Todo',
          description: 'Delete Description',
          status: 'PENDING',
          priority: 'MEDIUM',
          dueDate: new Date('2025-12-31T10:00:00.000Z')
        }
      });
      todoId = todo.id;
    });

    it('should soft delete a todo', async () => {
      const response = await request(app)
        .delete(`/api/todos/${todoId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.status).toBe('success');

      // Todo'nun soft delete edildiğini kontrol et
      const deletedTodo = await prisma.todo.findUnique({
        where: { id: todoId }
      });
      expect(deletedTodo?.deletedAt).not.toBeNull();
    });
  });

  describe('GET /api/todos/search', () => {
    beforeEach(async () => {
      await prisma.todo.createMany({
        data: [
          {
            userId,
            title: 'React Todo App',
            description: 'Build React application',
            status: 'PENDING',
            priority: 'MEDIUM',
            dueDate: new Date('2025-12-31T10:00:00.000Z')
          },
          {
            userId,
            title: 'Node.js API',
            description: 'Develop backend API',
            status: 'PENDING',
            priority: 'HIGH',
            dueDate: new Date('2025-12-30T10:00:00.000Z')
          }
        ]
      });
    });

    it('should search todos by title', async () => {
      const response = await request(app)
        .get('/api/todos/search?q=React')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].title).toContain('React');
    });

    it('should search todos by description', async () => {
      const response = await request(app)
        .get('/api/todos/search?q=backend')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].description).toContain('backend');
    });
  });
}); 