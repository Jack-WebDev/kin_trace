import { TRPCError } from "@trpc/server";
import { CreateNoteSchemaType, UpdateNoteSchemaType, UpdateTaskSchemaType } from "@/schema";
import { Context } from "../../trpc";
import { NoteStatus } from "@prisma/client";

export const createNote = async (ctx: Context, input: CreateNoteSchemaType) => {
  const activity = {
    caseId: input.caseId!,
    userId: ctx.auth?.id,
    activityDesc: "Created a new note",
  };
  try {
    const create = await ctx.db.note.create({
      data: {
        ...input,
        userId: ctx.auth?.id,
        caseId: input.caseId!,
      },
    });

    if(create){
      await ctx.db.activity.create({ data: activity });
    }
    return { message: "Note crearted successfully" };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create note",
    });
  }
};

export const updateNote = async (input: UpdateNoteSchemaType, ctx: Context) => {
  const { id, ...others } = input;

  const status = others.status!;

  // find the note first
  const note = await ctx.db.note.findUnique({ where: { id } });
  if (!note) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Note not found",
    });
  }

  try {
    await ctx.db.note.update({
      where: { id },
      data: {
        ...others,
        status,
      },
    });

    return { message: "Note updated successfully" };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to update note",
    });
  }
};

export const deleteNote = async (ctx: Context, id: string) => {
  // find the note first
  const note = await ctx.db.note.findUnique({ where: { id } });
  if (!note) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Note not found",
    });
  }

  try {
    await ctx.db.note.delete({ where: { id } });
    return { message: "Note deleted successfully" };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to delete note",
    });
  }
};
