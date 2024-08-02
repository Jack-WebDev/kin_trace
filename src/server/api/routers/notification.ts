import {
  createMultipleNotificationSchema,
  createNotificationSchema,
  updateNotificationSchema,
} from "@/schema";
import { z } from "zod";

import {
  getAllNotification,
  getSingleNotification,
} from "../controllers/notification/query";
import {
  deleteNotification,
  createNotification,
  updateNotification,
  createMultipleNotification,
} from "../controllers/notification/mutation";
import { createRouter, protectedProcedure } from "../trpc";

export const notificationRouter = createRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return await getAllNotification(ctx);
  }),

  single: protectedProcedure.input(z.string()).query(async ({ input, ctx }) => {
    return await getSingleNotification(ctx, input);
  }),

  create: protectedProcedure
    .input(createNotificationSchema)
    .mutation(async ({ input, ctx }) => {
      return await createNotification(ctx, input);
    }),

  createMany: protectedProcedure
    .input(createMultipleNotificationSchema)
    .mutation(async ({ input, ctx }) => {
      return await createMultipleNotification(ctx, input);
    }),

  update: protectedProcedure
    .input(updateNotificationSchema)
    .mutation(async ({ input, ctx }) => {
      return await updateNotification(ctx, input);
    }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      return deleteNotification(ctx, input);
    }),
});
