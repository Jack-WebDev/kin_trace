import { TRPCError } from "@trpc/server";
import { Context } from "../../trpc";

export const getAllBeneficiaries = async (ctx: Context) => {
  try {
    const beneficiaries = await ctx.db.beneficiary.findMany({
      orderBy: { createdAt: "desc" },
    });
    return beneficiaries;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to fetch beneficiaries",
    });
  }
};

export const getSingleBeneficiary = async (ctx: Context, id: string) => {
  try {
    const beneficiary = await ctx.db.beneficiary.findUnique({ where: { id } });
    return beneficiary;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to fetch beneficiary",
    });
  }
};

export const getClientBeneficiaries = async (ctx: Context, id: string) => {
  const client = await ctx.db.client.findUnique({ where: { id } });
  if (!client) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Client not found",
    });
  }

  try {
    const beneficiaries = await ctx.db.beneficiary.findMany({
      where: { clientId: id },
    });

    return beneficiaries;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to fetch beneficiaries",
    });
  }
};
