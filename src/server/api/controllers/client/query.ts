import { TRPCError } from "@trpc/server";
import { Context } from "../../trpc";

export const getAllClients = async (ctx: Context) => {
  try {
    const clients = ctx.db.client.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return clients;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get clients",
    });
  }
};

export const getSingleClient = async (ctx: Context, id: string) => {
  try {
    const client = await ctx.db.client.findUnique({
      where: { id },
    });

    // get client addresses
    return client;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get single client",
    });
  }
};
