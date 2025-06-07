import { Priority, Status } from "../../generated/prisma";
import { z } from "zod";

export const createTodoSchema = z.object({
  userId: z.string().min(1, "userId is required"),
  title: z.string().min(1, "title is required").max(100, "title is too long"),
  description: z.string().min(1, "description is required").max(500),
  priority: z.nativeEnum(Priority),
  dueDate: z.date().min(new Date(), "dueDate is required"),
});

export const updateTodoSchema = z
  .object({
    status: z.nativeEnum(Status).optional(),
  })
  .merge(createTodoSchema.partial());

export const todoSchema = createTodoSchema.extend({
  id: z.string().min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
});