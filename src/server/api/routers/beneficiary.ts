import {
  createBeneficiarySchema,
  updateBeneficiarySchema,
  userId,
} from "@/schema";
import {
  getAllBeneficiaries,
  getClientBeneficiaries,
  getSingleBeneficiary,
} from "../controllers/beneficiary/query";
import {
  createBeneficiary,
  deleteBeneficiary,
  deleteClientBeneficiaries,
  updateBeneficiary,
} from "../controllers/beneficiary/mutation";
import { z } from "zod";
import { createRouter, protectedProcedure } from "../trpc";


export const beneficiaryRouter = createRouter({
  list: protectedProcedure.query(async ({ctx}) => {
    const beneficiaries = await getAllBeneficiaries(ctx);
    return beneficiaries;
  }),

  listByClient: protectedProcedure.input(z.string()).query(async ({ input , ctx}) => {
    const beneficiaries = await getClientBeneficiaries(ctx, input);
    return beneficiaries;
  }),

  single: protectedProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const beneficiary = await getSingleBeneficiary(ctx, input);
    return beneficiary;
  }),

  create: protectedProcedure
    .input(createBeneficiarySchema)
    .mutation(async ({ input, ctx }) => {
      return await createBeneficiary(ctx, input);
    }),

  update: protectedProcedure
    .input(updateBeneficiarySchema)
    .mutation(async ({ input , ctx}) => {
      return await updateBeneficiary(ctx, input);
    }),

  delete: protectedProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    return deleteBeneficiary(ctx, input);
  }),

  deleteByClientId: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      return deleteClientBeneficiaries(ctx, input);
    }),
});
