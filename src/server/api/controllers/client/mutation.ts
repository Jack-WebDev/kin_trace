import { TRPCError } from "@trpc/server";
import {
  CreateClientSchemaType,
  UpdateClientSchemaType,
} from "@/schema";

import { isEmpty } from "lodash";
import { z } from "zod";
import { Context } from "../../trpc";
import { AddressType } from "@prisma/client";

export const createClient = async (
  ctx: Context,
  input: CreateClientSchemaType,
) => {
  const { address, ...others } = input;

  // check for duplicates
  const clientExist = await ctx.db.client.findFirst({
    where: {
      OR: [
        { employeeNumber: others.employeeNumber },
        { idNumber: others.idNumber },
      ],
    },
  });

  if (clientExist)
    throw new TRPCError({
      code: "CONFLICT",
      message: "Client already exist (employee number or id number)",
    });

  // Create Client
  try {
    const newClient = await ctx.db.client.create({
      data: {
        ...others,
      },
    });

    // Add address
    const addresses = [
      { ...address.physical, type: AddressType.Physical, refId: newClient.id },
      { ...address.postal, type: AddressType.Postal, refId: newClient.id },
    ];

    await ctx.db.address.createMany({
      data: addresses,
    });

    // TODO -----send email notification before a response
    return {
      message: "Client added successfully",
      clientId: newClient.id,
    };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create new client",
    });
  }
};

export const updateClient = async (
  ctx: Context,
  input: UpdateClientSchemaType,
) => {
  const { id, ...others } = input;

  if (isEmpty(others)) {
    return {
      message: "No changes in client information",
    };
  }

  // find the client
  const client = await ctx.db.client.findUnique({ where: { id } });
  if (!client) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Client not found",
    });
  }

  // proceed to update client
  try {
    await ctx.db.client.update({
      where: { id },
      data: {
        ...others,
      },
    });

    return {
      message: "Client updated successfully",
    };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to update client",
    });
  }
};

export const deleteClient = async (ctx: Context, id: string) => {
  const client = await ctx.db.client.findUnique({ where: { id } });
  if (!client) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Client not found",
    });
  }

  try {
     await ctx.db.client.delete({ where: { id } });
    return { message: "Client deleted successfully" };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "failed to delete client",
    });
  }
};
