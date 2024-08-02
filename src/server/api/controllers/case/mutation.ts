import { CaseSchemaType, UpdateCaseSchemaType } from "@/schema";
import { TRPCError } from "@trpc/server";
import { Context } from "../../trpc";
import { CaseStatus, NotificationCategory } from "@prisma/client";
import { randomGenerator } from "@/utils";
import {
  NotificationInput,
  createBulkNotification,
} from "../notification/mutation";

export const createCase = async (ctx: Context, input: CaseSchemaType) => {
  // check duplicate
  const traceCase = await ctx.db.case.findFirst({
    where: { beneficiaryId: input.beneficiaryId, status: CaseStatus.Open },
  });
  if (traceCase) {
    throw new TRPCError({
      code: "CONFLICT",
      message:
        "There's still an open case for this beneficiary. Close the case before creating a new one",
    });
  }

  // Generate case number
  const count = await ctx.db.case.count();
  const saveCount = count < 10 ? `0${count + 1}` : count + 1;
  const chars = randomGenerator(4);

  const address = await ctx.db.address.findFirst({
    where: { refId: input.beneficiaryId! },
  });

  const caseData = {
    caseNumber: `#${saveCount}-${chars.toUpperCase()}`,
    ...input,
    clientId: input.clientId!,
    createdBy: ctx.auth.id,
    supervisorId: input.supervisorId!,
    agentId: input.agentId!,
    beneficiaryId: input.beneficiaryId!,
    city: address?.city ?? " ",
  };

  // create case

  try {
    const createCase = await ctx.db.case.create({
      data: {
        ...caseData,
      },
    });

    // send notification

    const notificationData: NotificationInput = {
      category: NotificationCategory.Case,
      caseId: createCase.id,
      message: `A new case has been created for ${input.beneficiaryId}`,
    };

    const ids: string[] = [input.supervisorId!, input.agentId!, ctx.auth?.id];

    await createBulkNotification(ctx, ids, notificationData);

    return {
      message: "Case created successfully",
      caseId: createCase.id,
      code: 201,
    };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create new case",
    });
  }
};

export const updateCase = async (ctx: Context, input: UpdateCaseSchemaType) => {
  const activity = {
    caseId: input.id!,
    activityDesc:
      input.status === CaseStatus.Closed
        ? "Closed the case"
        : "Updated the case",
    userId: ctx.auth?.id,
  };

  const foundCase = ctx.db.case.findUnique({ where: { id: input.id } });
  if (!foundCase) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Case not found",
    });
  }

  try {
    const updateCase = await ctx.db.case.update({
      where: { id: input.id },
      data: { ...input },
    });

    await ctx.db.activity.create({ data: activity });

    return {
      message: "Case updated successfully",
      code: 200,
      caseId: updateCase.id,
      createdBy: updateCase.createdBy,
      supervisorId: updateCase.supervisorId,
      agentId: updateCase.agentId,
    };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to update case",
    });
  }
};

export const deleteCase = async (ctx: Context, id: string) => {
  // find the case
  const foundCase = ctx.db.case.findUnique({ where: { id } });
  if (!foundCase) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Case not found",
    });
  }

  // delete case
  try {
    await ctx.db.case.delete({ where: { id } });
    return {
      message: "Case deleted successfully",
      code: 200,
    };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to delete case",
    });
  }
};
