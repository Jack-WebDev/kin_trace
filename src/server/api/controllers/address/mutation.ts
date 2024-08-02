import { TRPCError } from "@trpc/server";

import {
  CreateAddressSchemaType,
  CreateMultipleAddressSchemaType,
  UpdateAddressSchemaType,
} from "@/schema";
import { isEmpty } from "lodash";
import { Context } from "../../trpc";

export const createAddress = async (
  ctx: Context,
  input: CreateAddressSchemaType,
) => {
  console.log("Input: ", input);

  try {
    await ctx.db.address.create({
      data: { ...input, refId: input.refId!, type: input.type! },
    });
    return { message: "Address added successfully" };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to add new address",
      cause: error,
    });
  }
};

export const createMultipleAddresses = async (
  ctx: Context,
  input: CreateMultipleAddressSchemaType,
) => {
  const data = [
    {
      ...input.physicalAddress,
      refId: input.physicalAddress.refId!,
    },
    {
      ...input.postalAddress,
      refId: input.postalAddress.refId!,
    },
  ];

  try {
    await ctx.db.address.createMany({
      data,
    });
    return { message: "list of addresses added successfully" };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to add list of addresses",
    });
  }
};

export const updateAddress = async (
  ctx: Context,
  input: UpdateAddressSchemaType,
) => {
  const { id, ...others } = input;

  if (isEmpty(others)) {
    return {
      message: `No changes in address`,
    };
  }

  // find the address
  const address = await ctx.db.address.findUnique({ where: { id } });
  if (!address) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Address not found",
    });
  }

  // update address
  try {
    const updated = await ctx.db.address.update({
      where: { id },
      data: { ...others },
    });

    return { message: `${updated.type} address updated successfully` };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to update address",
    });
  }
};

export const deleteAddress = async (ctx: Context, id: string) => {
  // find the address
  const address = await ctx.db.address.findUnique({ where: { id } });
  if (!address) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "address not found",
    });
  }

  // delete address
  try {
    await ctx.db.address.delete({ where: { id } });
    return { message: "address deleted successfully" };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "failed to delete address",
    });
  }
};

export const deleteAddressByRefId = async (ctx: Context, id: string) => {
  // delete address
  try {
    await ctx.db.address.deleteMany({ where: { refId: id } });
    return { message: "address deleted successfully" };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "failed to delete address",
    });
  }
};
