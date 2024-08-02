import { TRPCError } from "@trpc/server";
import { Context } from "../../trpc";

export const getAllTasks = async (ctx: Context) => {
  try {
    const tasks = await ctx.db.task.findMany({
      where: {
        OR: [{ createdBy: ctx.auth?.id }, { assignedTo: ctx.auth?.id }],
      },
    });
    return tasks;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get all tasks",
    });
  }
};

export const getAllTasksByCase = async (ctx: Context, id: string) => {
  try {
    const tasks = await ctx.db.task.findMany({
      where: {
        caseId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return tasks;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get all case tasks",
    });
  }
};

export const getSingleTask = async (ctx: Context, id: string) => {
  try {
    const task = await ctx.db.task.findUnique({
      where: { id },
    });
    return task;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get single task",
    });
  }
};
