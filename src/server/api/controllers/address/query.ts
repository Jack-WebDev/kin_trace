import { TRPCError } from "@trpc/server";
import { Context } from "../../trpc";

export const getAllAddresses = async (ctx: Context) => {
  try {
    const address = await ctx.db.address.findMany();

    return address;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get address",
    });
  }
};

export const getAddressByRefId = async (ctx: Context, refId: string) => {
  try {
    const address = await ctx.db.address.findMany({
      where: { refId },
    })

    return address;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get address",
    });
  }
};
