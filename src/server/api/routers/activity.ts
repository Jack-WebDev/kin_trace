import { createActivitySchema } from "@/schema";
import { z } from "zod";
import {
  getAllActivities,
  getAllActivitiesByCase,
} from "../controllers/activity/query";
import { createActivity } from "../controllers/activity/mutation";
import { createRouter, protectedProcedure } from "../trpc";

export const activityRouter = createRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return await getAllActivities(ctx);
  }),

  listByCase: protectedProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      return await getAllActivitiesByCase(ctx, input);
    }),

  create: protectedProcedure
    .input(createActivitySchema)
    .mutation(async ({ input, ctx }) => {
      return await createActivity(ctx, input);
    }),
});
