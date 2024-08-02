import { TRPCError } from "@trpc/server";
import { Context } from "../../trpc";

export const getAllActivities = async (ctx: Context) => {
  try {
    const activities = await ctx.db.activity.findMany({
      orderBy: {
        createdAt: "desc",
      }
    })
    return activities;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get all activities",
    });
  }
};

export const getAllActivitiesByCase = async (ctx: Context, id: string) => {
  // Find the case first
  const foundCase = await ctx.db.case.findUnique({ where: { id } });
  if (!foundCase) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Case not found",
    });
  }

  // get activities
  try {
    const activities = await ctx.db.activity.findMany({
      where: { caseId: id },
    });
    return activities;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get all activities",
    });
  }
};
