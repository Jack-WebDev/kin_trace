import { caseSchema, updateCaseSchema } from "@/schema";

import { z } from "zod";
import {
  getAllCases,
  getCasesByBeneficiaryId,
  getSingleCase,
} from "../controllers/case/query";
import {
  createCase,
  deleteCase,
  updateCase,
} from "../controllers/case/mutation";
import { createRouter, protectedProcedure } from "../trpc";

export const caseRouter = createRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return await getAllCases(ctx);
  }),

  listByBeneficiary: protectedProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      return await getCasesByBeneficiaryId(ctx, input);
    }),

  single: protectedProcedure.input(z.string()).query(async ({ input, ctx }) => {
    return await getSingleCase(ctx, input);
  }),

  create: protectedProcedure
    .input(caseSchema)
    .mutation(async ({ input, ctx }) => {
      return await createCase(ctx, input);
    }),

  update: protectedProcedure
    .input(updateCaseSchema)
    .mutation(async ({ input, ctx }) => {
      return await updateCase(ctx, input);
    }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      return deleteCase(ctx, input);
    }),
});
