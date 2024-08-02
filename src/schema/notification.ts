import { NotificationCategory, NotificationStatus } from "@prisma/client";
import { array, nativeEnum, object, string, type z } from "zod";

export const createNotificationSchema = object({

  taskId: string().uuid().optional(),
  caseId: string().uuid().optional(),
  recepientId: string().uuid(),
  category: nativeEnum(NotificationCategory),
  message: string(),
  status: nativeEnum(NotificationStatus).optional(),
});

export const createMultipleNotificationSchema = array(
  object({
    taskId: string().uuid().optional(),
    caseId: string().uuid().optional(),
    recepientId: string().uuid(),
    category: nativeEnum(NotificationCategory),
    message: string(),
    status: nativeEnum(NotificationStatus).optional(),
  }),
);

export const updateNotificationSchema = object({
  id: string().uuid().optional(),
  taskId: string().uuid().optional(),
  caseId: string().uuid().optional(),
  recepientId: string().uuid().optional(),
  category: nativeEnum(NotificationCategory).optional(),
  message: string().optional(),
  status: nativeEnum(NotificationStatus).optional(),
});

export type CreateNotificationSchemaType = z.infer<
  typeof createNotificationSchema
>;
export type UpdateNotificationSchemaType = z.infer<
  typeof updateNotificationSchema
>;
export type CreateMultipleNotificationSchemaType = z.infer<
  typeof createMultipleNotificationSchema
>;

export type NotificationType = {
  id: string;
  taskId: string | null;
  recepientId: string;
  caseId: string | null;
  personId: string | null;
  message: string;
  category: string;
  status: string;
  createdAt: string;
};
