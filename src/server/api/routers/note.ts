import { createNoteSchema, updateNoteSchema } from "@/schema";

import { z } from "zod";
import { getAllCaseNotes, getAllNotes, getSingleNote } from "../controllers/note/query";
import {
  createNote,
  deleteNote,
  updateNote,
} from "../controllers/note/mutation";
import { createRouter, protectedProcedure } from "../trpc";

export const noteRouter = createRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return await getAllNotes(ctx);
  }),

  listByCase: protectedProcedure.input(z.string()).query(async ({ input, ctx }) => {
    return await getAllCaseNotes(ctx, input);
  }),

  single: protectedProcedure.input(z.string()).query(async ({ input, ctx }) => {
    return await getSingleNote(ctx, input);
  }),

  create: protectedProcedure
    .input(createNoteSchema)
    .mutation(async ({ input, ctx }) => {
      return await createNote(ctx, input);
    }),

  update: protectedProcedure
    .input(updateNoteSchema)
    .mutation(async ({ input, ctx }) => {
      return await updateNote(input, ctx);
    }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      return deleteNote(ctx, input);
    }),
});
