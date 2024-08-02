import { TaskStatus } from "@prisma/client";
import { nativeEnum, object, string, type z } from "zod";


export const createTaskSchema = object({
  createdBy: string().uuid().optional(),
  assignedTo: string().uuid().optional(),
  caseId: string().uuid().optional(),
  taskMessage: string(),
  status: nativeEnum(TaskStatus).optional(),
});

export const updateTaskSchema = object({
  id: string().uuid(),
  createdBy: string().uuid().optional(),
  assignedTo: string().uuid().optional(),
  caseId: string().uuid().optional(),
  taskMessage: string().optional(),
  status: nativeEnum(TaskStatus).optional(),
});

export type CreateTaskSchemaType = z.infer<typeof createTaskSchema>;
export type UpdateTaskSchemaType = z.infer<typeof updateTaskSchema>;


