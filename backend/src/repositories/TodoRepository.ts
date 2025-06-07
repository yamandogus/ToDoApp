import prisma from "../config/db";
import { Status } from "../../generated/prisma";
import { CreateTodoData, UpdateTodoData, TodoData } from "../model/todoType";

export class TodoRepository {
  static async getTodos(): Promise<TodoData[]> {
    return await prisma.todo.findMany({ where: { deletedAt: null } });
  }

  static async getTodo(id: string): Promise<TodoData | null> {
    return await prisma.todo.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  static async createTodo(data: CreateTodoData): Promise<TodoData> {
    return await prisma.todo.create({
      data,
    });
  }

  static async updateTodo(id: string, data: UpdateTodoData): Promise<TodoData> {
    return await prisma.todo.update({
      where: {
        id,
        deletedAt: null,
      },
      data,
    });
  }

  static async updateTodoStatus(id: string, status: Status): Promise<TodoData> {
    return await prisma.todo.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }

  static async deleteTodo(id: string): Promise<TodoData> {
    return await prisma.todo.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  static async searchTodos(query: string): Promise<TodoData[]> {
    return await prisma.todo.findMany({
      where: {
        AND: [
          {
            title: {
              contains: query,
            },
          },
        ],
        deletedAt: null,
      },
    });
  }

  static async getTodoStats(): Promise<any> {
    return await prisma.todo.aggregate({
      _count: {
        status: true,
      },
    });
  }

  static async getPriorityStats(): Promise<any> {
    return await prisma.todo.aggregate({
      _count: {
        priority: true,
      },
    });
  }
}
