import { TRPCError } from "@trpc/server";
import { CreateTaskSchemaType, UpdateTaskSchemaType } from "@/schema";
import { Context } from "../../trpc";
import { TaskStatus } from "@prisma/client";

export const createTask = async (ctx: Context, input: CreateTaskSchemaType) => {

  const activity = {
    caseId: input.caseId!,
    userId: ctx.auth?.id,
    activityDesc: "Created a new task",
  };

  try {
    const createTask = await ctx.db.task.create({
      data: {
        ...input,
        createdBy: ctx.auth?.id,
        assignedTo: input.assignedTo!,
        caseId: input.caseId!,
      },
    });

    if(createTask){
      await ctx.db.activity.create({ data: activity });
    }
    return {
      message: "task created successfully",
      taskId: createTask.id,
    };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create new task",
    });
  }
};

export const updateTask = async (ctx: Context, input: UpdateTaskSchemaType) => {
  const { id, ...others } = input;

  const activity = {
    caseId: input.caseId!,
    userId: ctx.auth?.id,
    activityDesc: "Close a task",
  };

  const task = await ctx.db.task.findUnique({ where: { id } });
  if (!task) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Task not found",
    });
  }

  try {
    const updateTask = await ctx.db.task.update({
      where: { id },
      data: {
        status: others.status,
      },
    });

    await ctx.db.activity.create({ data: activity });

    return {
      message: "task updated successfully",
      taskId: updateTask.id,
      createdBy: updateTask.createdBy,
      assignedTo: updateTask.assignedTo,
      caseId: updateTask.caseId,
    };
    
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to update task",
    });
  }
};

export const deleteTask = async (ctx: Context, id: string) => {
  const task = await ctx.db.task.findUnique({ where: { id } });
  if (!task) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Task not found",
    });
  }

  try {
    await ctx.db.task.delete({ where: { id } });
    return {
      message: "task deleted successfully",
    };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to delete  task",
    });
  }
};
