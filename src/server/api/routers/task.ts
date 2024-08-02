import { createTaskSchema, updateTaskSchema } from "@/schema";

import { z } from "zod";
import {
  getAllTasks,
  getAllTasksByCase,
  getSingleTask,
} from "../controllers/task/query";
import {
  deleteTask,
  createTask,
  updateTask,
} from "../controllers/task/mutation";
import { createRouter, protectedProcedure } from "../trpc";

export const taskRouter = createRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return await getAllTasks(ctx);
  }),

  listByCase: protectedProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      return await getAllTasksByCase(ctx, input);
    }),

  single: protectedProcedure.input(z.string()).query(async ({ input, ctx }) => {
    return await getSingleTask(ctx, input);
  }),

  create: protectedProcedure
    .input(createTaskSchema)
    .mutation(async ({ input, ctx }) => {
      return await createTask(ctx, input);
    }),

  update: protectedProcedure
    .input(updateTaskSchema)
    .mutation(async ({ input, ctx }) => {
      return await updateTask(ctx, input);
    }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      return deleteTask(ctx, input);
    }),
});
