import { TRPCError } from "@trpc/server";
import { Context } from "../../trpc";
import { UserRole } from "@prisma/client";

export const getAllCases = async (ctx: Context) => {
  const auth = ctx.auth;
  // get all cases
  try {
    if (auth.role === UserRole.Admin) {
      const cases = await ctx.db.case.findMany({
        where: {
          OR: [
            { agentId: auth.id },
            { supervisorId: auth.id },
            { createdBy: auth.id },
          ],
        },
      });
      return cases;
    }

    const cases = await ctx.db.case.findMany({
      where: {
        OR: [
          { agentId: auth.id },
          { supervisorId: auth.id },
          { createdBy: auth.id },
        ],
      },
    });
    return cases;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to retrieve cases",
    });
  }
};

export const getSingleCase = async (ctx: Context, id: string) => {
  // get single case
  try {
    const singleCase = await ctx.db.case.findUnique({ 
      where: { id },
      include: {
        beneficiary: true,
        agent: true,
        supervisor: true,
        creator: true,
        tasks: true,
        notes: true,
        activities: true,
      }
     });
    return singleCase;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to retrieve case",
    });
  }
};

export const getCasesByBeneficiaryId = async (
  ctx: Context,
  beneficiaryId: string,
) => {
  try {
    const cases = await ctx.db.case.findMany({
      where: { beneficiaryId },
      orderBy: { createdAt: "desc" },
    });
    return cases;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to retrieve cases",
    });
  }
};
