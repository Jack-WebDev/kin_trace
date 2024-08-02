import { TRPCError } from "@trpc/server";
import { Context } from "../../trpc";

export const getAllNotes = async (ctx: Context) => {
  try {
    const notes = await ctx.db.note.findMany({
      where: { userId: ctx.auth?.id },
    });
    return notes;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get notes",
    });
  }
};

export const getAllCaseNotes = async (ctx: Context, id: string) => {

  const existingCase = await ctx.db.case.findUnique({ where: { id } });

  if (!existingCase) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Case not found",
    });
  }

  try {
    const notes = await ctx.db.note.findMany({
      where: { caseId: id },
    });
    return notes;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get notes",
    });
  }
};

export const getSingleNote = async (ctx: Context, id: string) => {
  try {
    const notes = await ctx.db.note.findUnique({ where: { id } });
    return notes;
  } catch (error) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "note not found",
    });
  }
};


