import { TRPCError } from "@trpc/server";
import {
  CreateBeneficiarySchemaType,
  UpdateBeneficiarySchemaType,
} from "@/schema";
import { isEmpty } from "lodash";
import { Context } from "../../trpc";
import { AddressType } from "@prisma/client";

export const createBeneficiary = async (
  ctx: Context,
  input: CreateBeneficiarySchemaType,
) => {
  const { address, clientId, ...others } = input;

  try {
    const beneficiary = await ctx.db.beneficiary.create({
      data: {
        ...others,
        clientId: clientId!
      },
    })

    // create beneficiary address
    await ctx.db.address.create({
      data: {
        ...address,
        refId: beneficiary.id,
        type: AddressType.Physical
      }
    })

    return {
      message: "Beneficiary added successfully",
    };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create new beneficiary",
    });
  }
};

export const updateBeneficiary = async (
  ctx: Context,
  input: UpdateBeneficiarySchemaType,
) => {
  const { id, caseId, ...others } = input;

  if (isEmpty(others)) {
    return {
      message: "No changes in beneficiary details",
    };
  }

  const beneficiary = await ctx.db.beneficiary.findUnique({where: { id }})
  if (!beneficiary) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Beneficiary not found",
    });
  }

  try {
    const beneficiary = await ctx.db.beneficiary.update({
      where: { id },
      data: {
        ...others
      },
    })

    if(caseId) {
      // create activity
      await ctx.db.activity.create({
        data: {
          activityDesc: "Updated benefeciary information",
          caseId,
          userId: ctx.auth?.id
        }
      })
    }
  
    return {
      message: `Beneficiary ${beneficiary.name} updated successfully`,
    };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to update beneficiary",
    });
  }
};

export const deleteBeneficiary = async (ctx: Context, id: string) => {

  const beneficiary = await ctx.db.beneficiary.findUnique({where: { id }});

  if (!beneficiary) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Beneficiary not found",
    });
  }

  // delete beneficiary
  try {
    await ctx.db.beneficiary.delete({where: { id }})
    return { message: "beneficiary deleted successfully" };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "failed to delete beneficiary",
    });
  }
};

export const deleteClientBeneficiaries = async (
  ctx: Context,
  id: string,
) => {

  // find the client
  const client = await ctx.db.client.findUnique({ where: { id } });
  if (!client) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "client not found",
    });
  }

  // delete beneficiaries
  try {
    await ctx.db.beneficiary.deleteMany({where: { clientId: id }});
    return { message: "beneficiaries deleted successfully" };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "failed to delete beneficiaries",
    });
  }
};
