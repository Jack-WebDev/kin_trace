import { TRPCError } from "@trpc/server";
import {
  CreateMultipleNotificationSchemaType,
  CreateNotificationSchemaType,
  UpdateNotificationSchemaType,
} from "@/schema";
import { Context } from "../../trpc";
import { NotificationCategory } from "@prisma/client";


export const createNotification = async (
  ctx: Context,
  input: CreateNotificationSchemaType,
) => {
  try {
    await ctx.db.notification.create({
      data: {
        ...input,
        recepientId: ctx.auth?.id,
      }
        
    });
    return {
      message: "notification created successfully",
    };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create new notification",
    });
  }
};

export const createMultipleNotification = async (
  ctx: Context,
  input: CreateMultipleNotificationSchemaType,
) => {
  try {
    await ctx.db.notification.createMany({
      data: input,
    });
    return {
      message: "notifications created successfully",
    };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create new notifications",
    });
  }
};

export type NotificationInput = {
  category: NotificationCategory;
  message: string;
  taskId?: string;
  caseId?: string;
}

export const createBulkNotification = async (
  ctx: Context,
  ids: string[],
  input: NotificationInput
) => {
  const notifications = ids.map((id) => {
    return {
      ...input,
      recepientId: id,
    }
  })

  try {
    await ctx.db.notification.createMany({
      data: notifications,
    });
    return {
      message: "notifications created successfully",
    };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create new notifications",
    });
  }
};


export const updateNotification = async (
  ctx: Context,
  input: UpdateNotificationSchemaType,
) => {
  const { id, ...others } = input;

  // find the notification first
  const notification = await ctx.db.notification.findUnique({ where: { id } });
  if (!notification) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Notification not found",
    });
  }

  try {
    await ctx.db.notification.update({
      where: { id },
      data: { ...others },
    });
    return {
      message: "Notification updated successfully",
    };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to update notification",
    });
  }
};

export const deleteNotification = async (ctx: Context, id: string) => {

  const notification = await ctx.db.notification.findUnique({ where: { id } });
  if (!notification) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Notification not found",
    });
  }

  try {
    await ctx.db.notification.delete({ where: { id } });
    return {
      message: "notification deleted successfully",
    };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to delete  notification",
    });
  }
};
