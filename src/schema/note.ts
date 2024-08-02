import { NoteStatus } from "@prisma/client";
import { nativeEnum, object, string, type z } from "zod";

export const createNoteSchema = object({
  userId: string().uuid().optional(),
  taskId: string().uuid().optional(),
  caseId: string().uuid().optional(),
  message: string(),
  status: nativeEnum(NoteStatus).optional(),
});

export const updateNoteSchema = object({
  id: string().uuid(),
  userId: string().uuid().optional(),
  taskId: string().uuid().optional(),
  caseId: string().uuid().optional(),
  message: string().optional(),
  status: nativeEnum(NoteStatus).optional(),
});

export type CreateNoteSchemaType = z.infer<typeof createNoteSchema>;
export type UpdateNoteSchemaType = z.infer<typeof updateNoteSchema>;

export type NoteType = {
  id: string;
  userId: string;
  taskId: string | null;
  caseId: string | null;
  message: string;
  status: string;
  createdAt: string;
};
