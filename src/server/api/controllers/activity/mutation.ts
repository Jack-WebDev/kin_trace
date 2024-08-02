import { TRPCError } from "@trpc/server";
import { CreateActivitySchemaType } from "@/schema";
import { Context } from "../../trpc";

export const createActivity = async (
  ctx: Context,
  input: CreateActivitySchemaType,
) => {
  try {
    await ctx.db.activity.create({
      data: {
        ...input,
        userId: ctx.auth?.id,
        caseId: input.caseId!,
      },
    })
    return {
      message: "Activity created successfully",
    };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create new activity",
    });
  }
};
