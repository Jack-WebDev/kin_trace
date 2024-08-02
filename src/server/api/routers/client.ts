import { createClientSchema, updateClientSchema, userId } from "@/schema";
import { getAllClients, getSingleClient } from "../controllers/client/query";
import {
  createClient,
  deleteClient,
  updateClient,
} from "../controllers/client/mutation";
import { z } from "zod";
import { createRouter, protectedProcedure } from "../trpc";

export const clientRouter = createRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    const clients = await getAllClients(ctx);

    return clients;
  }),

  single: protectedProcedure.input(userId).query(async ({ input, ctx }) => {
    const client = await getSingleClient(ctx, input);

    return client;
  }),

  create: protectedProcedure
    .input(createClientSchema)
    .mutation(async ({ input, ctx }) => {
      return await createClient(ctx, input);
    }),

  update: protectedProcedure
    .input(updateClientSchema)
    .mutation(async ({ input, ctx }) => {
      return await updateClient(ctx, input);
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      return deleteClient(ctx, input);
    }),
});
