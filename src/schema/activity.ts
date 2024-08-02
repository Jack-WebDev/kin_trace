import { object, string, type z } from "zod";

export const createActivitySchema = object({
  userId: string().uuid().optional(),
  caseId: string().uuid().optional(),
  activityDesc: string(),
});

export const updateActivitySchema = object({
  id: string().uuid().optional(),
  userId: string().uuid().optional(),
  caseId: string().uuid().optional(),
  activityDesc: string().optional(),
});

export type CreateActivitySchemaType = z.infer<typeof createActivitySchema>;
export type UpdateActivitySchemaType = z.infer<typeof updateActivitySchema>;

export type ActivityType = {
  id: string;
  userId: string;
  caseId: string;
  activityDesc: string;
  createdAt: string;
};
