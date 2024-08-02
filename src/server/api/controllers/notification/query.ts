import { TRPCError } from "@trpc/server";
import { Context } from "../../trpc";


export const getAllNotification = async (ctx: Context) => {

  try {
    const notifications = await ctx.db.notification.findMany({
      where: { recepientId: ctx.auth?.id },
    });
    return notifications;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get all notifications",
    });
  }
};

export const getSingleNotification = async (ctx: any, id: string) => {
  try {
    const notification = await ctx.db.notification.findUnique({
      where: { id },
    });
    return notification;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get single notification",
    });
  }
};
