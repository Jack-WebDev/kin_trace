import {
  createAddressSchema,
  createMultipleAddressSchema,
  updateAddressSchema,
} from "@/schema";
import {
  createAddress,
  createMultipleAddresses,
  deleteAddress,
  deleteAddressByRefId,
  updateAddress,
} from "../controllers/address/mutation";
import { getAllAddresses, getAddressByRefId } from "../controllers/address/query";
import { z } from "zod";
import { createRouter, protectedProcedure } from "../trpc";



export const addressRouter = createRouter({
  list: protectedProcedure.query(async ({ctx}) => {
    const address = await getAllAddresses(ctx);

    return address;
  }),
  listByRefId: protectedProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const address = await getAddressByRefId(ctx, input);

    return address;
  }),
  create: protectedProcedure
    .input(createAddressSchema)
    .mutation(async ({ input, ctx }) => {
      return await createAddress(ctx, input);
    }),

  createMultiple: protectedProcedure
    .input(createMultipleAddressSchema)
    .mutation(async ({ input, ctx }) => {
      return await createMultipleAddresses(ctx, input);
    }),
  update: protectedProcedure
    .input(updateAddressSchema)
    .mutation(async ({ input, ctx }) => {
      return await updateAddress(ctx, input);
    }),

  delete: protectedProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    return await deleteAddress(ctx, input);
  }),

  deleteByRefId: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      return await deleteAddressByRefId(ctx, input);
    }),
});
